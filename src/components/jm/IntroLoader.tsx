import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AmharicMatrix } from '../ui/amharic-matrix'

const EASE = [0.625, 0.05, 0, 1] as const

// Everything slides DOWN: enter from above, leave downward. No overflow masks,
// so glyphs and the emoji are never clipped at any point in the animation.
const enter = { opacity: 0, y: '-55%' }
const shown = { opacity: 1, y: 0 }
const leave = { opacity: 0, y: '55%', transition: { duration: 0.5, ease: EASE } }
const LAYOUT = { duration: 0.5, ease: EASE }

/**
 * Name-intro wordplay (only the H is capital), landing on the brand "Heynok":
 *   phase 0  "Hey 👋"   — He + y fade/slide in with a waving hand
 *   phase 1  "Heynok"   — the 👋 fades + slides down out as "nok" fades + slides
 *                          down in
 * then the orange panel wipes up to reveal the site.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }
    document.body.style.overflow = 'hidden'
    const timers = [
      setTimeout(() => setPhase(1), 1200), // 👋 out, nok in, y turns orange
      setTimeout(() => setDone(true), 2900), // wipe up to the site
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (done) document.body.style.overflow = ''
  }, [done])

  const swap = phase >= 1 // 👋 leaves, nok arrives, y turns orange

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-accent px-6 text-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          {/* faded, self-animating Amharic fidäl matrix behind the name */}
          <AmharicMatrix auto className="am-faded z-0 opacity-70 pointer-events-none" />

          <div className="jm-display relative z-10 flex max-w-full items-baseline justify-center text-[13vw] leading-[1.1] tracking-normal sm:text-7xl md:text-8xl">
            <AnimatePresence mode="popLayout">
              {/* He — fades + slides in on mount */}
              <motion.span
                key="he"
                layout="position"
                className="inline-block"
                initial={enter}
                animate={shown}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1, layout: LAYOUT }}
              >
                He
              </motion.span>

              {/* y — stays through to the end → "Heynok". (No orange here: the
                  panel itself is brand orange, so the y keeps the ink color.) */}
              <motion.span
                key="y"
                layout="position"
                className="inline-block"
                initial={enter}
                animate={shown}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2, layout: LAYOUT }}
              >
                y
              </motion.span>

              {/* 👋 wave — greets, then fades + slides straight down out.
                  No `layout` here: layout would animate its horizontal recenter
                  during exit, making it drift sideways instead of straight down. */}
              {!swap && (
                <motion.span
                  key="wave"
                  className="pl-[0.3em] inline-block"
                  initial={enter}
                  animate={shown}
                  exit={leave}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                >
                  <motion.span
                    className="inline-block origin-[60%_85%]"
                    animate={{ rotate: [0, 18, -6, 16, -4, 12, 0] }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.6 }}
                  >
                    👋
                  </motion.span>
                </motion.span>
              )}

              {/* nok — fades + slides down into the 👋's place */}
              {swap && (
                <motion.span
                  key="nok"
                  layout="position"
                  className="inline-block"
                  initial={enter}
                  animate={shown}
                  exit={leave}
                  transition={{ duration: 0.65, ease: EASE, delay: 0.05, layout: LAYOUT }}
                >
                  nok
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
