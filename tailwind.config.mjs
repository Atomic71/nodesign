/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFA500', // Light Orange
          DEFAULT: '#FF8C00', // Dark Orange
          dark: '#FF4500', // Red Orange
        },
        secondary: {
          light: '#8B4513', // Light Brown
          DEFAULT: '#A0522D', // Sienna
          dark: '#8B0000', // Dark Red
        },
        accent: {
          light: '#FFD700', // Gold
          DEFAULT: '#DAA520', // Goldenrod
          dark: '#B8860B', // Dark Goldenrod
        },
        neutral: {
          100: '#F5F5F5', // Almost White
          200: '#E0E0E0',
          300: '#CCCCCC',
          400: '#B8B8B8',
          500: '#A4A4A4',
          600: '#909090',
          700: '#7C7C7C',
          800: '#686868',
          900: '#545454', // Dark Gray
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
