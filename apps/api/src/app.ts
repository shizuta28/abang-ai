import type { HealthResponse } from '@abang/types'
import Fastify, { type FastifyInstance } from 'fastify'

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false })

  app.get('/health', (): HealthResponse => ({
    ok: true,
    service: 'abang-api'
  }))

  return app
}
