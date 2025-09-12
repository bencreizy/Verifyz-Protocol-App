
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0b1020',
          800: '#121a3a',
          700: '#182457',
          neon: '#14e3ff'
        }
      },
      boxShadow: {
        glow: '0 0 20px rgba(20,227,255,0.35)'
      },
      backgroundImage: {
        'verifyz-gradient': 'linear-gradient(180deg, #0b1020 0%, #121a3a 50%, #182457 100%)'
      }
    },
  },
  plugins: [],
}
