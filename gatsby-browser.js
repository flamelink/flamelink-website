import './src/styles/globals.css'
import 'typeface-roboto'

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!('IntersectionObserver' in window)) {
    import('intersection-observer')
    console.log('# IntersectionObserver is polyfilled!')
  }
}

// Disable - gatsby-page-transitions handle this
export const shouldUpdateScroll = () => {
  return false
}
