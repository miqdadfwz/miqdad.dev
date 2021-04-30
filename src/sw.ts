import { CacheFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

const timeInHour = 60 * 60;
const timeInDay = 24 * timeInHour;

// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST);

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
