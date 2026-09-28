import { buildApp } from './app.js'

const port = readPort(process.env.PORT)
const host = process.env.HOST ?? '0.0.0.0'
const app = buildApp()

app.listen({ port, host }).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'API failed to start'
  console.error(message)
  process.exit(1)
})

function readPort(value: string | undefined): number {
  if (value === undefined || value.trim() === '') return 4000
  const port = Number(value)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535')
  }
  return port
}
