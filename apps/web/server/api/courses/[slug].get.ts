import { findCourse } from '../../utils/catalog'
import { ownedSlugs, readOnlyDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const course = findCourse(getRouterParam(event, 'slug') || '')
  if (!course) {
    throw createError({ statusCode: 404, statusMessage: 'Course not found' })
  }
  const session = await getUserSession(event)
  const email = session.user?.email
  const db = await readOnlyDb()
  const owned = email ? ownedSlugs(db, email) : []
  const unlocked = course.requires.some((slug) => owned.includes(slug))
  const progress = email ? db.progress.filter((item) => item.email === email) : []
  return {
    ...course,
    unlocked,
    lessons: course.lessons.map((lesson) => ({
      ...lesson,
      completed: progress.some((item) => item.lessonId === lesson.id && item.completed),
      locked: !unlocked
    }))
  }
})
