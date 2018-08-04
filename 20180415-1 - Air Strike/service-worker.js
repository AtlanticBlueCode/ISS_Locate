// The service worker is completely event driven
// That means it is only triggered by events

// Everytime we refresh the page a new Service Worker version is installed, but not Activated
// Everytime we change the Service Worker file, a new version is installed, but not Activated

// In development, if we select the "Update on Reload" check in Application tab, each new Service Worker change will be activated automatically
// Cache all website components so we get a fast start up time for the application + display something if user is offline



const cacheName = 'v2';

// Call Install Event
self.addEventListener('install', e => {                           // This event gets called when a new Service Worker is discovered and gets installed
  console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', e => {                          // This event gets called when a new Service Worker is activated                                    
  console.log('Service Worker: Activated');
  e.waitUntil(                                                    // Remove unwanted caches
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {                             // This event gets called when a new fetch event occurs
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request)
        .then(res => {                                            // If successful (which means there is Internet connection) make copy/clone of response
          const resClone = res.clone();
          caches.open(cacheName).then(cache => {                  // Open cahce
            cache.put(e.request, resClone);                       // Add response to cache which stores it for when there will be no connection
          });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))     // If no connection return what is in the cache
  );
});