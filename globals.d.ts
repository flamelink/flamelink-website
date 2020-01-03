import 'react';

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy';
  }
}


declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg'

declare module 'react-hover-observer'

declare module 'tailwind.macro'

declare module 'tailwindcss/resolveConfig'

declare module 'gatsby-plugin-transitions'