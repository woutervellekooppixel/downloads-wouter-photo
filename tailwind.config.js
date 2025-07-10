// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      animation: {
        'ping-custom': 'ping-custom 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'ping-custom': {
          '0%': { transform: 'scale(1)', opacity: '0.4' },
          '80%': { transform: 'scale(2.5)', opacity: '0' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}