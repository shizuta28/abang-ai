import { addEvent, updateDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const body = await readBody<{ name?: string, props?: Record<string, string> }>(event)
  if (!body.name) throw createError({ statusCode: 400, statusMessage: 'Event name is required' })
  const allowed = ['signup_click', 'checkout_started', 'article_read', 'assist_pick']
  if (!allowed.includes(body.name)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown event' })
  }
  await updateDb((db) => {
    addEvent(db, {
      name: body.name!,
      email: session.user?.email,
      props: body.props
    })
  })
  return { ok: true }
})
