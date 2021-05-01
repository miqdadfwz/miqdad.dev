import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

const timeInHour = 60 * 60;
const timeInDay = 24 * timeInHour;
const timeInYear = 365 * timeInDay;

// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST);

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
  cacheName: 'images',
  plugins: [
    new ExpirationPlugin({
      maxEntries: 60,
      maxAgeSeconds: timeInDay,
    }),
  ],
});

registerRoute(({ request }) => request.destination === 'image', cacheImage);
registerRoute(({ url }) => url.origin === 'https://fonts.gstatic.com', cacheFontWebfonts);
registerRoute(({ url }) => url.origin === 'https://fonts.googleapis.com', cacheFontStyle);
