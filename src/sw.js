const CACHE_NAME = "lightweight-single-page-cache-v1";
const API_URLS = [
  "https://api-game.bloque.app/game/market",
  "https://api-game.bloque.app/game/leaderboard",
];

// Service Worker Installation, opcionalmente puedes precachear rutas
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(API_URLS);
    })
  );
});

// SW Activation
self.addEventListener("activate", (event) => {
  clients.claim();
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  console.log("✅ SW fetched");
  const { request } = event;
  const resp = fetch(request)
    .then((response) => {
      // Clonar y actualizar caché
      const clonedResponse = response.clone();
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, clonedResponse);
      });
      return response;
    })
    .catch(() => {
      // Si no hay red, usar caché
      return caches.match(request);
    });

  event.respondWith(resp);
});
