// See https://tailwindcss.com/docs/configuration for details
const { colors } = require('tailwindcss/defaultTheme')

const BRAND_COLOR = '#ff6633'
const BRAND_COLOR_LIGHT = '#f9c2b1'
const BRAND_COLOR_DARK = '#b83400' // '#f24e2d'
const BRAND_COLOR_TEXT_HEADING = '#646464'
const BRAND_COLOR_LIGHT_TEXT_BODY = '#4a4a4a'
const BRAND_COLOR_TEXT_BODY = '#323232'

module.exports = {
  theme: {
    extend: {
      boxShadow: {
        default: '0 0 25px 0 rgba(0, 0, 0, 0.15)'
      },
      colors: {
        brand: BRAND_COLOR,
        'brand-light': BRAND_COLOR_LIGHT,
        'brand-dark': BRAND_COLOR_DARK,
        gray: {
          ...colors.gray,
          '100': '#f5f5f5',
          '400': '#c8c8c8',
          '500': 'rgba(50, 50, 50, 0.48)',
          '550': '#6f6f6f',
          '600': BRAND_COLOR_TEXT_HEADING,
          '700': BRAND_COLOR_LIGHT_TEXT_BODY,
          '800': BRAND_COLOR_TEXT_BODY
        }
      },
      fontFamily: {
        sans: [
          'Roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
      },
      fontSize: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3.125rem'
      },
      spacing: {
        '30': '7.5rem',
        '34': '8.5rem'
      },
      textColor: {
        body: BRAND_COLOR_TEXT_BODY,
        heading: BRAND_COLOR_TEXT_HEADING,
        brand: BRAND_COLOR,
        'brand-light': BRAND_COLOR_LIGHT,
        'brand-dark': BRAND_COLOR_DARK
      },
      maxWidth: {
        '4xl': '57.25rem',
        '6xl': '71.375rem', // '69.375rem'
        '7xl': '86.4375rem'
      },
      margin: {
        '9': '2.25rem',
        '15': '3.75rem'
      },
      padding: {
        '15': '3.75rem',
        '23': '5.75rem',
        '25': '6.25rem'
      }
    }
  },
  variants: {},
  plugins: []
}
