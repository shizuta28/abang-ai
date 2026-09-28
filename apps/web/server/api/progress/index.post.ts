import { courses } from '../../utils/catalog'
import { updateDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await readBody<{ lessonId?: string, completed?: boolean }>(event)
  const lesson = courses.flatMap((course) => course.lessons.map((item) => ({ ...item, course }))).find((item) => item.id === body.lessonId)
  if (!lesson) throw createError({ statusCode: 404, statusMessage: 'Lesson not found' })

  return updateDb((db) => {
    const owned = db.entitlements.some((item) => item.email === session.user.email && lesson.course.requires.includes(item.productSlug))
    if (!owned) {
      throw createError({ statusCode: 403, statusMessage: 'This lesson is locked' })
    }
    const row = db.progress.find((item) => item.email === session.user.email && item.lessonId === lesson.id)
    const completed = body.completed !== false
    if (row) {
      row.completed = completed
      row.updatedAt = new Date().toISOString()
      return row
    }
    const created = {
      email: session.user.email,
      lessonId: lesson.id,
      completed,
      updatedAt: new Date().toISOString()
    }
    db.progress.unshift(created)
    return created
  })
})
