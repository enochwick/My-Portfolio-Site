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
        // shadcn-style tokens mapped to the portfolio's light theme
        background: '#FFFFFF',
        foreground: '#0C0C0C',
        // Editorial "Juan Mora"-style palette
        ink: '#0C0C0C',
        paper: '#F3EDE6',
        grey: '#EAEAEA',
        peach: '#FFBC95',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter Tight"', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
}
