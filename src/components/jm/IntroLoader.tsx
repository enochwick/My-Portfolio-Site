import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.625, 0.05, 0, 1] as const

// Everything slides DOWN: enter from above, leave downward. No overflow masks,
// so glyphs and the emoji are never clipped at any point in the animation.
const enter = { opacity: 0, y: '-55%' }
const shown = { opacity: 1, y: 0 }
const leave = { opacity: 0, y: '55%', transition: { duration: 0.9, ease: EASE } }
// y leaves the same way, but stays fully visible while it slides — the fade
// holds, then happens near the end of the drop rather than immediately.
const leaveY = {
  opacity: 0,
  y: '95%',
  transition: {
    y: { duration: 1.1, ease: EASE },
    opacity: { duration: 0.4, ease: EASE, delay: 0.6 },
  },
}
const LAYOUT = { duration: 0.9, ease: EASE }

/**
 * Name-intro wordplay (only the H is capital):
 *   phase 0  "Hey 👋"   — He + y fade/slide in with a waving hand
 *   phase 1  "Heynok"   — the 👋 fades + slides down out as "nok" fades + slides down in
 *   phase 2  "Henok"    — the y fades + slides down out, letters close up
 * then the panel wipes up to reveal the site.
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
      setTimeout(() => setPhase(1), 2100), // 👋 out, nok in
      setTimeout(() => setPhase(2), 3900), // y out → Henok
      setTimeout(() => setDone(true), 5200), // wipe up to the site
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (done) document.body.style.overflow = ''
  }, [done])

  const swap = phase >= 1 // 👋 leaves, nok arrives
  const yGone = phase >= 2

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-accent px-6 text-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <div className="jm-display flex max-w-full items-baseline justify-center text-[13vw] leading-[1.1] tracking-normal sm:text-7xl md:text-8xl">
            <AnimatePresence mode="popLayout">
              {/* He — fades + slides in on mount */}
              <motion.span
                key="he"
                layout="position"
                className="inline-block"
                initial={enter}
                animate={shown}
                transition={{ duration: 1, ease: EASE, delay: 0.25, layout: LAYOUT }}
              >
                He
              </motion.span>

              {/* y — present until it fades + slides down out → Henok */}
              {!yGone && (
                <motion.span
                  key="y"
                  layout="position"
                  className="inline-block"
                  initial={enter}
                  animate={shown}
                  exit={leaveY}
                  transition={{ duration: 1, ease: EASE, delay: 0.4, layout: LAYOUT }}
                >
                  y
                </motion.span>
              )}

              {/* 👋 wave — greets, then fades + slides straight down out.
                  No `layout` here: layout would animate its horizontal recenter
                  during exit, making it drift sideways instead of straight down. */}
              {!swap && (
                <motion.span
                  key="wave"
                  className="ml-[0.3em] inline-block"
                  initial={enter}
                  animate={shown}
                  exit={leave}
                  transition={{ duration: 1, ease: EASE, delay: 0.55 }}
                >
                  <motion.span
                    className="inline-block origin-[60%_85%]"
                    animate={{ rotate: [0, 18, -6, 16, -4, 12, 0] }}
                    transition={{ duration: 1.6, ease: 'easeInOut', delay: 1.1 }}
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
                  transition={{ duration: 1.1, ease: EASE, delay: 0.1, layout: LAYOUT }}
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
