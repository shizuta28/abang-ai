import { articles } from '../../utils/catalog'
import { uid, updateDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await readBody<{ articleSlug?: string }>(event)
  const article = articles.find((item) => item.slug === body.articleSlug)
  if (!article) throw createError({ statusCode: 404, statusMessage: 'Article not found' })

  return updateDb((db) => {
    const existing = db.saved.find((item) => item.email === session.user.email && item.articleSlug === article.slug)
    if (existing) {
      db.saved = db.saved.filter((item) => item.id !== existing.id)
      return { saved: false }
    }
    db.saved.unshift({
      id: uid('sav'),
      email: session.user.email,
      articleSlug: article.slug,
      createdAt: new Date().toISOString()
    })
    return { saved: true }
  })
})
