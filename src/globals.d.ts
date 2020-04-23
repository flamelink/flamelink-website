import 'react';
import { Hub as Sentry } from '@sentry/types'
import { BrowserClient } from '@sentry/browser'

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy';
  }
}

declare global {
  interface Window {
    Sentry: Sentry & BrowserClient
  }
}


declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg'

declare module 'react-hover-observer'
declare module 'react-typeform-embed'

declare module 'tailwind.macro'

declare module 'tailwindcss/resolveConfig'

declare module 'gatsby-plugin-transitions'