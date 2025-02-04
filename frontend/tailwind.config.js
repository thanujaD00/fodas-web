/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          light: '#333333',
        },
        secondary: {
          DEFAULT: '#FFFFFF',
          dark: '#E5E5E5',
        }
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'reverse-spin': 'reverse-spin 1s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
          to: {
            transform: 'rotate(0deg)'
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};