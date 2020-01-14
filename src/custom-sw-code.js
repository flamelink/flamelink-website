/* eslint-disable no-undef */
// Cache SVG's loaded from Firebase storage bucket and not served via Gatsby itself
workbox.routing.registerRoute(
  /^https:\/\/storage\.googleapis\.com\/flamelink-website\.appspot\.com\/.*\.svg/,
  new workbox.strategies.CacheFirst()
)
/* eslint-enable no-undef */
