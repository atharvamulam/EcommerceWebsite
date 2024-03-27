// Define cache names
const staticCacheName = 'static-cache-v1';
const dynamicCacheName = 'dynamic-cache-v1';

// Define assets to be cached
const assets = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/image.png',
    '/shopping-bag.png',
    '/menubar.jpg',
    '/img2.jpg',
    '/img3.jpg',
    '/img4.jpg',
    '/img9.jpg',
    '/shirt.jpg',
    '/product2.jpg',
    '/product3.jpg',
    '/product5.jpg',
    '/latest.jpg',
    '/latest1.jpg',
    '/latest2.jpg',
    '/latest3.jpg',
    '/latest4.jpg',
    '/latest5.jpg',
    '/latest6.jpg',
    '/latest7.jpg',
    '/watch.jpg',
    '/sam1.jpg',
    '/sam2.jpg',
    '/logo.jpg',
    '/logo1.jpg',
    '/logo2.jpg',
    '/logo3.jpg',
    '/logo4.jpg',
    '/playstore.jpg',
    '/appstore.jpg'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                console.log('Caching static assets');
                cache.addAll(assets);
            })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request).then(fetchResponse => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(event.request.url, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        })
    );
});
