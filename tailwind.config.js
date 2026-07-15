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
        // shadcn button tokens (NOTE: `accent` above stays the brand orange)
        primary: '#0C0C0C',
        'primary-foreground': '#FFFFFF',
        secondary: '#F5F0E9',
        'secondary-foreground': '#0C0C0C',
        muted: '#EDE7DE',
        'muted-foreground': '#6B6B6B',
        'accent-foreground': '#0C0C0C',
        destructive: '#DC2626',
        'destructive-foreground': '#FFFFFF',
        border: '#E5E0D8',
        input: '#E5E0D8',
        ring: '#E8862D',
        card: '#FFFFFF',
        'card-foreground': '#0C0C0C',
        popover: '#FFFFFF',
        'popover-foreground': '#0C0C0C',
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
