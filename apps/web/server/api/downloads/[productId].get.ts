import { findProduct } from '../../utils/catalog'
import { readOnlyDb, uid, updateDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const product = findProduct(getRouterParam(event, 'productId') || '')
  if (!product || product.kind === 'plan') {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }
  const db = await readOnlyDb()
  const allowed = db.entitlements.some((item) => item.email === session.user.email && item.productSlug === product.slug)
  if (!allowed) throw createError({ statusCode: 403, statusMessage: 'No entitlement for this file' })

  const token = uid('dl')
  const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString()
  await updateDb((store) => {
    store.events.unshift({
      id: token,
      name: 'download_signed',
      email: session.user.email,
      props: { product: product.slug, expires },
      createdAt: new Date().toISOString()
    })
  })

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Content-Disposition', `attachment; filename="${product.slug}.txt"`)
  return [
    product.name,
    product.summary,
    '',
    'Temporary signed download',
    `Token: ${token}`,
    `Expires: ${expires}`,
    'Storage target: Cloudflare R2'
  ].join('\n')
})
