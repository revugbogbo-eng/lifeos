/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

// Safely handles the virtual manifest injection during local development rounds
try {
  const manifest = self.__WB_MANIFEST || []
  if (manifest && manifest.length > 0) {
    precacheAndRoute(manifest)
  }
  cleanupOutdatedCaches()
} catch (e) {
  console.log('Vite PWA running in development compilation mode:', e)
}


// 2. Listen for incoming push notification signals from your Supabase Gemini engine
self.addEventListener('push', (event) => {
  if (!event.data) return
  
  try {
    const data = event.data.json()

    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        vibrate: [100, 50, 100],
        data: { url: data.actionUrl || '/' },
        tag: `lifeos-${data.category || 'general'}`,
        requireInteraction: data.priority === 'urgent',
      })
    )
  } catch (err) {
    console.error('Error parsing incoming push notification data:', err)
  }
})

// 3. Handle what happens when a user clicks on the notification banner
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ('focus' in client) {
          return (client as WindowClient).focus()
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url)
      }
    })
  )
})