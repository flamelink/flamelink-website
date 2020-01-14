// https://storage.googleapis.com/flamelink-website.appspot.com/flamelink/media/ef0B7EzhN8VTnaccmKEQ_woe-the-challenge.svg?GoogleAccessId=firebase-adminsdk-w2zzo%40flamelink-website.iam.gserviceaccount.com&Expires=16725218400&Signature=g1APUB4qYt4jULOLTGGYzTZY%2Ft4d9i7NXIUW8BY63TPug5SWFaALFENpOCbWLem%2Fl%2FOxd%2FZHPAVxSC8PZ51e5aKuOX1H2JyIR3XtAmQt6VR8SGITo4mxbUGlxPbc3PA7zQE3EegfEmziAFL1G22HaNqbbuFj6m7dYZ3X7klLA%2FtcmoLrpswSGB1UWB3yvpwqU%2Bp5e9GJf3A%2BN9u5VXFPCliztIa2Xpzh8wmZDmQuGGEH5kBdyYJlJ1HMJxPK8hVAe1dWXdKlW%2Fb%2BB0KVBe6ZmRmB5PzGsK8jYRVju1UGVTNGFHKX5AJP79UnoZPLHA4byD20g6UOLJGPwXV%2BcVV5ig%3D%3D

/* eslint-disable no-undef */
// Cache SVG's loaded from Firebase storage bucket and not served via Gatsby itself
workbox.routing.registerRoute(
  /^https:\/\/storage\.googleapis\.com\/flamelink-website\.appspot\.com\/.*\.svg/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'app-firebase-icons'
  })
)
/* eslint-enable no-undef */
