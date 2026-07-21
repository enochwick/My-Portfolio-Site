import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail } from 'lucide-react'
import { LinkedInIcon, YouTubeIcon } from '../ui/SocialIcons'
import AccentButton from '../ui/AccentButton'

function Squiggle() {
  return (
    <svg width="80" height="22" viewBox="0 0 80 22" fill="none" className="mb-8">
      <path
        d="M2 11 C10 3, 20 19, 30 11 S50 3, 60 11 S72 19, 80 11"
        stroke="#E8862D"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

// 700vh section, offset ['start start','end end'] → 600vh of usable scroll
//
// Phase map (% of scrollYProgress → ~vh):
//   0.00–0.12  heading slides in           (0–72vh)
//   0.00–0.40  circle: tiny dot → full     (0–240vh)
//   0.42–0.62  item 0 rise / hold / fade   (252–372vh)
//   0.62–0.82  item 1 rise / hold / fade   (372–492vh)
//   0.82–0.99  CTAs  rise / hold / fade    (492–594vh)

export default function AboutSection() {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // ── Circle: starts as a tiny dot, fills screen by 40% ─────────────────
  const circleScale = useTransform(scrollYProgress, [0.00, 0.40], [0.008, 1])

  // ── Heading: slides in during zoom, stays pinned forever ───────────────
  const headingX = useTransform(scrollYProgress, [0.00, 0.12], [-24, 0])

  // Items only appear AFTER circle is fully zoomed in (> 0.40)

  // ── Item 0: rise [0.42–0.50] • hold [0.50–0.57] • fade [0.57–0.62] ───
  const item0Opacity = useTransform(scrollYProgress, [0.42, 0.50, 0.57, 0.62], [0, 1, 1, 0])
  const item0Y       = useTransform(scrollYProgress, [0.42, 0.50], [52, 0])

  // ── Item 1: rise [0.62–0.70] • hold [0.70–0.77] • fade [0.77–0.82] ───
  const item1Opacity = useTransform(scrollYProgress, [0.62, 0.70, 0.77, 0.82], [0, 1, 1, 0])
  const item1Y       = useTransform(scrollYProgress, [0.62, 0.70], [52, 0])

  // ── CTAs:  rise [0.82–0.90] • hold [0.90–0.95] • fade [0.95–0.99] ────
  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.90, 0.95, 0.99], [0, 1, 1, 0])
  const ctaY       = useTransform(scrollYProgress, [0.82, 0.90], [52, 0])

  function copyEmail() {
    navigator.clipboard.writeText('enochwick@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const ghostBtn =
    'inline-flex items-center justify-center rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] font-mono font-medium uppercase tracking-wider text-sm px-8 py-3 transition-colors duration-200 hover:bg-white/10 hover:border-[#D7E2EA]/50'

  const socials = [
    { icon: LinkedInIcon, href: 'https://linkedin.com',       label: 'LinkedIn' },
    { icon: YouTubeIcon,  href: 'https://youtube.com',        label: 'YouTube'  },
    { icon: Mail,         href: 'mailto:enochwick@gmail.com', label: 'Email'    },
  ]

  return (
    <section id="about" className="bg-dark">
      {/* 700vh scroll driver */}
      <div ref={ref} style={{ height: '700vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-dark">

          {/* ── Concentric circle ───────────────────────────────────────── */}
          <div className="absolute top-1/2 left-1/2 md:left-[65%] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              style={{ scale: circleScale }}
              className="w-[300vw] h-[300vw] rounded-full bg-accent flex items-center justify-center"
            >
              <div className="w-[250vw] h-[250vw] rounded-full bg-dark" />
            </motion.div>
          </div>

          {/* ── Left heading — desktop ──────────────────────────────────── */}
          <motion.div
            style={{ x: headingX }}
            className="hidden md:flex absolute inset-y-0 left-0 w-[42%] flex-col justify-center px-10 lg:px-16 z-10"
          >
            <p className="font-mono uppercase tracking-[0.2em] text-xs text-accent mb-6">
              / About Me
            </p>
            <h2 className="font-mono font-black uppercase text-white leading-[0.88] text-6xl lg:text-[5.2rem]">
              <span className="text-accent">Creative</span>
              <br />at the
              <br />Core
            </h2>
          </motion.div>

          {/* ── Mobile heading ──────────────────────────────────────────── */}
          <div
            className="md:hidden absolute top-0 left-0 right-0 z-20 px-6 pt-14"
          >
            <p className="font-mono uppercase tracking-[0.2em] text-xs text-accent mb-3">
              / About Me
            </p>
            <h2 className="font-mono font-black uppercase text-white leading-[0.88] text-4xl">
              <span className="text-accent">Creative</span> at the Core
            </h2>
          </div>

          {/* ── Item 0 ─────────────────────────────────────────────────── */}
          <motion.div
            style={{ opacity: item0Opacity, y: item0Y }}
            className="absolute inset-y-0 right-0 w-full md:w-[58%] flex flex-col justify-center px-6 md:px-10 lg:px-14 z-10 pt-44 md:pt-0"
          >
            <Squiggle />
            <h3 className="font-mono font-black text-white text-2xl sm:text-3xl md:text-4xl mb-6 leading-tight">
              Designer. Developer.<br />AI Builder.
            </h3>
            <p className="font-sans font-light text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
              With 8+ years across healthcare, ecommerce, and tech, I merge creative
              direction with technical execution. 3D medical illustrations,
              FDA-compliant packaging, RAG-powered AI tools. Each one built with intent.
            </p>
          </motion.div>

          {/* ── Item 1 ─────────────────────────────────────────────────── */}
          <motion.div
            style={{ opacity: item1Opacity, y: item1Y }}
            className="absolute inset-y-0 right-0 w-full md:w-[58%] flex flex-col justify-center px-6 md:px-10 lg:px-14 z-10 pt-44 md:pt-0"
          >
            <Squiggle />
            <h3 className="font-mono font-black text-white text-2xl sm:text-3xl md:text-4xl mb-6 leading-tight">
              Built for Impact.
            </h3>
            <p className="font-sans font-light text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
              I don't just design how something looks. I design how it works, scales,
              and gets noticed. Brand thinking and engineering, merged.
              My work is incomparable.
            </p>
          </motion.div>

          {/* ── CTAs ───────────────────────────────────────────────────── */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="absolute inset-y-0 right-0 w-full md:w-[58%] flex flex-col justify-center px-6 md:px-10 lg:px-14 z-10 pt-44 md:pt-0"
          >
            <Squiggle />
            <h3 className="font-mono font-black text-white text-2xl sm:text-3xl md:text-4xl mb-8 leading-tight">
              Let's build something.
            </h3>
            <div className="flex flex-wrap gap-3 mb-8">
              <AccentButton href="https://calendly.com" external>Schedule a Call</AccentButton>
              <button onClick={copyEmail} className={ghostBtn}>
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={ghostBtn}>
                Download CV
              </a>
            </div>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/30 hover:text-accent transition-colors duration-150"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
