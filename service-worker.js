// The old site registered this service worker to cache pages and receive push
// notifications. The new site no longer needs it. Browsers that still have the
// old worker installed will fetch this file, clear the cache, and unregister,
// so returning visitors always see the latest version of the site.

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((names) => Promise.all(names.map((name) => caches.delete(name))))
            .then(() => self.registration.unregister())
            .then(() => self.clients.matchAll())
            .then((clients) => clients.forEach((client) => client.navigate(client.url)))
    );
});