const CACHE_NAME = 'chiyambi-v2'
const CORE_ASSETS = [
  '/',
  '/system/offline',
  '/chiyambi-logo.png',
  '/chiyambi-logo-footer.png',
  '/favicon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/fisd-logo.png',
  '/payment-logos/airtel-money.png',
  '/payment-logos/tnm-mpamba.png',
  '/payment-logos/standard-bank.png',
  '/payment-logos/national-bank.png',
  '/payment-logos/nbs-bank.png',
  '/media/malawi-learn-play.mp4',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      await cache.addAll(CORE_ASSETS)

      const shellResponse = await fetch('/')
      const shellHTML = await shellResponse.clone().text()
      const shellAssets = Array.from(
        shellHTML.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+)"/g),
        (match) => match[1],
      )
      await Promise.all(
        [...new Set(shellAssets)].map(async (asset) => {
          try {
            await cache.add(asset)
          } catch {
            // A later runtime request will retry non-critical assets.
          }
        }),
      )
      await cache.put('/', shellResponse)
    })(),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(async () => {
          return (
            (await caches.match(request)) ||
            (await caches.match('/system/offline')) ||
            (await caches.match('/'))
          )
        }),
    )
    return
  }

  if (new URL(request.url).origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone()
              void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
            }
            return response
          }),
      ),
    )
  }
})
