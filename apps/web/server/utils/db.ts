import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import type { Database, Entitlement, FunnelEvent, HubUser, Order, Progress, SavedItem } from '~/types/catalog'

const filePath = resolve(process.cwd(), 'data', 'hub.json')

const emptyDb = (): Database => ({
  users: [],
  orders: [],
  entitlements: [],
  saved: [],
  progress: [],
  events: []
})

let queue: Promise<unknown> = Promise.resolve()

async function readDb(): Promise<Database> {
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    return { ...emptyDb(), ...JSON.parse(raw) }
  } catch {
    return emptyDb()
  }
}

async function writeDb(db: Database) {
  await fs.mkdir(resolve(process.cwd(), 'data'), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(db, null, 2))
}

export function updateDb<T>(mutator: (db: Database) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const db = await readDb()
    const result = await mutator(db)
    await writeDb(db)
    return result
  })
  queue = run.then(() => undefined, () => undefined)
  return run
}

export function readOnlyDb() {
  return readDb()
}

export function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

export function upsertUser(db: Database, user: HubUser) {
  const existing = db.users.find((item) => item.email === user.email)
  if (existing) {
    existing.name = user.name
    existing.picture = user.picture
    existing.role = user.role
    return existing
  }
  db.users.unshift(user)
  return user
}

export function grantEntitlement(db: Database, email: string, productSlug: string, orderId: string) {
  const already = db.entitlements.find((item) => item.orderId === orderId)
  if (already) return already
  const entitlement: Entitlement = {
    id: uid('ent'),
    email,
    productSlug,
    orderId,
    createdAt: new Date().toISOString()
  }
  db.entitlements.unshift(entitlement)
  return entitlement
}

export function ownedSlugs(db: Database, email: string) {
  return db.entitlements.filter((item) => item.email === email).map((item) => item.productSlug)
}

export function addEvent(db: Database, event: Omit<FunnelEvent, 'id' | 'createdAt'>) {
  const row: FunnelEvent = {
    id: uid('evt'),
    createdAt: new Date().toISOString(),
    ...event
  }
  db.events.unshift(row)
  db.events = db.events.slice(0, 200)
  return row
}

export type { Order, Progress, SavedItem }
