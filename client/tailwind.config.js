/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html", 
      "./src/**/*.{js,jsx,ts,tsx}", 
    ],
    theme: {
      extend: {
        colors: {
          customColor: '#123456',
        },
      },
    },
    plugins: [],
  }
  