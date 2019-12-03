// See https://tailwindcss.com/docs/configuration for details
const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      boxShadow: {
        default: '0 0 25px 0 rgba(0, 0, 0, 0.15)'
      },
      colors: {
        brand: '#ff5722',
        'brand-light': '#f9c2b1',
        'brand-dark': '#ca3d10',
        gray: {
          ...colors.gray,
          '100': '#f5f5f5',
          '400': '#c8c8c8',
          '600': '#646464',
          '800': '#323232'
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
        '5xl': '2.5rem'
      },
      spacing: {
        '30': '7.5rem',
        '34': '8.5rem'
      },
      textColor: {
        body: '#323232',
        heading: '#646464',
        brand: '#ff5722',
        'brand-light': '#f9c2b1',
        'brand-dark': '#e25225'
      },
      margin: {
        '15': '3.75rem'
      },
      padding: {
        '15': '3.75rem',
        '25': '6.25rem'
      }
    }
  },
  variants: {},
  plugins: []
}
