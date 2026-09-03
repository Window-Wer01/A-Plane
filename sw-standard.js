const CACHE_NAME = "blob-merge-prototype-standard-offline-cache";
const OFFLINE_FALLBACK = "./mobile-wechat-offline-standard.html";
const PRECACHE_URLS = [
  "./",
  "./preview.html",
  "./mobile-wechat-standard.html",
  "./mobile-wechat-offline-standard.html",
  "./styles.css",
  "./wechat-shell-standard.css",
  "./js/game-wechat-standard.js",
  "./assets/bgm-paper-boat.mp3",
  "./assets/bgm-loop.wav",
  "./assets/bubble-creature.png",
  "./assets/guide-creature.png",
  "./assets/monster-blue.png",
  "./assets/monster-cast.png",
  "./assets/monster-green.png",
  "./assets/monster-yellow.png"
];

function toCacheKey(input) {
  const url = new URL(input, self.location.href);
  url.hash = "";
  return url.toString();
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  const cacheKey = toCacheKey(requestUrl.pathname);

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(cacheKey, cloned));
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(cacheKey);
          if (cachedPage) return cachedPage;
          return caches.match(OFFLINE_FALLBACK);
        })
    );
    return;
  }

  event.respondWith(
    caches.match(cacheKey)
      .then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(cacheKey, cloned));
          return response;
        });
      })
      .catch(() => {
        if (event.request.destination === "document") {
          return caches.match(OFFLINE_FALLBACK);
        }
        return new Response("", { status: 504, statusText: "Offline" });
      })
  );
});
