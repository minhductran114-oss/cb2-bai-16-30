const CACHE_PREFIX = "cb2-course-16-30-";
const CACHE = "cb2-course-16-30-v3-safe-updates";
const HOME = new URL("./", self.registration.scope).href;
const CORE = ["./", "manifest.webmanifest", "icon-192.png", "icon-512.png"]
  .map((path) => new URL(path, self.registration.scope).href);

self.addEventListener("install", (event) => {
  const freshCore = CORE.map((url) => new Request(url, { cache: "reload" }));
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(freshCore)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        const olderCourseCaches = keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE);
        return Promise.all(olderCourseCaches.slice(0, -1).map((key) => caches.delete(key)));
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

async function cacheSuccessful(request, response, cacheKey = request) {
  if (response.ok && response.type !== "opaque") {
    const cache = await caches.open(CACHE);
    await cache.put(cacheKey, response.clone());
  }
  return response;
}

async function cachedSuccessful(request) {
  const response = await caches.match(request);
  return response?.ok ? response : undefined;
}

async function handleNavigation(request) {
  try {
    const response = await fetch(new Request(request, { cache: "no-store" }));
    if (!response.ok) throw new Error(`Navigation failed: ${response.status}`);
    return cacheSuccessful(request, response, HOME);
  } catch {
    return (await cachedSuccessful(HOME)) || Response.error();
  }
}

async function handleAsset(request) {
  const cached = await cachedSuccessful(request);
  if (cached) return cached;
  const response = await fetch(request);
  return cacheSuccessful(request, response);
}

async function handleNetworkFirst(request) {
  try {
    const response = await fetch(request);
    if (!response.ok) return (await cachedSuccessful(request)) || response;
    return cacheSuccessful(request, response);
  } catch {
    return (await cachedSuccessful(request)) || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (event.request.mode === "navigate") {
    event.respondWith(handleNavigation(event.request));
    return;
  }
  if (url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  if (["script", "style", "font", "image"].includes(event.request.destination)) {
    event.respondWith(handleAsset(event.request));
    return;
  }
  event.respondWith(handleNetworkFirst(event.request));
});
