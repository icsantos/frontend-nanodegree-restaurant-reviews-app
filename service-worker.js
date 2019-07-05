const staticCacheName = 'fendRestApp-v1';
const precacheResources = [
  '/',
  'index.html',
  'css/styles.css',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(staticCacheName)
    .then((cache) => cache.addAll(precacheResources))
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      // Intercept requests for those files from the network
      // Respond with the files from the cache
      if (response) {
        console.log('Found ', event.request.url, ' in cache');

        return response;
      }
      console.log('Network request for ', event.request.url);

      return fetch(event.request);
    })
    .then((response) => {
      // Dynamically add files to the cache as they are requested
      return caches.open(staticCacheName).then((cache) => {
        cache.put(event.request.url, response.clone());

        return response;
      });
    })
    .catch((error) => {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Activating new service worker...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('fendRestApp-') &&
                 cacheName !== staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
