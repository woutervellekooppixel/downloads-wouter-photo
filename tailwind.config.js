// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'shine': 'shine 1.8s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'sonar': 'sonar 3s ease-out infinite', // ✅ toegevoegd
      },
      keyframes: {
        shine: {
          '0%': { left: '-100%' },
          '50%': { left: '100%' },
          '100%': { left: '100%' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
        sonar: { // ✅ toegevoegd
          '0%': {
            transform: 'scale(1)',
            opacity: '0.4',
          },
          '100%': {
            transform: 'scale(2.5)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};
