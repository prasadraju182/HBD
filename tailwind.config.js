/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FFF8FB',
        'soft-pink': '#FFE8F1',
        'light-pink': '#FFC5D9',
        'mid-pink': '#FF6B9D',
        'hot-pink': '#FF3F7F',
        'magenta': '#E91E63',
        'dark-gray': '#2D2026',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 0px rgba(255, 59, 127, 0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 30px rgba(255, 59, 127, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(255, 59, 127, 0.15)',
        'soft-lg': '0 20px 40px rgba(255, 59, 127, 0.2)',
      }
    },
  },
  plugins: [],
}
