
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
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
        'verifyz-gradient': 'linear-gradient(180deg, #0b1020 0%, #121a3a 50%, #182457 100%)',
        'circuit': "url('/assets/images/circuit-bg.png')"
      }
    },
  },
  plugins: [],
};

export default config;
