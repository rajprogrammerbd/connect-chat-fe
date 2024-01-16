/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'maxLg': '1668px',
      'minLg': "1022px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
}