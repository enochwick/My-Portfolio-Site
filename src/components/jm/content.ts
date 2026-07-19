// Centralized real content for the editorial portfolio.
// Copy sourced from Henok's portfolio PDF + resume (authentic voice & projects).
// Note: "Henok's Blueprint" is a private strategy doc — its private details are
// intentionally NOT used here; only public-safe positioning language.

export const PERSON = {
  first: 'Henok',
  last: 'Tadesse',
  email: 'enochwick@gmail.com',
  phone: '+1 323 961 5519',
  location: 'Dallas, TX',
  role: 'Multi-disciplinary Designer & AI Builder',
  // hero headline (\n = line break); accent applied to the 2nd line
  heroLine1: 'Designer &',
  heroLine2: 'AI Builder',
  heroBottom:
    'Multi-disciplinary graphic designer & visual artist — crafting brand systems, 3D, and production AI tools.',
  yearsExp: '7+ years',
}

// From the portfolio "Meet Henok" intro (verbatim-ish).
export const BIO = {
  lead: "Hi — I'm Henok Tadesse, a multi-disciplinary graphic designer and visual artist working primarily in Adobe Creative Suite and KeyShot 3D Studio.",
  body: "I take inspiration from a wide variety of sources, from prog-rock album covers to 20th-century avant-garde art. I'd love to help bring your creative vision to life in a bold and memorable way.",
  // From the resume professional summary.
  summary:
    'A strong foundation in healthcare marketing and over 7 years crafting impactful work — surgical guides, 3D product renderings, and a diverse range of digital and print design.',
}

export const SOCIALS = [
  { label: 'Email', short: '@', href: 'mailto:enochwick@gmail.com' },
  { label: 'LinkedIn', short: 'in', href: 'https://linkedin.com' },
  { label: 'Behance', short: 'Be', href: 'https://behance.net' },
  { label: 'YouTube', short: 'Yt', href: 'https://youtube.com' },
]

export const STATS = [
  '7+ Years of Experience',
  'Adobe Creative Suite',
  'KeyShot 3D Studio',
  'ZBrush Digital Sculpting',
  'Healthcare × Tech × Ecommerce',
  'RAG + AI Tools',
  'Dallas, TX',
  'Shopify + Printful',
]

// Services / disciplines, described in Henok's own portfolio language.
export const SERVICES = [
  {
    n: '01',
    title: 'Brand Identity',
    copy: 'Brand strategy, naming, logo design, tagline, identity systems and supporting styleguides — like the full identity built for an Ethiopian coffee shop.',
    images: ['/images/portfolio/12.webp', '/images/portfolio/32.webp', '/images/portfolio/8.webp'],
  },
  {
    n: '02',
    title: 'Product Packaging',
    copy: 'Packaging for consumer products and regulated medical devices — from a natural, organic skincare startup to a spine-implant manufacturer.',
    images: [
      '/images/portfolio/1.webp',
      '/images/portfolio/top-view-amber-plastic-pump-cosmetic-bottle-mockup-template@2x.webp',
      '/images/portfolio/top-view-elegant-amber-glass-dropper-bottle-and-cosmetic-jar-packaging-mockup-template@2x.webp',
      '/images/portfolio/5.webp',
    ],
  },
  {
    n: '03',
    title: '3D Rendering & Visualization',
    copy: 'Product and packaging prototypes, medical illustrations, surgical manuals and animations — created in KeyShot 3D Studio and Adobe Dimension.',
    images: [
      '/images/portfolio/paper-coffee-cups-with-sleeve-and-sugar-packaging-on-the-wooden-surface-mockup-template@2x.webp',
      '/images/portfolio/plural-kraft-paper-stand-up-pouch-bag-mockup-template@2x.webp',
      '/images/portfolio/fabric-tote-bag-and-kraft-paper-envelope-complete-branding-identity-stationery-mockup-template@2x (2).webp',
      '/images/portfolio/front-view-cardboard-paper-mailer-boxes-mockup-template@2x.webp',
    ],
  },
  {
    n: '04',
    title: 'Print Design',
    copy: 'Brochures, trade-show collateral and event materials — including booth design for a spine-implant maker at NASS, the biggest spine convention in North America.',
    images: [
      '/images/portfolio/NASS Booth Front Mockup1.webp',
      '/images/portfolio/NASS for SocialMedia@2x@2x.webp',
      '/images/portfolio/Silicon Nitride Teaser for SocialPost.webp',
    ],
  },
  {
    n: '05',
    title: 'Digital Design',
    copy: 'Social-media content creation and copywriting, ecommerce storefronts, and responsive web design that connects brands with their audience.',
    images: ['/images/portfolio/47.webp', '/images/portfolio/2.webp', '/images/portfolio/7.webp'],
  },
  {
    n: '06',
    title: 'AI-Powered Products',
    copy: 'Production AI tools — RAG portals and sales assistants — built alongside brand and product work, where design meets engineering.',
    images: ['/images/portfolio/shadow-overlay-flat-lay-multi-device-responsive-mockup-template@2x.webp', '/images/portfolio/three-folded-brochure-and-iphone-mockup-template@2x.webp'],
  },
]

