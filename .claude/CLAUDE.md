# Portfolio — heynok.com

## Always Do First
- Read this file and `HENOK_PORTFOLIO_SPEC.md` fully before writing any code
- The spec is the source of truth for layout, spacing, typography, colors, and interactions
- Check `assets/` and `assets/projects.json` for real content — never use placeholders where real data exists

## Commands
- `npm run dev` — start Vite dev server (port 5173)
- `npm run build` — production build
- `npm run preview` — preview production build
- `npx vercel --prod` — deploy to Vercel (requires confirmation)

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v3.4
- Framer Motion ^12.38
- Lucide React
- Vercel

## Architecture
- Single-page, light/white theme with warm orange accent, scroll sections
- `src/components/sections/` — HeroSection, StatsMarquee, SkillsSection, AboutSection, PortfolioSection, ExperienceSection, ContactSection, Footer
- `src/components/ui/` — AccentButton, GhostButton, FadeIn, Magnet, AnimatedText, MobileNav, FloatingNav
- `src/data/` — projects.ts, services.ts, experience.ts
- `public/` — favicon, OG image

## Design Tokens — DO NOT DEVIATE
- Background: `#FFFFFF` primary, `#F5F5F5` surface
- Inverted: `#0C0C0C` (marquee, footer, floating nav)
- Text: `#0C0C0C` primary, `#6B6B6B` secondary, `#999999` muted
- Border: `rgba(12, 12, 12, 0.1)`
- Accent: `#E8862D` (warm amber-orange)
- Accent hover: `#D47828`
- Accent light: `rgba(232, 134, 45, 0.08)`
- Display: Instrument Serif italic (hero + footer marquee)
- Headings: JetBrains Mono bold/black
- Body: Inter Tight light/medium

## Accent Rules — orange is a precision tool
USE for: CTA buttons, section labels, floating nav CTA, hover states, active filters, form focus rings, social icon hover, category labels, badge text
DO NOT for: headings, body text, large backgrounds, borders (stay gray)

## Section Order
1. HeroSection — split name, badge in orange, portrait, live clock
2. StatsMarquee — dark band, scrolling stats
3. SkillsSection — numbered 01-06, orange labels, tool tags
4. AboutSection — scroll-reveal bio, CTAs, socials
5. PortfolioSection — masonry cards, orange category labels
6. ExperienceSection — career timeline
7. ContactSection — form with orange focus + submit
8. Footer — dark, marquee, credits
+ FloatingNav — fixed bottom dark pill, orange CTA, appears after hero

## Key Interactions
- FloatingNav: dark pill fixed bottom, appears/hides based on hero visibility
- Magnet: portrait hover
- AnimatedText: char-by-char scroll-reveal in About
- FadeIn: staggered whileInView everywhere
- Marquees: CSS infinite scroll (stats + footer)
- Live clock in hero
- Mobile nav overlay
- Animations: transform + opacity only

## Design Rules
- White + off-white alternating sections, dark for marquee/footer/nav
- Orange accent ONLY where spec says — section labels, CTAs, hover states
- Rounded-[40-60px] top corners on section transitions
- Soft shadows (rgba(0,0,0,0.06-0.08))
- Typography hierarchy: big type for names, light for descriptions
- Generous whitespace

## Don't
- Don't use orange on headings or body text
- Don't use orange backgrounds on sections
- Don't use colored gradients
- Don't skip the floating bottom nav
- Don't use Inter, Roboto, Arial, system fonts
- Don't use transition-all or harsh shadows
- Don't add features not in spec
- Don't skip mobile hamburger nav
