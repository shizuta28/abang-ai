import { courses } from '../../utils/catalog'
import { ownedSlugs, readOnlyDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const db = await readOnlyDb()
  const owned = session.user?.email ? ownedSlugs(db, session.user.email) : []
  return courses.map((course) => ({
    slug: course.slug,
    title: course.title,
    summary: course.summary,
    lessonCount: course.lessons.length,
    minutes: course.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0),
    unlocked: course.requires.some((slug) => owned.includes(slug))
  }))
})
