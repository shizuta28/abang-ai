import assert from 'node:assert/strict'
import test from 'node:test'
import { buildApp } from './app.js'

test('health reports the API service', async () => {
  const app = buildApp()
  const response = await app.inject({ method: 'GET', url: '/health' })
  assert.equal(response.statusCode, 200)
  assert.deepEqual(response.json(), { ok: true, service: 'abang-api' })
  await app.close()
})
