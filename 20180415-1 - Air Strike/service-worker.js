// The service worker is completely event driven
// That means it is only triggered by events

// Everytime we refresh the page a new Service Worker version is installed, but not Activated
// Everytime we change the Service Worker file, a new version is installed, but not Activated

// In development, if we select the "Update on Reload" check in Application tab, each new Service Worker change will be activated automatically
// Cache all website components so we get a fast start up time for the application + display something if user is offline


// First, define an array of our static assets

const staticAssets = [
  "./",
  "./styles.css",
  "./script.js",
  "./cacheupdate.js",
  "./canvas.js",
  "./utils.js",
  "./vector.js",
  "./eventlisteners.js",
  "./image.js",
  "./base.js",
  "./holder.js",
  "./cannonball.js",
  "./target.js",
  "./explosion.js",
  "./manifest.json",
  "./Assets/landscape/Landscape2.jpg",
  "./Assets/planes/Luftwaffe.png",
  "./Assets/explosion/Sprite Sheet/ExplosionA1.png",
  "./p5.js"

];



self.addEventListener("install", async event => { //This event gets called when a new Service Worker is discovered and gets installed
  console.log("Install");

  const cache = await caches.open("site-static"); // Aceder à cache do site e dar-lhe um nome
  cache.addAll(staticAssets); // Esmagar na cache os nossos assets
});


self.addEventListener("fetch", event => { // Fetch events are those sent from our app to the network
  console.log("Fetch!!");

  const req = event.request; // Aceder ao request

  const url = new URL(req.url);

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(req)); // Responder 1º com a função cacheFirst
  } else {
    event.respondWith(networkFirst(req)); // Responder 2º com a função networkFirst
  }
});


async function cacheFirst(req) {
  const cachedResponse = await caches.match(req); // Check if there is anything in the cache to start with

  if (cachedResponse) {
    console.log("From cache!!")
  } else {
    console.log("From network!!!")
  }

  return cachedResponse || fetch(req); // If there is cache, cachedResponse will return it, otherwise we will call fecth(req) to go to the network
}


async function networkFirst(req) {
  const dynamicCachedResponse = await caches.open("site-dynamic");

  try {
    const result = await fetch(req); // Try to go to the network
    cache.put(req, result.clone()); // If sucessfull put that into the cache
    return result;
  } catch (error) {
    return await cache.match(req); // If it fails, resort to whatever is in the cache
  }
}