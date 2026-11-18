'use client'

export type OfflineEventType =
  | 'navigation'
  | 'form-submission'
  | 'learning-progress'
  | 'preference'
  | 'interaction'

export type OfflineSyncEvent = {
  clientEventId: string
  deviceId: string
  eventType: OfflineEventType
  route: string
  payload: Record<string, unknown>
  occurredAt: string
  source: 'web' | 'pwa' | 'android' | 'desktop'
}

const DB_NAME = 'chiyambi-offline'
const STORE_NAME = 'sync-events'
const DEVICE_KEY = 'chiyambi-device-id'

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1)
    request.onerror = () => reject(request.error)
    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'clientEventId' })
      }
    }
    request.onsuccess = () => resolve(request.result)
  })
}

function detectSource(): OfflineSyncEvent['source'] {
  const displayMode = window.matchMedia('(display-mode: standalone)').matches
  const userAgent = navigator.userAgent.toLowerCase()
  if (displayMode && userAgent.includes('android')) return 'android'
  if (displayMode) return 'desktop'
  return 'web'
}

function getDeviceId() {
  const existing = window.localStorage.getItem(DEVICE_KEY)
  if (existing) return existing
  const next = window.crypto.randomUUID()
  window.localStorage.setItem(DEVICE_KEY, next)
  return next
}

async function storeEvent(event: OfflineSyncEvent) {
  const database = await openDatabase()
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    transaction.objectStore(STORE_NAME).put(event)
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  })
  database.close()
}

async function getPendingEvents(): Promise<OfflineSyncEvent[]> {
  const database = await openDatabase()
  const events = await new Promise<OfflineSyncEvent[]>((resolve, reject) => {
    const request = database.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).getAll()
    request.onsuccess = () => resolve(request.result as OfflineSyncEvent[])
    request.onerror = () => reject(request.error)
  })
  database.close()
  return events.sort((a, b) => a.occurredAt.localeCompare(b.occurredAt))
}

async function removeEvents(ids: string[]) {
  if (!ids.length) return
  const database = await openDatabase()
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    ids.forEach((id) => store.delete(id))
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  })
  database.close()
}

function announceSync(detail: { pending: number; synced: number; state: string }) {
  window.dispatchEvent(new CustomEvent('chiyambi:sync-status', { detail }))
}

export async function queueOfflineEvent(
  eventType: OfflineEventType,
  route: string,
  payload: Record<string, unknown> = {},
) {
  if (typeof window === 'undefined' || !('indexedDB' in window)) return
  const event: OfflineSyncEvent = {
    clientEventId: window.crypto.randomUUID(),
    deviceId: getDeviceId(),
    eventType,
    route: route.startsWith('/') ? route : `/${route}`,
    payload,
    occurredAt: new Date().toISOString(),
    source: detectSource(),
  }
  await storeEvent(event)
  announceSync({ pending: 1, synced: 0, state: navigator.onLine ? 'syncing' : 'offline' })
  if (navigator.onLine) void flushOfflineEvents()
}

export async function flushOfflineEvents() {
  if (typeof window === 'undefined' || !navigator.onLine || !('indexedDB' in window)) {
    return { pending: 0, synced: 0 }
  }
  const pending = await getPendingEvents()
  if (!pending.length) {
    announceSync({ pending: 0, synced: 0, state: 'idle' })
    return { pending: 0, synced: 0 }
  }

  try {
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: pending.slice(0, 50) }),
    })
    if (!response.ok) throw new Error(`Sync failed with ${response.status}`)
    const result = (await response.json()) as { accepted: string[] }
    await removeEvents(result.accepted)
    const remaining = Math.max(0, pending.length - result.accepted.length)
    announceSync({ pending: remaining, synced: result.accepted.length, state: 'synced' })
    return { pending: remaining, synced: result.accepted.length }
  } catch {
    announceSync({ pending: pending.length, synced: 0, state: 'waiting' })
    return { pending: pending.length, synced: 0 }
  }
}
