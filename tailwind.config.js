/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#E8862D',
        'accent-hover': '#D47828',
        dark: '#0C0C0C',
        surface: '#F5F5F5',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter Tight"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
