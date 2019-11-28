// See https://tailwindcss.com/docs/configuration for details
const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#ff5722',
        'brand-light': '#f9c2b1',
        'brand-dark': '#e25225',
        gray: {
          ...colors.gray,
          '100': '#f5f5f5',
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
      textColor: {
        body: '#323232',
        heading: '#646464',
        brand: '#ff5722',
        'brand-light': '#f9c2b1',
        'brand-dark': '#e25225'
      },
      padding: {
        '25': '6.25rem'
      }
    }
  },
  variants: {},
  plugins: []
}
