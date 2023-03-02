/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#31C48D'
      },

      fontSize: {
        tiny: ['10px', '10px'],
        xs: ['11px', '11px'],
        base: ['15px', '18px'],
        sm: ['13px', '13px']
      }
    },
  },
  plugins: [],
}
