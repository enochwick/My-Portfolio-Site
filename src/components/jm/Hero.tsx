import { motion } from 'framer-motion'
import { PERSON } from './content'
import { Section } from './theme'
import { AmharicMatrix } from '../ui/amharic-matrix'

const EASE = [0.625, 0.05, 0, 1] as const
const BASE = 2.1 // start after the intro loader wipes away

// warm duotone so the cutout matches the amber theme
const DUOTONE = 'grayscale(1) sepia(0.34) saturate(1.5) brightness(1.03) contrast(1.08)'

function Word({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '108%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero() {
  return (
    <Section theme="dark" id="top" className="relative overflow-hidden">
      {/* interactive Amharic fidäl matrix */}
      <AmharicMatrix className="z-0" />

      {/* warm amber glow for depth */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[620px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[140px]"
        style={{ background: 'radial-gradient(closest-side, rgba(232,134,45,0.4), transparent)' }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col px-5 md:px-10">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: BASE }}
          className="flex items-center justify-between pt-28 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50"
        >
          <span>Portfolio — 2026</span>
          <span>{PERSON.location}</span>
        </motion.div>

        {/* name + photo intertwine */}
        <div className="relative flex flex-1 items-center justify-center py-6">
          <div className="relative w-full">
            {/* HENOK — behind the photo */}
            <h1 className="jm-display relative z-10 text-center text-[26vw] uppercase leading-[0.78] text-paper md:text-[17vw]">
              <Word delay={BASE + 0.1}>{PERSON.first}</Word>
            </h1>

            {/* photo — woven between the two words (flex wrapper centers it reliably) */}
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <motion.img
                src="/images/portrait.png"
                alt={`${PERSON.first} ${PERSON.last}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: BASE + 0.35 }}
                className="h-[58vh] w-auto max-w-none -translate-y-[3%] select-none object-contain md:h-[64vh]"
                style={{
                  filter: DUOTONE,
                  WebkitMaskImage: 'linear-gradient(to bottom, #000 86%, transparent 99%)',
                  maskImage: 'linear-gradient(to bottom, #000 86%, transparent 99%)',
                }}
              />
            </div>

            {/* TADESSE — in front of the photo */}
            <h1 className="jm-display relative z-30 text-center text-[26vw] uppercase leading-[0.78] text-paper md:text-[17vw]">
              <Word delay={BASE + 0.22}>{PERSON.last}</Word>
            </h1>
          </div>
        </div>

        {/* bottom caption */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: BASE + 0.6 }}
          className="flex items-end justify-between gap-4 pb-10"
        >
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
            Scroll
          </div>
          <p className="max-w-xs text-right font-sans text-sm leading-snug text-paper/70 sm:text-base">
            {PERSON.heroBottom}
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
