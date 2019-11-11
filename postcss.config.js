module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-preset-env')({
      autoprefixer: true,
      features: {
        'nesting-rules': true
      }
    })
  ]
}
