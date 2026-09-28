import { articles, courses, products } from '../../utils/catalog'
import { ownedSlugs, readOnlyDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const db = await readOnlyDb()
  const email = session.user.email
  const slugs = ownedSlugs(db, email)
  const ownedProducts = products.filter((product) => slugs.includes(product.slug) && product.kind !== 'plan')
  const plans = products.filter((product) => slugs.includes(product.slug) && product.kind === 'plan')
  const saved = db.saved
    .filter((item) => item.email === email)
    .flatMap((item) => {
      const article = articles.find((entry) => entry.slug === item.articleSlug)
      if (!article) return []
      return [{ slug: article.slug, title: article.title, excerpt: article.excerpt }]
    })
  const courseAccess = courses.map((course) => ({
    slug: course.slug,
    title: course.title,
    summary: course.summary,
    unlocked: course.requires.some((slug) => slugs.includes(slug)),
    lessons: course.lessons.length,
    completed: course.lessons.filter((lesson) => db.progress.some((row) => row.email === email && row.lessonId === lesson.id && row.completed)).length
  }))

  return {
    plans,
    downloads: ownedProducts,
    saved,
    courses: courseAccess,
    orders: db.orders.filter((order) => order.email === email)
  }
})
