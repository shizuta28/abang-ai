import { uid, updateDb, upsertUser } from '../../utils/db'

function redirectTarget(event: Parameters<typeof getCookie>[0]) {
  const raw = getCookie(event, 'abang_redirect') || '/library'
  deleteCookie(event, 'abang_redirect')
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/library'
  return raw
}

export default defineOAuthGoogleEventHandler({
  config: {
    scope: ['openid', 'email', 'profile']
  },
  async onSuccess(event, { user }) {
    const email = user.email?.toLowerCase()
    if (!email) {
      return sendRedirect(event, '/auth/signin?error=google')
    }
    const config = useRuntimeConfig()
    const admins = String(config.adminEmails || '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean)
    const role = admins.includes(email) ? 'admin' : 'member'
    const profile = {
      id: user.sub || uid('usr'),
      email,
      name: user.name || email,
      picture: user.picture,
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
    return sendRedirect(event, redirectTarget(event))
  },
  onError(event) {
    return sendRedirect(event, '/auth/signin?error=google')
  }
})
