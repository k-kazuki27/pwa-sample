import { precacheAndRoute } from 'workbox-precaching'
import { skipWaiting, clientsClaim } from 'workbox-core'

clientsClaim()
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('activate', (event) => {
  event.waitUntil(clientsClaim())
})

self.onmessage = (message) => {
  const { action } = message.data
  console.log('receive', action)

  switch (action) {
    case 'skipWaiting':
      skipWaiting()
      break
    case 'claim':
      // clientsClaim()
      self.clients.claim()
      return
    default:
      break
  }
}
