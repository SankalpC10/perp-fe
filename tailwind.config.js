/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'primary-dark': '#1d4ed8',
        dark: {
          100: '#1E1E1E',
          200: '#2D2D2D',
          300: '#3D3D3D',
          400: '#4D4D4D',
          500: '#5C5C5C',
        },
      },
      backgroundColor: {
        'dark-base': '#0F0F0F',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
} 