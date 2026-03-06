/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        brand: '#E01E2B',
        'brand-glow': '#FF2D3B',
        dark: { DEFAULT: '#121218', 100: '#1A1A22', 200: '#22222C', 300: '#2A2A34' },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
