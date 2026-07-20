import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.625, 0.05, 0, 1] as const

// Generous vertical room inside the overflow masks so slides don't clip glyphs —
// especially the lowercase "y" descender. Cancelled by matching negative margins
// so layout/baseline stay put.
const MASK = 'inline-block overflow-hidden align-bottom pt-[0.1em] -mt-[0.1em] pb-[0.26em] -mb-[0.26em]'

/**
 * Name-intro wordplay (only the H is capital):
 *   phase 0  "Hey 👋"   — He + y rise with a waving hand
 *   phase 1  "Heynok"   — the 👋 fades + slides down as "nok" fades in + slides down in its place
 *   phase 2  "Henok"    — the y collapses away
 * then the panel wipes up to reveal the site.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState(0)
  const [done, setDone] = useState(false)

  // Measure natural widths so the letter masks open/collapse without gaps.
  const yRef = useRef<HTMLSpanElement>(null)
  const nRef = useRef<HTMLSpanElement>(null)
  const eRef = useRef<HTMLSpanElement>(null)
  const [yw, setYw] = useState(0)
  const [nw, setNw] = useState(0)
  const [ew, setEw] = useState(0)
  const measure = () => {
    if (yRef.current) setYw(yRef.current.offsetWidth + 3)
    if (nRef.current) setNw(nRef.current.offsetWidth + 3)
    if (eRef.current) {
      const ml = parseFloat(getComputedStyle(eRef.current).marginLeft) || 0
      setEw(eRef.current.offsetWidth + ml + 3)
    }
  }
  useLayoutEffect(() => {
    measure()
    // Re-measure once the web font swaps in (display=swap → first paint may be a
    // wider fallback) so the masks stay accurate.
    document.fonts?.ready.then(measure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }
    document.body.style.overflow = 'hidden'
    const timers = [
      setTimeout(() => setPhase(1), 2100), // 👋 slides down out, nok slides down in
      setTimeout(() => setPhase(2), 3900), // y collapses  → Henok
      setTimeout(() => setDone(true), 5200), // wipe up to the site
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (done) document.body.style.overflow = ''
  }, [done])

  const swap = phase >= 1 // 👋 out, nok in
  const yGone = phase >= 2

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-accent px-6 text-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <div className="jm-display flex max-w-full items-end justify-center text-[13vw] leading-[1.1] tracking-normal sm:text-7xl md:text-8xl">
            {/* He — slides up on mount */}
            <span className={MASK}>
              <motion.span
                className="inline-block"
                initial={{ y: '150%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
              >
                He
              </motion.span>
            </span>

            {/* y — present from the start, then collapses away → Henok */}
            <motion.span
              className={MASK}
              animate={{ width: yGone ? 0 : yw || 'auto' }}
              transition={{ duration: 1, ease: EASE }}
            >
              <motion.span
                ref={yRef}
                className="inline-block"
                initial={{ y: '150%' }}
                animate={{ y: yGone ? '150%' : 0, opacity: yGone ? 0 : 1 }}
                transition={{ duration: yGone ? 0.9 : 1.3, ease: EASE, delay: yGone ? 0 : 0.5 }}
              >
                y
              </motion.span>
            </motion.span>

            {/* 👋 wave — greets, then fades + slides DOWN out */}
            <motion.span
              className={MASK}
              animate={{ width: swap ? 0 : ew || 'auto' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <motion.span
                ref={eRef}
                className="ml-[0.3em] inline-block origin-[60%_85%]"
                initial={{ y: '150%', opacity: 1 }}
                animate={
                  swap
                    ? { y: '150%', opacity: 0 }
                    : { y: 0, rotate: [0, 18, -6, 16, -4, 12, 0] }
                }
                transition={
                  swap
                    ? { duration: 0.9, ease: EASE }
                    : {
                        y: { duration: 1.2, ease: EASE, delay: 0.6 },
                        rotate: { duration: 1.6, ease: 'easeInOut', delay: 1.3 },
                      }
                }
              >
                👋
              </motion.span>
            </motion.span>

            {/* nok — fades in + slides DOWN into the 👋's place */}
            <motion.span
              className={MASK}
              initial={{ width: 0 }}
              animate={{ width: swap ? nw || 'auto' : 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <motion.span
                ref={nRef}
                className="inline-block"
                initial={{ y: '-150%', opacity: 0 }}
                animate={{ y: swap ? 0 : '-150%', opacity: swap ? 1 : 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: swap ? 0.15 : 0 }}
              >
                nok
              </motion.span>
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
