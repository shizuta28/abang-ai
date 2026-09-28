import { readOnlyDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const db = await readOnlyDb()
  if (session.user.role === 'admin') return db.orders
  return db.orders.filter((order) => order.email === session.user.email)
})
