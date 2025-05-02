/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        frontPage: '#B8336A',
        sunny: '#FCFDAF',
        rainy: '#0776C5',
        cloudy: '#9999A0',
        snow: '#F0F0F9'
      },
    },
  },
  plugins: [],
}
