let staticCacheName = 'website_cache-';
let rand = Math.floor(Math.random() * 10000);
staticCacheName += rand;


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            return cache.addAll([
                'index.html',
                'restaurant.html',
                '/css/main.css',
                '/css/responsive.css',
                '/css/restaurant.css',
                '/css/restaurant_responsive.css',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/register.js',
                '/img/*'
            ]).catch(error => {

            });
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('website_cache-') &&
                        cacheName != staticCacheName;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});