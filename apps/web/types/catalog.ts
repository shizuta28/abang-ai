export type ProductKind = 'plan' | 'download' | 'course'

export interface Product {
  id: string
  slug: string
  name: string
  summary: string
  kind: ProductKind
  price: number
  yearlyPrice?: number
  badge?: string
  includes: string[]
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  minutes: number
  body: string[]
}

export interface Lesson {
  id: string
  title: string
  minutes: number
  summary: string
}

export interface Course {
  id: string
  slug: string
  title: string
  summary: string
  requires: string[]
  lessons: Lesson[]
}

export interface HubUser {
  id: string
  email: string
  name: string
  picture?: string
  role: 'member' | 'admin'
  createdAt: string
}

export interface Order {
  id: string
  email: string
  productSlug: string
  productName: string
  amount: number
  cycle: 'monthly' | 'yearly' | 'once'
  status: 'pending' | 'paid' | 'refunded'
  paymentRef: string
  receiptStatus: 'skipped' | 'queued' | 'sent'
  createdAt: string
}

export interface Entitlement {
  id: string
  email: string
  productSlug: string
  orderId: string
  createdAt: string
}

export interface SavedItem {
  id: string
  email: string
  articleSlug: string
  createdAt: string
}

export interface Progress {
  email: string
  lessonId: string
  completed: boolean
  updatedAt: string
}

export interface FunnelEvent {
  id: string
  name: string
  email?: string
  props?: Record<string, string>
  createdAt: string
}

export interface Database {
  users: HubUser[]
  orders: Order[]
  entitlements: Entitlement[]
  saved: SavedItem[]
  progress: Progress[]
  events: FunnelEvent[]
}
