const CACHE_NAME = 'justin-code';
const assetsToCache = [
    './',
    './index.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(assetsToCache);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});

self.addEventListener('push', event => {
    let data = {};

    if (event.data) {
        data = event.data.json();
    }

    const title = data.title || 'Justin Code 通知';
    const options = {
        body: data.body || '您有新的消息',
        icon: 'favicon.png',
        badge: 'favicon.png'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});
