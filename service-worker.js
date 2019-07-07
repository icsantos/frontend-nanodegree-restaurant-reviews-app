const staticCacheName = 'fendRestApp-v1';
const precacheResources = [
  '/',
  'index.html',
  'css/styles.css',
  'data/restaurants.json',
  'img/1_270w.jpg',
  'img/2_270w.jpg',
  'img/3_270w.jpg',
  'img/4_270w.jpg',
  'img/5_270w.jpg',
  'img/6_270w.jpg',
  'img/7_270w.jpg',
  'img/8_270w.jpg',
  'img/9_270w.jpg',
  'img/10_270w.jpg',
  'img/1_480w.jpg',
  'img/2_480w.jpg',
  'img/3_480w.jpg',
  'img/4_480w.jpg',
  'img/5_480w.jpg',
  'img/6_480w.jpg',
  'img/7_480w.jpg',
  'img/8_480w.jpg',
  'img/9_480w.jpg',
  'img/10_480w.jpg',
  'img/1_800w.jpg',
  'img/2_800w.jpg',
  'img/3_800w.jpg',
  'img/4_800w.jpg',
  'img/5_800w.jpg',
  'img/6_800w.jpg',
  'img/7_800w.jpg',
  'img/8_800w.jpg',
  'img/9_800w.jpg',
  'img/10_800w.jpg',
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
    caches.match(event.request, {ignoreSearch: true})
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
    .then(async (response) => {
      // Dynamically add files to the cache as they are requested
      const cache = await caches.open(staticCacheName);
      cache.put(event.request.url, response.clone());
      return response;
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
