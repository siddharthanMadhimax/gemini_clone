/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Scans all JS, JSX, TS, and TSX files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        'coral-red': '#FF4040',  // Define the custom coral-red color
      },
    },
  },
  plugins: [],
}
