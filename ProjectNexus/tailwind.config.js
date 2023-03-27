/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html, js}",
            "./src/views/*.ejs",
            "./src/views/partials/*.{ejs, html}"],
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
  plugins: [
    require('tailwindcss')
  ],
}
