// See https://tailwindcss.com/docs/configuration for details
const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-primary': '#ff5722',
        'brand-secondary': '#323232',
        gray: {
          ...colors.gray,
          '100': '#f5f5f5'
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
      textColor: {
        primary: '#646464'
      },
      padding: {
        '25': '6.25rem'
      }
    }
  },
  variants: {},
  plugins: []
}
