/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#d5c8b8', // Beige
          DEFAULT: '#b8725f', // Rust
          dark: '#a65a47', // Darker Rust
        },
        secondary: {
          light: '#a3907d', // Taupe
          DEFAULT: '#595c3e', // Olive
          dark: '#454930', // Darker Olive
        },
        accent: {
          light: '#d5c8b8', // Beige
          DEFAULT: '#a3907d', // Taupe
          dark: '#8c7b69', // Darker Taupe
        },
        background: {
          light: '#f5f3f0', // Light background
          dark: '#191815', // Dark background (Charcoal)
        },
        text: {
          light: '#191815', // Dark text for light mode
          dark: '#f5f3f0', // Light text for dark mode
        },
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        display: ['Commissioner', 'serif'],
      },
    },
  },
  plugins: [],
};
