import { updateDb } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Admin only' })
  }
  const id = getRouterParam(event, 'id')
  const order = await updateDb((db) => {
    const row = db.orders.find((item) => item.id === id)
    if (!row) return null
    row.status = 'refunded'
    db.entitlements = db.entitlements.filter((item) => item.orderId !== row.id && !item.orderId.startsWith(`${row.id}_`))
    return row
  })
  if (!order) throw createError({ statusCode: 404, statusMessage: 'Order not found' })
  return order
})
