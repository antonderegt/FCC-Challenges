const CACHE_NAME = 'v11'
const CACHE_FILES = [
  './',
  './manifest.json',
  './index.html',
  './js/bundle.min.js',
  './images/icon-1x.png',
  './images/icon-4x.png',
  './images/eggens.png'
]

self.addEventListener('install', e => {
  console.log("[ServiceWorker] Installed")

  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("[ServiceWorker] Caching cacheFiles")
        return cache.addAll(CACHE_FILES)
      })
  )
})

// Make sure right version op cache is used
self.addEventListener('activate', e => {
  console.log("[ServiceWorker] Activated");

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(cacheNames.map(thisCacheName => {
          if(thisCacheName !== CACHE_NAME) {
            console.log(`[ServiceWorker] Removing Cached files from ${thisCacheName}`)
            return caches.delete(thisCacheName)
          }
        }))
      })
  )
})


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        console.log("[ServiceWorker] Fetched", event.request.url);
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            // Deleted: || response.status !== 200 || response.type !== 'basic'
            if(!response) {
              console.log("[SW] No response", response);
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                console.log("[SW] Putting", responseToCache);
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
        .catch(err => {
          console.log(`[ServiceWorker] Error fetching and caching ${err}`);
        })
    );
});




//---------------------
/*
self.addEventListener('fetch', e => {
  // console.log("[ServiceWorker], fetched", e.request.url);

  e.respondWith(
    caches.match(e.request)
      .then(response => {
        if(response) {
          console.log(`[ServiceWorker] Found in cache ${response.url}`);
          return response
        }

        const requestClone = e.request.clone()
        fetch(requestClone)
          .then(response => {
            if(!response) {
              console.log("[ServiceWorker] No response from fetch")
              return response
            }

            const responseClone = response.clone()
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(e.request, responseClone)
                return response
              })
          })
            .catch(err => {
              console.log(`[ServiceWorker] Error fetching en caching ${err}`);
            })
      })
  )
})
*/
