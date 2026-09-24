/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#06111f',
        panel: '#0d1b2e',
        line: 'rgba(148, 163, 184, 0.2)',
        cyanSoft: '#67e8f9',
        violetSoft: '#a78bfa',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(103,232,249,.12), 0 18px 60px rgba(5,15,30,.45)',
      },
    },
  },
  plugins: [],
};
