import { updateDb, upsertUser } from '../../utils/db'
import { googleCredentials } from '../../utils/runtime'

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const config = useRuntimeConfig()
  const google = googleCredentials(config.oauth)
  if (google.clientId && google.clientSecret) {
    throw createError({ statusCode: 403, statusMessage: 'Google sign-in is already configured' })
  }

  const body = await readBody<{ role?: string }>(event)
  const role = body.role === 'admin' ? 'admin' : 'member'
  const email = role === 'admin' ? 'admin@abang.test' : 'member@abang.test'
  const profile = {
    id: role === 'admin' ? 'usr_preview_admin' : 'usr_preview_member',
    email,
    name: role === 'admin' ? 'Admin preview' : 'Member preview',
    role: role as 'member' | 'admin'
  }

  await updateDb((db) => {
    const existing = db.users.find((item) => item.email === email)
    upsertUser(db, {
      ...profile,
      id: existing?.id || profile.id,
      createdAt: existing?.createdAt || new Date().toISOString()
    })
  })

  await setUserSession(event, { user: profile })
  return { ok: true, role }
})
