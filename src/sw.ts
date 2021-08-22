import { enable } from 'workbox-navigation-preload';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { CacheFirst, StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';

const offlineCacheName = 'offline';
const imageCacheName = 'images';

const offlineHTML = '/offline/index.html';
const offlineImg = '/static/disconnected.svg';

const timeInHour = 60 * 60;
const timeInDay = 24 * timeInHour;
const timeInYear = 365 * timeInDay;

self.addEventListener('install', async (event: any) => {
  event.waitUntil(
    Promise.all([
      caches.open(offlineCacheName).then((c) => {
        c.add(offlineHTML);
      }),
      caches.open(imageCacheName).then((c) => {
        c.add(offlineImg);
      }),
    ]),
  );
});

enable();
precacheAndRoute((self as any).__WB_MANIFEST);

const offlineHandler = async (params: any): Promise<Response> => {
  const networkOnly = new NetworkOnly();
  try {
    return await networkOnly.handle(params);
  } catch (error) {
    return caches.match(offlineHTML, {
      cacheName: offlineCacheName,
    }) as unknown as Response;
  }
};

const cacheFontStyle = new StaleWhileRevalidate({
  cacheName: 'font-stylesheet',
});

const cacheFontWebfonts = new CacheFirst({
  cacheName: 'font-webfonts',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: timeInYear,
      maxEntries: 30,
    }),
  ],
});

const cacheImage = new CacheFirst({
  cacheName: imageCacheName,
  plugins: [
    new ExpirationPlugin({
      maxEntries: 60,
      maxAgeSeconds: timeInDay,
    }),
  ],
});

registerRoute(new NavigationRoute(offlineHandler));
registerRoute(({ request }) => request.destination === 'image', cacheImage);
registerRoute(({ url }) => url.origin === 'https://fonts.gstatic.com', cacheFontWebfonts);
registerRoute(({ url }) => url.origin === 'https://fonts.googleapis.com', cacheFontStyle);
