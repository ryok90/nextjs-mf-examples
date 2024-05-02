const installEvent = () => {
  self.addEventListener('install', () => {
    console.log('service worker installed');
  });
};

const activateEvent = () => {
  self.addEventListener('activate', () => {
    console.log('service worker activated');
  });
};

const cacheName = 'MF_REMOTES_CACHE';

/**
 * Here the event will be processed to determine if the cache will be returned,
 * or if a new request will be made and have the cache replaced.
 * @param {FetchEvent} e
 * @returns {Promise<Response>}
 */
const cacheClone = async (e) => {
  const cache = await caches.open(cacheName);
  const cacheRes = await cache.match(e.request.url);

  if (cacheRes) return cacheRes;

  const res = await fetch(e.request);

  if (!res.ok && res.status !== 0) {
    throw new Error(`Error fetching ${e.request.url}`);
  }

  const resClone = res.clone();
  await cache.delete(e.request.url, { ignoreSearch: true });
  await cache.put(e.request.url, resClone);

  return res;
};

/** @type {(e: FetchEvent) => boolean} */
const isRemoteRequest = (e) => {
  return ['http://localhost:3011', 'http://localhost:3012'].some((remote) =>
    e.request.url.startsWith(remote)
  );
};

/**
 * Listener for the fetch event.
 * Here the service worker will determine which events it will apply the cache control.
 * @param {FetchEvent} e
 */
const fetchListener = (e) => {
  if (e.request.url.startsWith('ws://')) return;
  if (e.request.url.startsWith(location.origin)) return;
  if (!isRemoteRequest(e)) return;

  e.respondWith(
    cacheClone(e).catch(async (error) => {
      // console.log('------------ error from worker: ', error);
      const match = await caches.match(e.request.url, { ignoreSearch: true });
      return match ?? Response.error();
    })
  );
};

const fetchEvent = () => {
  self.addEventListener('fetch', fetchListener);
};

// activateEvent();
// installEvent();
fetchEvent();
