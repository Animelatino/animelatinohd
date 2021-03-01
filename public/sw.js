importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

importScripts('https://arc.io/arc-sw-core.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
  }
});

workbox.recipes.pageCache();
workbox.recipes.staticResourceCache();
workbox.recipes.imageCache();
workbox.recipes.googleFontsCache();
workbox.recipes.offlineFallback(); 