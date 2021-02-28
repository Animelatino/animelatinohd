const CACHE = "pwabuilder-precache";

importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js");

importScripts('https://arc.io/arc-sw-core.js')

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

workbox.routing.registerRoute(
	new RegExp("/*"), 
	new workbox.strategies.StaleWhileRevalidate({ 
		cacheName: CACHE 
	})
);