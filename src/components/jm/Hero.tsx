import { motion, useScroll, useTransform } from 'framer-motion'
import { PERSON } from './content'
import { Section } from './theme'
import { AmharicMatrix } from '../ui/amharic-matrix'

const EASE = [0.625, 0.05, 0, 1] as const
const BASE = 2.1 // start after the intro loader wipes away

// warm duotone so the cutout matches the amber theme
const DUOTONE = 'grayscale(1) sepia(0.34) saturate(1.5) brightness(1.03) contrast(1.08)'

function Word({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
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
  // drive the sequence off absolute window scroll (px) — robust with Lenis + sticky
  const { scrollY } = useScroll()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900
  const SLIDE = typeof window !== 'undefined' ? Math.max(window.innerWidth * 0.75, 900) : 1100

  // Phase 1 — the name splits apart and fades; the photo fades with it.
  const henokX = useTransform(scrollY, [0, vh * 0.28], [0, SLIDE])
  const henokO = useTransform(scrollY, [0, vh * 0.24], [1, 0])
  const tadessX = useTransform(scrollY, [0, vh * 0.28], [0, -SLIDE])
  const tadessO = useTransform(scrollY, [0, vh * 0.24], [1, 0])
  const photoO = useTransform(scrollY, [vh * 0.05, vh * 0.3], [1, 0])
  const photoS = useTransform(scrollY, [vh * 0.05, vh * 0.3], [1, 0.9])
  const captionO = useTransform(scrollY, [0, vh * 0.2], [1, 0])

  // Phase 2 — the role assembles in from both sides once the name is gone,
  // finishing early (~0.5vh) so it holds fully-formed for the rest of the pin.
  const desX = useTransform(scrollY, [vh * 0.32, vh * 0.5], [-SLIDE * 0.8, 0])
  const desO = useTransform(scrollY, [vh * 0.32, vh * 0.46], [0, 1])
  const aiX = useTransform(scrollY, [vh * 0.32, vh * 0.5], [SLIDE * 0.8, 0])
  const aiO = useTransform(scrollY, [vh * 0.32, vh * 0.46], [0, 1])

  return (
    <Section theme="dark" id="top" className="relative">
      {/* tall scroll track drives the sticky hero animation */}
      <div className="relative h-[180vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* interactive Amharic fidäl matrix */}
          <AmharicMatrix className="z-0" />

          {/* warm amber glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[620px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[140px]"
            style={{ background: 'radial-gradient(closest-side, rgba(232,134,45,0.4), transparent)' }}
          />

          <div className="relative z-10 mx-auto flex h-[100svh] max-w-[1500px] flex-col px-5 md:px-10">
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

            {/* name + photo intertwine → role swap */}
            <div className="relative flex flex-1 items-center justify-center py-6">
              <div className="relative w-full">
                {/* HENOK — behind the photo, slides right + fades */}
                <motion.h1
                  style={{ x: henokX, opacity: henokO }}
                  className="jm-display relative z-10 text-center text-[19vw] uppercase leading-[0.82] text-paper md:text-[17vw]"
                >
                  <Word delay={BASE + 0.1}>{PERSON.first}</Word>
                </motion.h1>

                {/* photo — woven between the words, fades away with the name */}
                <motion.div
                  style={{ opacity: photoO, scale: photoS }}
                  className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
                >
                  <motion.img
                    src="/images/portrait.webp"
                    alt={`${PERSON.first} ${PERSON.last}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, ease: EASE, delay: BASE + 0.35 }}
                    fetchPriority="high"
                    decoding="async"
                    className="h-[48vh] w-auto max-w-none -translate-y-[3%] select-none object-contain md:h-[64vh]"
                    style={{
                      filter: DUOTONE,
                      WebkitMaskImage: 'linear-gradient(to bottom, #000 86%, transparent 99%)',
                      maskImage: 'linear-gradient(to bottom, #000 86%, transparent 99%)',
                    }}
                  />
                </motion.div>

                {/* TADESSE — in front of the photo, slides left + fades */}
                <motion.h1
                  style={{ x: tadessX, opacity: tadessO }}
                  className="jm-display relative z-30 text-center text-[19vw] uppercase leading-[0.82] text-paper md:text-[17vw]"
                >
                  <Word delay={BASE + 0.22}>{PERSON.last}</Word>
                </motion.h1>

                {/* role — assembles in once the name is gone */}
                <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center">
                  <motion.span
                    style={{ x: desX, opacity: desO }}
                    className="jm-display block text-center text-[13vw] leading-[0.85] text-paper md:text-[8vw]"
                  >
                    {PERSON.heroLine1}
                  </motion.span>
                  <motion.span
                    style={{ x: aiX, opacity: aiO }}
                    className="jm-display block text-center text-[13vw] leading-[0.85] text-accent md:text-[8vw]"
                  >
                    {PERSON.heroLine2}
                  </motion.span>
                </div>
              </div>
            </div>

            {/* bottom caption — fades out as the name fades */}
            <motion.div
              style={{ opacity: captionO }}
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
        </div>
      </div>
    </Section>
  )
}
