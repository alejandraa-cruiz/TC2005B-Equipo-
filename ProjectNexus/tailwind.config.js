/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html, js}",
            "./public/scripts/index.min.js",
            "./src/views/*.{ejs, html, js}",
            "./src/views/partials/*.{ejs, html, js}",
            "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    screens: {
      'phone': {'max': '640px'},
    },
    extend: {
      fontFamily: {
        inter: ['"Inter"', 'sans-serif']
      },
      colors: {
        mainBg: '#eeeeee',
        dropZone: '#fbfcfd',
        dropBorder: '#0f27761a',
        accent: {
          1: '#ee3323',
          2: '#ff3120'
        },
        custom: {
          200: '#98a2b3'
        }
      }
    },
  },
  plugins: [[require('tw-elements/dist/plugin')],
            require('tailwindcss')]
}
