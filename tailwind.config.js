/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // this ensures all React files are scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
