import { chargeFor, findProduct } from './catalog'
import { addEvent, grantEntitlement, uid, updateDb } from './db'
import { configString } from './runtime'
import type { Order } from '~/types/catalog'

export async function createOrder(input: {
  email: string
  productSlug: string
  cycle: 'monthly' | 'yearly' | 'once'
}) {
  const product = findProduct(input.productSlug)
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
  if (product.price === 0) {
    throw createError({ statusCode: 400, statusMessage: 'This plan does not need checkout' })
  }

  const config = useRuntimeConfig()
  const orderId = uid('ord')
  const amount = chargeFor(product, product.kind === 'plan' ? input.cycle : 'once')
  const cycle = product.kind === 'plan' ? input.cycle : 'once'

  let paymentUrl = ''
  let paymentRef = `local_${orderId}`

  const secretKey = configString(config.toyyibpaySecretKey)
  const categoryCode = configString(config.toyyibpayCategoryCode)
  const siteUrl = configString(config.public.siteUrl) || 'http://localhost:3000'

  if (secretKey && categoryCode) {
    const body = new URLSearchParams({
      userSecretKey: secretKey,
      categoryCode,
      billName: product.name.slice(0, 30),
      billDescription: `Abang AI Hub · ${product.name}`.slice(0, 100),
      billPriceSetting: '1',
      billPayorInfo: '1',
      billAmount: String(Math.round(amount * 100)),
      billReturnUrl: `${siteUrl}/checkout/success?order=${orderId}`,
      billCallbackUrl: `${siteUrl}/api/payments/callback`,
      billExternalReferenceNo: orderId,
      billTo: input.email,
      billEmail: input.email,
      billPhone: '0123456789',
      billSplitPayment: '0',
      billSplitPaymentArgs: '',
      billPaymentChannel: '0',
      billContentEmail: `Receipt for ${product.name}`,
      billChargeToCustomer: '1'
    })

    const response = await fetch('https://toyyibpay.com/index.php/api/createBill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    })
    const payload = await response.json() as Array<{ BillCode?: string }>
    const code = payload?.[0]?.BillCode
    if (!code) {
      throw createError({ statusCode: 502, statusMessage: 'ToyyibPay did not return a bill' })
    }
    paymentRef = code
    paymentUrl = `https://toyyibpay.com/${code}`
  } else {
    paymentUrl = `/checkout/pay/${orderId}`
  }

  const order: Order = {
    id: orderId,
    email: input.email,
    productSlug: product.slug,
    productName: product.name,
    amount,
    cycle,
    status: 'pending',
    paymentRef,
    receiptStatus: 'skipped',
    createdAt: new Date().toISOString()
  }

  await updateDb((db) => {
    db.orders.unshift(order)
    addEvent(db, {
      name: 'checkout_started',
      email: input.email,
      props: { product: product.slug, cycle }
    })
  })

  return { order, paymentUrl }
}

export async function markOrderPaid(orderId: string, reference = '') {
  return updateDb(async (db) => {
    const order = db.orders.find((item) => item.id === orderId)
    if (!order) return null
    if (order.status === 'paid') return order
    order.status = 'paid'
    if (reference) order.paymentRef = reference
    grantEntitlement(db, order.email, order.productSlug, order.id)
    if (order.productSlug === 'plan-premium') {
      grantEntitlement(db, order.email, 'content-os', `${order.id}_bundle`)
    }
    order.receiptStatus = await sendReceipt(order)
    addEvent(db, {
      name: 'purchase_completed',
      email: order.email,
      props: { product: order.productSlug, amount: String(order.amount) }
    })
    return order
  })
}

async function sendReceipt(order: Order) {
  const config = useRuntimeConfig()
  if (!config.resendApiKey) return 'queued' as const
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: config.resendFrom,
      to: [order.email],
      subject: `Receipt · ${order.productName}`,
      text: `Payment received for ${order.productName}. Amount RM ${order.amount}. Order ${order.id}.`
    })
  })
  return response.ok ? 'sent' as const : 'queued' as const
}
