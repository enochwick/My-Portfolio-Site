# Portfolio — heynok.com

## Always Do First
- Read this file and `HENOK_PORTFOLIO_SPEC.md` before writing code
- Spec is source of truth for layout, color, interactions
- Check `assets/` for real content before placeholders

## Commands
- `npm run dev` — Vite (port 5173)
- `npm run build` — production build

## Stack
React 18 + TypeScript + Vite, Tailwind v3.4, Framer Motion, Lucide React, Vercel

## Architecture
- Light/white theme, warm orange accent, scroll sections
- `src/components/sections/` — Hero, StatsMarquee, Skills, About, Portfolio, Experience, Contact, Footer
- `src/components/ui/` — AccentButton, GhostButton, FadeIn, Magnet, AnimatedText, MobileNav, FloatingNav
- `src/data/` — projects.ts, services.ts, experience.ts

## Design Tokens — DO NOT DEVIATE
- Background: `#FFFFFF` primary, `#F5F5F5` surface, `#0C0C0C` inverted
- Text: `#0C0C0C`, `#6B6B6B`, `#999999`
- Accent: `#E8862D` (orange) — CTAs, labels, hover states ONLY
- Accent hover: `#D47828`
- Fonts: Instrument Serif italic (display), JetBrains Mono (headings), Inter Tight (body)
- Orange is NOT for headings, body text, or large backgrounds

## Key Features
- FloatingNav: dark pill fixed bottom, orange CTA, appears after hero scroll
- Magnet portrait, AnimatedText scroll-reveal, FadeIn stagger
- CSS marquees (stats + footer), live clock in hero
- Rounded-[40-60px] section transitions

## Rules
- TypeScript strict, no `any`
- Mobile-first, transform+opacity animations only
- Soft shadows, generous whitespace
- Every clickable: hover + focus-visible + active
- Mobile hamburger nav required
- Don't add features not in spec
