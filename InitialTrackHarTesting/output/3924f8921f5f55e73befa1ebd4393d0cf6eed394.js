importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

/*
var registerRoute = workbox.routing.registerRoute;
var CacheFirst = workbox.strategies.CacheFirst;
var CacheableResponse = workbox.cacheableResponse.CacheableResponse;
var ExpirationPlugin = workbox.expiration.ExpirationPlugin;


registerRoute(
    new RegExp(/https:\/\/(cdn1d-static-shared|stage-ss|ss)\.phncdn\.com\/.*\.js/),
    new CacheFirst({
        cacheName: 'ph-sharedcdn',
        plugins: [
            new CacheableResponse({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxEntries: 30
            })
        ],
    })
);
*/
workbox.routing.registerRoute(
    ({url, request, event}) => {  return (request.destination === 'image' && url.pathname.includes('android-app/android-img-01.jpg'));},
    new workbox.strategies.CacheFirst()
);

// workbox.routing.registerRoute(
//     ({request}) => request.destination === 'image',
//     new workbox.strategies.CacheFirst()
// );
// workbox.routing.registerRoute(
//     ({request}) => request.destination === 'style',
//     new workbox.strategies.CacheFirst()
// );
// workbox.routing.registerRoute(
//     ({request}) => request.destination === 'script',
//     new workbox.strategies.CacheFirst()
// );