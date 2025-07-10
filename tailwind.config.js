// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'ping-custom': 'ping-custom 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'ping-custom': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '80%': { transform: 'scale(2)', opacity: '0' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};