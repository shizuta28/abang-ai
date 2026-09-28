import { findProduct } from '../../utils/catalog'

export default defineEventHandler((event) => {
  const product = findProduct(getRouterParam(event, 'slug') || '')
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
  return product
})