// Descriptions in Henok's own portfolio language. `color` drives the stacking
// cards — a warm progression so each card reads distinctly as it stacks.
export const PROJECTS = [
  {
    title: 'Kana Coffee',
    category: 'Brand Identity',
    image: '/images/portfolio/11.webp',
    description:
      'Brand strategy, brand name, logo design, tag line, identity design and a supporting styleguide for an Ethiopian coffee shop. Coffee with character.',
    color: '#1A1512',
  },
  {
    title: 'Empyrian',
    category: 'Product Packaging',
    image: '/images/portfolio/4.webp',
    description:
      'Packaging for a natural and organic skincare startup — from concept through to photorealistic 3D renders. Skincare redefined.',
    color: '#241C16',
  },
  {
    title: 'CTL Amedica',
    category: 'Print & 3D Medical',
    image: '/images/portfolio/23.webp',
    description:
      'Implant packaging, surgical guides and print design for a spine implant manufacturer — plus booth ideation at NASS, the biggest spine convention in North America.',
    color: '#2E241B',
  },
  {
    title: 'SP Movers',
    category: 'Brand Re-design',
    image: '/images/portfolio/31.webp',
    description:
      'Re-branding of a local moving company: primary logo, alternative marks, vehicle wraps, business cards and a full colour and type system.',
    color: '#382C20',
  },
  {
    title: 'Eshi Utopia',
    category: 'Digital Design',
    image: '/images/portfolio/46.webp',
    description:
      'Social media content creation and copywriting for an ecommerce apparel brand connecting Ethiopian creatives and the diaspora.',
    color: '#433424',
  },
  {
    title: 'RAG Sales Assistant',
    category: 'AI / Development',
    image: '/images/portfolio/0.webp',
    description:
      'An AI-powered sales assistant built with React, Supabase pgvector and Gemini — where design meets engineering, and the work actually ships.',
    color: '#5A4429',
  },
]

// Value props, grounded in the real story (healthcare + craft + systems + AI).
export const BENEFITS = [
  'A strong foundation in healthcare marketing — surgical guides, implant packaging, and regulated work done right.',
  'I care about the craft, from first concept to the final shipped product.',
  'I build scalable brand systems and styleguides that keep brands consistent.',
  'I merge design with engineering — including production AI tools — so the work actually ships.',
]

// Closing CTA line, from the portfolio's final page (verbatim).
export const CTA = {
  headline: "Let's bring your\nidea to life",
  sub: "If you're looking for a designer to help bring an idea to life — and you're on a tight timeline — let's connect.",
}

export const MADE_WITH = ['React', 'Tailwind', 'Framer Motion', 'Lenis', 'Vite', 'Vercel']
