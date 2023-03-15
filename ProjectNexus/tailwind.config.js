/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html, js}",
            "./src/views/*.ejs",
            "./src/views/partials/*.{ejs, html}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss')
  ],
}
