/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a962',
          light: '#dfc88a',
          dark: '#a68a4b',
        },
        cream: '#faf8f5',
        charcoal: '#2d2d2d',
        'warm-gray': rgb(34, 31, 28),
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': {opacity: '0', transform: 'translateY(20px)'},
          '100%': {opacity: '1', transform: 'translateY(0)'},
        },
        shimmer: {
          '0%': {backgroundPosition: '-200% 0'},
          '100%': {backgroundPosition: '200% 0'},
        },
      },
    },
  },
  plugins: [],
};
