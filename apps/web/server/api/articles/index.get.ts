import { articles } from '../../utils/catalog'

export default defineEventHandler(() => {
  return articles.map(({ body, ...article }) => article)
})
