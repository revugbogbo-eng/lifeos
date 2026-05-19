
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'los-bg':       '#07070f',
        'los-card':     '#0f0f1a',
        'los-card2':    '#141428',
        'los-purple':   '#7c6fff',
        'los-purple2':  '#9d8fff',
        'los-teal':     '#00d4aa',
        'los-green':    '#22c55e',
        'los-red':      '#ff4d6d',
        'los-orange':   '#f97316',
        'los-blue':     '#38bdf8',
        'los-gold':     '#f59e0b',
        'los-text':     '#f1f1f8',
        'los-text2':    '#9898b8',
        'los-text3':    '#55556a',
        'los-border':   'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float':   'float 3s ease-in-out infinite',
        'glow':    'glow 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(124,111,255,0.3)' },
          '50%':      { boxShadow: '0 0 20px rgba(124,111,255,0.6)' },
        },
      },
    },
  },
  plugins: [],
}
