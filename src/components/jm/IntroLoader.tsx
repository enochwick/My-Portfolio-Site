import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.625, 0.05, 0, 1] as const

/**
 * Name-intro wordplay:
 *   phase 0  "HEY 👋"   — HE + Y appear with a waving hand
 *   phase 1  "HEY"      — the wave fades away
 *   phase 2  "HEYNOK"   — NOK slides in
 *   phase 3  "HENOK"    — the Y collapses away
 * then the panel wipes up to reveal the site.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState(0)
  const [done, setDone] = useState(false)

  // Measure natural widths so the letter masks can open/collapse without gaps.
  // A small buffer keeps the last glyph (Y / K) from clipping against the mask edge.
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
    // Re-measure once the web font swaps in (fonts load with display=swap, so the
    // first paint may use a wider fallback) to keep the masks accurate.
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
      setTimeout(() => setPhase(1), 1350), // wave fades away
      setTimeout(() => setPhase(2), 1800), // NOK appears  → HEYNOK
      setTimeout(() => setPhase(3), 3150), // Y collapses  → HENOK
      setTimeout(() => setDone(true), 4200), // wipe up to the site
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (done) document.body.style.overflow = ''
  }, [done])

  const waveGone = phase >= 1
  const nokIn = phase >= 2
  const yGone = phase >= 3

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-accent px-6 text-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.15, ease: EASE }}
        >
          <div className="jm-display flex max-w-full items-end justify-center text-[13vw] uppercase leading-[1.15] tracking-normal sm:text-7xl md:text-8xl">
            {/* HE — slides up on mount */}
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '120%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
              >
                HE
              </motion.span>
            </span>

            {/* Y — present from the start, then collapses away */}
            <motion.span
              className="inline-block overflow-hidden align-bottom"
              animate={{ width: yGone ? 0 : yw || 'auto' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <motion.span
                ref={yRef}
                className="inline-block"
                initial={{ y: '120%' }}
                animate={{ y: yGone ? '120%' : 0 }}
                transition={{ duration: 0.95, ease: EASE, delay: yGone ? 0 : 0.45 }}
              >
                Y
              </motion.span>
            </motion.span>

            {/* 👋 wave — greets, then fades + collapses before NOK arrives */}
            <motion.span
              className="inline-block overflow-hidden align-bottom"
              animate={{ width: waveGone ? 0 : ew || 'auto' }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <motion.span
                ref={eRef}
                className="ml-[0.3em] inline-block origin-[60%_85%]"
                initial={{ y: '120%', opacity: 1 }}
                animate={
                  waveGone
                    ? { y: 0, opacity: 0 }
                    : { y: 0, rotate: [0, 18, -6, 16, -4, 12, 0] }
                }
                transition={
                  waveGone
                    ? { duration: 0.4, ease: EASE }
                    : {
                        y: { duration: 0.9, ease: EASE, delay: 0.35 },
                        rotate: { duration: 1.3, ease: 'easeInOut', delay: 0.9 },
                      }
                }
              >
                👋
              </motion.span>
            </motion.span>

            {/* NOK — expands in beside HEY */}
            <motion.span
              className="inline-block overflow-hidden align-bottom"
              initial={{ width: 0 }}
              animate={{ width: nokIn ? nw || 'auto' : 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <motion.span
                ref={nRef}
                className="inline-block"
                initial={{ y: '120%' }}
                animate={{ y: nokIn ? 0 : '120%' }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                NOK
              </motion.span>
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
