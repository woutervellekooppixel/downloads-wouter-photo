// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'ping-custom': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(6)', opacity: '0' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
      },
      animation: {
        'ping-custom': 'ping-custom 2.5s ease-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};