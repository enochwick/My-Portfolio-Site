Build a Creative Director + AI Builder portfolio landing page for "Henok Tadesse" using React, TypeScript, Tailwind CSS, Framer Motion, and Lucide React. Light/white theme with a warm orange accent, inspired by nikolaradeski.com. Three fonts from Google Fonts: Instrument Serif (display/hero, 400 italic), JetBrains Mono (headings/numbers/code, 400-800), Inter Tight (body/UI, 300-700). Page title: "Henok Tadesse — Creative Director + AI Builder".

---

GLOBAL STYLES
Background: #FFFFFF on html, body, #root, main wrapper
Font family: 'Inter Tight', sans-serif (body default)
Global reset: box-sizing border-box, margin 0, padding 0
Main wrapper: overflowX 'clip'

COLOR TOKENS
- Background primary: #FFFFFF
- Background surface: #F5F5F5 (alternating sections)
- Inverted surface: #0C0C0C (stats marquee, footer, floating nav)
- Text primary: #0C0C0C
- Text secondary: #6B6B6B
- Text muted: #999999
- Text on dark: #FFFFFF
- Border: rgba(12, 12, 12, 0.1)
- Border hover: rgba(12, 12, 12, 0.25)
- Accent: #E8862D (warm amber-orange)
- Accent hover: #D47828 (darker orange for hover/active)
- Accent light: rgba(232, 134, 45, 0.08) (subtle tinted backgrounds)
- Accent text-on: #FFFFFF (white text on orange buttons)

ACCENT USAGE RULES — orange is a precision tool, not paint:
USE for: CTA buttons, section labels ("/ Services"), floating nav CTA, hover glow on interactive elements, active filter states, link hover color (sparingly)
DO NOT use for: headings, body text, backgrounds (except subtle rgba tints), borders (stay gray), large surface areas

---

SECTION ORDER
1. HeroSection
2. StatsMarquee
3. SkillsSection (Services)
4. AboutSection
5. PortfolioSection
6. ExperienceSection
7. ContactSection
8. Footer
+ FloatingNav (fixed bottom, always visible after scroll)

---

FLOATING BOTTOM NAV (always present)
Fixed bottom center, z-50. Appears after user scrolls past hero (use Intersection Observer — hidden when hero is in view, slides up when hero exits viewport).

