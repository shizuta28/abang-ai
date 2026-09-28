import { findArticle } from '../../utils/catalog'
import { readOnlyDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const article = findArticle(getRouterParam(event, 'slug') || '')
  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }
  const session = await getUserSession(event)
  const db = await readOnlyDb()
  const saved = Boolean(session.user?.email && db.saved.some((item) => item.email === session.user?.email && item.articleSlug === article.slug))
  return { ...article, saved }
})
