// Cache names

var dataCacheName = 'Eyes2Run-v1.0';

var cacheName = 'Eyes2RunPWA-1.0';

// Application shell files to be cached

var filesToCache = [
  '/',
  '/index.html',
  '/js/app.js',
  '/css/main.css',
  '/images/*.*'
]

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');

    e.waitUntil(
        caches.open(cacheName).then(function(cache) {

        console.log(‘[ServiceWorker] Caching app shell’)

        return cache.addAll(filesToCache)

        })
    )
});

self.addEventListener('activate', function (e) {

      console.log('[ServiceWorker] Activate');

      e.waitUntil(

              caches.keys().then(function (keyList) {

                       return Promise.all(keyList.map(function (key) {

                               if (key !== cacheName && key !== dataCacheName) {

                                    console.log('[ServiceWorker] Removing old cache', key)

                                    return caches.delete(key)

                               }

                        }))

              })

      );

      return self.clients.claim();

})

self.addEventListener('fetch', function (e) {

      console.log('[ServiceWorker] Fetch', e.request.url);

      e.respondWith(

             caches.match(e.request).then(function (response) {

                     return response || fetch(e.request)

             })

       );

})