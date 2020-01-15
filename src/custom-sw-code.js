/* eslint-disable no-undef */
// Cache SVG's loaded from Firebase storage bucket and not served via Gatsby itself
workbox.routing.registerRoute(
  /^https:\/\/storage\.googleapis\.com\/flamelink-website\.appspot\.com\/flamelink\/media\/.*\.svg.*/,
  new workbox.strategies.StaleWhileRevalidate()
)

// Cache demo video thumbnail image
workbox.routing.registerRoute(
  /^https:\/\/www\.youtube-nocookie\.com\/embed\/8Cw5ktNADBQ.*/,
  new workbox.strategies.StaleWhileRevalidate()
)
/* eslint-enable no-undef */