Container: dark pill — bg-[#0C0C0C], rounded-full, px-3 py-2, flex items-center gap-1, shadow-xl shadow-black/20. Max-width: max-w-fit, mx-auto. Bottom offset: bottom-6.

Left: Home icon button — Lucide Home, w-10 h-10, rounded-full, bg-transparent, color #FFFFFF at 60%. Hover: color #FFFFFF, bg-white/10.

Center links: "Skills", "About", "Portfolio", "Experience" — Inter Tight font-medium, text-sm, color #FFFFFF at 80%, px-4 py-2, rounded-full. Hover: bg-white/10, color #FFFFFF. Active (current section): bg-white/10.

Right: "Contact me" CTA — rounded-full, bg-[#E8862D], color #FFFFFF, Inter Tight font-semibold, text-sm, px-5 py-2.5. Hover: bg-[#D47828]. Active: scale 0.97.

Animation: slides up from bottom with Framer Motion (y: 80 → 0, opacity 0 → 1, spring easing). Slides down and fades when hero is back in view.

Mobile: condense to just Home icon + "Contact me" CTA. Or show 3 key links max.

---

1. HERO SECTION
Full viewport height (h-screen), flex column, overflowX clip, bg-white, position relative.

Optional: subtle looping white abstract background video at 15% opacity. Fallback: clean white with faint radial gradient center-top (rgba(0,0,0,0.015)).

Top navbar: NOT fixed (the floating bottom nav handles navigation). Simple top bar, px-6 md:px-10 pt-6 md:pt-8. Flex justify-between items-center.
Left: "HT" logo — JetBrains Mono font-bold, text-[#0C0C0C], text-xl.
Right: hidden on desktop (floating nav covers it). Mobile: optional hamburger.

Hero Content: flex column, items-start, justify-center, flex-1, px-6 md:px-10.

Badge: "Creative Director + AI Builder" — JetBrains Mono, uppercase, tracking-[0.3em], text-xs sm:text-sm, color #E8862D, mb-4. FadeIn: delay 0, y -15.

Name block:
Line 1: "HENOK" — Instrument Serif italic, color #0C0C0C, text-[16vw] sm:text-[14vw] md:text-[13vw] lg:text-[12vw], leading-[0.85], tracking-tight.
Between: "Designer & AI Builder" — Inter Tight font-light, text-lg sm:text-xl md:text-2xl, color #6B6B6B, ml-1, my-1 sm:my-2.
Line 2: "TADESSE" — JetBrains Mono font-black, color #0C0C0C, same size, leading-[0.85], tracking-tight.
FadeIn: line 1 delay 0.1 y 40, role delay 0.2 y 20, line 2 delay 0.25 y 40.

Portrait: absolute right on desktop. Magnet component (padding 120, strength 3).
Desktop (md+): right-[5%] lg:right-[8%], top-1/2 -translate-y-1/2, w-[300px] lg:w-[380px] xl:w-[440px].
Mobile: hidden or small below name.
Style: rounded-[30px], overflow-hidden, bg-[#F5F5F5], aspect-[3/4]. Placeholder "HT" monogram, color #0C0C0C at 8%. data-slot="portrait". Shadow: 0 20px 60px rgba(0,0,0,0.08).

Bottom bar: absolute bottom-0, w-full, px-6 md:px-10 pb-6 md:pb-10, flex justify-between items-end.
Left: "Flower Mound, TX — 00:00 CST" — Inter Tight font-light, text-sm, color #999999, uppercase, tracking-wider. Live clock.
Right: scroll indicator — circle (w-8 h-8, border border-[rgba(12,12,12,0.2)], rounded-full), Lucide ChevronDown, color #0C0C0C, animate-bounce.
FadeIn: delay 0.5.

---

2. STATS MARQUEE
Background #0C0C0C (dark contrast band). py-5 sm:py-6.

Repeating: "7+ Years of Experience / 50+ Successful Projects / Healthcare × Tech × Ecommerce / AI-Forward Creative / DFW Based / React + Tailwind + Supabase / Adobe Creative Suite / KeyShot 3D /"

JetBrains Mono font-medium, uppercase, tracking-widest, text-sm sm:text-base, color #FFFFFF. "/" separators: color #6B6B6B.

CSS marquee: translateX(0) → translateX(-50%), 30s linear infinite. Duplicated. Hover: pauses.

---

3. SKILLS / SERVICES SECTION
Background #FFFFFF. px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32.

Section label: "/ Services, Skills, Abilities" — JetBrains Mono, uppercase, tracking-[0.2em], text-xs sm:text-sm, color #E8862D, mb-4.

Heading: "What I do best?" — JetBrains Mono font-black, color #0C0C0C, text-4xl sm:text-5xl md:text-6xl, mb-4.

Sub: "I lead brands and products — creating design, 3D, web, and AI solutions that help businesses grow and make real impact." — Inter Tight font-light, color #6B6B6B, text-lg sm:text-xl, max-w-3xl, mb-16 sm:mb-20.

6 services, vertical list, max-w-5xl:

Each:
- Top: 1px border rgba(12,12,12,0.1)
- Grid: number left, content right
- Number: JetBrains Mono font-black, text-6xl sm:text-7xl md:text-8xl, color #0C0C0C at 6%. Hover: color shifts to #E8862D at 20%.
- Label: JetBrains Mono, uppercase, tracking-wider, text-xs, color #E8862D, mb-2.
- Name: JetBrains Mono font-medium, uppercase, color #0C0C0C, text-xl sm:text-2xl md:text-3xl, mb-3.
- Desc: Inter Tight font-light, color #6B6B6B, leading-relaxed, max-w-2xl, text-base sm:text-lg, mb-4.
- Tags: flex wrap. Each pill: rounded-full, bg-[#F5F5F5], px-3 py-1, Inter Tight text-xs sm:text-sm, color #6B6B6B. Hover: border border-[rgba(232,134,45,0.3)], color #0C0C0C. Gap: gap-2.
- Padding: py-8 sm:py-10 md:py-12.
- FadeIn: stagger i * 0.08.

01 — Brand Identity & Strategy / "Brand Defining"
"Complete brand systems from naming to style guides — logos, color palettes, typography, and visual language that makes businesses unmistakable."
Tags: Illustrator, Photoshop, InDesign, Figma, Brand Strategy, Style Guides

02 — 3D Rendering & Visualization / "Detail Driven"
"Photorealistic product renders, medical illustrations, and packaging prototypes using KeyShot and ZBrush. From concept to camera-ready."
Tags: KeyShot, ZBrush, Adobe Dimension, Blender, Medical Illustration

03 — Product & Packaging Design / "Production Ready"
"End-to-end packaging for consumer products and regulated medical devices — print-ready, FDA-compliant, shelf-ready."
Tags: Illustrator, InDesign, KeyShot, Dieline Design, Print Production

04 — Web Design & Development / "Code + Craft"
"Modern React sites with clean aesthetics, smooth motion, and responsive layouts. Built to ship, not just look good in Figma."
Tags: React, Tailwind CSS, Vite, Vercel, Framer Motion, TypeScript

05 — AI-Powered Products / "AI Forward"
"RAG chatbots, AI sales assistants, and intelligent tools built with React, Supabase, and LLM APIs. Design meets engineering."
Tags: Supabase, pgvector, Gemini API, React, RAG Architecture

06 — Marketing & Print Collateral / "Campaign Driven"
"Conference materials, trade show booths, brochures, social media campaigns, and digital ads — designed for healthcare, tech, and DTC brands."
Tags: InDesign, Photoshop, Premiere Pro, Social Media, Event Design

---

4. ABOUT SECTION
Background #F5F5F5. Rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]. px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32.

Section label: "/ About Me" — JetBrains Mono, color #E8862D, mb-4.

Heading: "Creative at the Core" — JetBrains Mono font-black, uppercase, color #0C0C0C, text-4xl sm:text-5xl md:text-6xl, mb-6.

Two-column on desktop:

Left (md:w-1/2):
Roles: "Designer. Developer. AI Builder. Problem-solver." — JetBrains Mono font-medium, color #0C0C0C, text-lg, mb-6.

Bio (AnimatedText scroll-reveal): "With 7+ years of experience across healthcare, ecommerce, and tech — I merge creative direction with technical execution. From 3D medical illustrations and FDA-compliant packaging to RAG-powered AI tools, I build things that are crafted with intent and built for impact. My work is incomparable."
Inter Tight font-medium, color #0C0C0C, leading-relaxed, text-base sm:text-lg. Each char: opacity 0.1 → 1 on scroll.

CTAs (flex row, gap-3, mt-8, flex-wrap):
- "Schedule a Call" — AccentButton (orange, see components).
- "Copy Email" — GhostButton. Click: copies enochwick@gmail.com, text → "Copied!".
- "Download CV" — GhostButton, links to resume PDF.

Socials (flex, gap-4, mt-6): Lucide Linkedin, Youtube, Mail — w-5 h-5, color #999999. Hover: color #E8862D.

Right (md:w-1/2):
Portrait: w-full max-w-[400px], rounded-[30px], bg-white, aspect-[3/4], shadow 0 20px 60px rgba(0,0,0,0.06). data-slot="about-portrait". FadeIn: delay 0.2, x 60.

---

5. PORTFOLIO SECTION
Background #FFFFFF. Rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]. px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32.

Section label: "/ Portfolio Projects" — JetBrains Mono, color #E8862D, mb-4.

Heading row: flex justify-between items-end, mb-4.
Left: "Selected Work" — JetBrains Mono font-black, uppercase, color #0C0C0C, text-4xl sm:text-5xl md:text-6xl.
Right (desktop): "Complete Portfolio →" — Inter Tight font-medium, text-sm, color #6B6B6B, hover: color #E8862D.

Sub: "A carefully picked showcase of projects that highlight my commitment to craft." — Inter Tight font-light, color #6B6B6B, text-lg, mb-12.

2-column masonry on desktop, single on mobile. Gap: gap-6 md:gap-8.

Each card:
- bg-white, rounded-[20px] sm:rounded-[28px], border border-[rgba(12,12,12,0.08)], overflow-hidden.
- Hover: border-[rgba(12,12,12,0.2)], shadow 0 12px 40px rgba(0,0,0,0.06).
- Image: full width, aspect-[16/10], bg-[#F5F5F5], overflow-hidden. Placeholder: https://placehold.co/800x500/F5F5F5/CCCCCC?text=ProjectName. Hover: scale 1.03 / 500ms.
- Content: p-5 sm:p-6.
  - Category: Inter Tight uppercase, tracking-wider, text-xs, color #E8862D, mb-2.
  - Title: JetBrains Mono font-bold, color #0C0C0C, text-lg sm:text-xl, mb-2.
  - Desc: Inter Tight font-light, color #6B6B6B, text-sm, line-clamp-2.

Cards:
1. "Kana Coffee — Brand Identity" / Brand Identity (featured, tall)
2. "Empyrian Skincare" / Product Packaging
3. "CTL Amedica" / Print & 3D Medical
4. "SP Movers" / Brand Identity
5. "RAG Sales Assistant" / AI / Development
6. "Eshi Utopia" / Digital Design (featured, tall)

---

6. EXPERIENCE SECTION
Background #F5F5F5. Rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]. px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32.

Section label: "/ Career" — JetBrains Mono, color #E8862D, mb-4.

Heading row: flex justify-between items-end.
Left: "Work Experience" — JetBrains Mono font-black, uppercase, #0C0C0C, text-4xl sm:text-5xl md:text-6xl.
Right: "Download CV" GhostButton.

Sub: "My impact over the years." — Inter Tight font-light, #6B6B6B, text-lg, mb-12.

Timeline, max-w-4xl:
Each: flex row items-baseline, border-b rgba(12,12,12,0.08), py-6 sm:py-8.
Left: years — JetBrains Mono font-medium, text-sm sm:text-base, color #999999, min-w-[140px] sm:min-w-[180px].
Right: role (JetBrains Mono font-bold, #0C0C0C, text-xl sm:text-2xl md:text-3xl) + company (Inter Tight font-light, #6B6B6B).
FadeIn: stagger i * 0.06.

"2022 – 2025" — Marketing Communications Coordinator — CTL Amedica
"2020 – 2022" — Creative Director & eCommerce Specialist — Eshi Utopia
"2018 – 2020" — Retail Supervisor — Hudson Group
"2018" — Direct Marketing Representative — Charity Advertising & Marketing Partners
"2007 – 2016" — Graphic Designer & IT Support — Habesha Weekly Advertising

---

7. CONTACT SECTION
Background #FFFFFF. Rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]. px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32.

Section label: "/ Contact Information" — JetBrains Mono, color #E8862D, mb-4.

Heading: "Let's get started" — JetBrains Mono font-black, #0C0C0C, text-4xl sm:text-5xl md:text-6xl, mb-4.

Sub: "I would love to hear more about your project or company." — Inter Tight font-light, #6B6B6B, text-lg, mb-12.

Two-column desktop:

Left:
- Paragraph: "If the work above fits what you need, send me a note. Share the goal, a link, budget range, and when you want to start. I'll reply with the next step." — Inter Tight, #6B6B6B, mb-8.
- Email: "enochwick@gmail.com" — JetBrains Mono, #0C0C0C, text-lg. Hover: color #E8862D.
- Location: "Flower Mound, TX" — Inter Tight, #999999.
- Socials: same row.

Right:
Form fields: "Your Full Name *", "Your Role *", "Your Email *", "Your Status *" (select: "I have a project" / "I am a recruiter" / "Just saying hi"), "More info *" (textarea).
Inputs: bg-[#F5F5F5], border rgba(12,12,12,0.1), rounded-xl, px-4 py-3, Inter Tight, color #0C0C0C. Focus: border-[#E8862D]/50, ring-1 ring-[#E8862D]/15. Gap: gap-4.
Submit: AccentButton full-width "Submit".

---

8. FOOTER
Background #0C0C0C. Rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px].

Marquee: "Let's work together ✱" repeating — Instrument Serif italic, text-4xl sm:text-5xl md:text-6xl, color #FFFFFF at 15%. CSS marquee 25s infinite. py-6.

Below: px-6 md:px-10, py-8, flex justify-between items-center.
Left: "© 2026 Henok Tadesse" — Inter Tight font-light, text-sm, #999999.
Center: "enochwick@gmail.com" — JetBrains Mono, text-sm, #FFFFFF. Hover: color #E8862D.
Right: "Built with craft and code." — Inter Tight font-light, text-sm, #999999.

---

REUSABLE COMPONENTS

AccentButton (primary CTA): Rounded-full. bg-[#E8862D], color #FFFFFF. JetBrains Mono font-bold, uppercase, tracking-widest. px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4, text-xs sm:text-sm md:text-base. Hover: bg-[#D47828], scale 1.02. Active: scale 0.97. Transition 200ms.

GhostButton: Rounded-full. Border rgba(12,12,12,0.15), color #0C0C0C, bg transparent. JetBrains Mono font-medium, uppercase, tracking-wider, text-sm. Hover: bg-[#F5F5F5], border-[rgba(12,12,12,0.3)]. Same sizing.

FadeIn: Framer Motion whileInView, viewport once true margin "50px" amount 0. Props: delay, duration (0.7), x (0), y (30). Easing: [0.25, 0.1, 0.25, 1].

Magnet: Mouse-following magnetic hover. padding 120, strength 3. In: 0.3s ease-out. Out: 0.6s ease-in-out.

AnimatedText: Char scroll-reveal. Opacity 0.1 → 1. useScroll offset ['start 0.8', 'end 0.2'].

MobileNav: Full-screen overlay. bg-white/98, backdrop-blur-xl, z-50. Links centered, Instrument Serif italic, text-4xl.

FloatingNav: See section above. Fixed bottom, dark pill, appears on scroll past hero.

---

KEY DEPENDENCIES
react, react-dom (^18.3.1), framer-motion (^12.38.0), lucide-react (^0.344.0), tailwindcss (^3.4.1), vite, typescript

RESPONSIVE: Tailwind defaults, mobile-first, fluid clamp() type.
PERFORMANCE: Lazy images, passive scroll, IntersectionObserver, <200KB gzip, Formspree forms.
