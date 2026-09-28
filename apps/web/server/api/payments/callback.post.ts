import { markOrderPaid } from '../../utils/billing'
import { readOnlyDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    order_id?: string
    billcode?: string
    status?: string
    orderId?: string
    refno?: string
  }>(event)

  const orderId = body.order_id || body.orderId
  if (!orderId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing order' })
  }

  const config = useRuntimeConfig()
  const paidFlag = String(body.status || '1')
  if (config.toyyibpaySecretKey && paidFlag !== '1') {
    return { ok: true, ignored: true }
  }

  const existing = await readOnlyDb()
  const order = existing.orders.find((item) => item.id === orderId)
  if (!order) throw createError({ statusCode: 404, statusMessage: 'Order not found' })

  const session = await getUserSession(event)
  if (!config.toyyibpaySecretKey && session.user?.email !== order.email) {
    throw createError({ statusCode: 403, statusMessage: 'This bill belongs to another member' })
  }

  if (config.toyyibpaySecretKey && body.billcode && order.paymentRef !== body.billcode) {
    throw createError({ statusCode: 400, statusMessage: 'Bill does not match this order' })
  }

  const updated = await markOrderPaid(orderId, body.refno || body.billcode || order.paymentRef)
  return { ok: true, status: updated?.status }
})
