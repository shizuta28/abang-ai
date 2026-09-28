import { createOrder } from '../../utils/billing'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await readBody<{ productSlug?: string, cycle?: 'monthly' | 'yearly' | 'once' }>(event)
  if (!body.productSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Product is required' })
  }
  const cycle = body.cycle === 'yearly' ? 'yearly' : body.cycle === 'once' ? 'once' : 'monthly'
  const result = await createOrder({
    email: session.user.email,
    productSlug: body.productSlug,
    cycle
  })
  return {
    orderId: result.order.id,
    paymentUrl: result.paymentUrl,
    amount: result.order.amount
  }
})
