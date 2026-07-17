import { motion } from 'framer-motion'
import { PERSON } from './content'
import { Section } from './theme'
import { AmharicMatrix } from '../ui/amharic-matrix'

const EASE = [0.625, 0.05, 0, 1] as const
const BASE = 2.1 // start after the intro loader wipes away

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
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

      {/* warm amber glow for depth over the black */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-[130px]"
        style={{ background: 'radial-gradient(closest-side, rgba(232,134,45,0.4), transparent)' }}
      />
      {/* soft vignette so the headline stays legible over the grid */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-between px-5 pb-10 pt-28 md:px-10">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: BASE }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50"
        >
          <span>Portfolio — 2026</span>
          <span>{PERSON.location}</span>
        </motion.div>

        {/* center: headline + portrait */}
        <div className="grid flex-1 grid-cols-1 items-center gap-10 py-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1
              className="jm-display text-[16vw] leading-[0.86] text-paper md:text-[10.5vw] lg:text-[9.5vw]"
              style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
            >
              <Line delay={BASE + 0.1}>{PERSON.heroLine1}</Line>
              <Line delay={BASE + 0.22}>
                <span className="text-accent">{PERSON.heroLine2}</span>
              </Line>
            </h1>
          </div>

          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: BASE + 0.3 }}
          >
            <div className="relative mx-auto w-60 sm:w-72 md:w-full md:max-w-[380px]">
              {/* warm halo so the cutout sits in the scene rather than on top of it */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-[12%] top-[8%] -z-10 blur-[60px]"
                style={{ background: 'radial-gradient(closest-side, rgba(232,134,45,0.22), transparent)' }}
              />
              <img
                src="/images/portrait.png"
                alt={`${PERSON.first} ${PERSON.last}`}
                className="h-auto w-full select-none object-contain"
                style={{
                  // warm duotone to match the amber theme
                  filter: 'grayscale(1) sepia(0.32) saturate(1.35) brightness(1.02) contrast(1.03)',
                  // dissolve the bottom into the dark gradient
                  WebkitMaskImage: 'linear-gradient(to bottom, #000 58%, transparent 97%)',
                  maskImage: 'linear-gradient(to bottom, #000 58%, transparent 97%)',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: BASE + 0.5 }}
          className="flex items-end justify-between gap-4"
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
