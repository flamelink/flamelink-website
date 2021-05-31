import * as Sentry from '@sentry/browser'
import './src/styles/globals.css'
import 'typeface-montserrat'

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!('IntersectionObserver' in window)) {
    import('intersection-observer')
    console.log('# IntersectionObserver is polyfilled!')
  }

  Sentry.init({
    dsn: process.env.GATSBY_SENTRY_DSN,
    environment: process.env.FLAMELINK_ENV,
    attachStacktrace: true
  })

  window.Sentry = Sentry
}

// Disable - gatsby-page-transitions handle this
export const shouldUpdateScroll = () => {
  return false
}
