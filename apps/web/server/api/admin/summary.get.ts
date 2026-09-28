import { readOnlyDb } from '../../utils/db'
import { configString, googleCredentials } from '../../utils/runtime'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  if (session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Admin only' })
  }
  const config = useRuntimeConfig()
  const google = googleCredentials(config.oauth)
  const db = await readOnlyDb()
  return {
    users: db.users,
    orders: db.orders,
    entitlements: db.entitlements,
    events: db.events.slice(0, 30),
    services: {
      google: Boolean(google.clientId && google.clientSecret),
      toyyibpay: Boolean(configString(config.toyyibpaySecretKey) && configString(config.toyyibpayCategoryCode)),
      resend: Boolean(configString(config.resendApiKey))
    }
  }
})
