import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.625, 0.05, 0, 1] as const

/**
 * Name-intro wordplay: "HE" + "Y" reads HEY, then "NOK" slides in (HEYNOK),
 * then the "Y" collapses away to leave HENOK — and the panel wipes up to the site.
 *
 * Phases: 0 = HEY · 1 = HEYNOK · 2 = HENOK · then `done` wipes the panel up.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState(0)
  const [done, setDone] = useState(false)

  // Measure the natural widths of Y and NOK so we can animate them open/closed
  // (a flex row keeps everything centered as the widths change).
  const yRef = useRef<HTMLSpanElement>(null)
  const nRef = useRef<HTMLSpanElement>(null)
  const [yw, setYw] = useState(0)
  const [nw, setNw] = useState(0)
  useLayoutEffect(() => {
    if (yRef.current) setYw(yRef.current.offsetWidth)
    if (nRef.current) setNw(nRef.current.offsetWidth)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }
    document.body.style.overflow = 'hidden'
    const timers = [
      setTimeout(() => setPhase(1), 1250), // NOK appears  → HEYNOK
      setTimeout(() => setPhase(2), 2650), // Y collapses  → HENOK
      setTimeout(() => setDone(true), 3700), // wipe up to the site
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (done) document.body.style.overflow = ''
  }, [done])

  const nokIn = phase >= 1
  const yGone = phase >= 2

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-accent text-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.15, ease: EASE }}
        >
          <div className="jm-display flex items-end justify-center text-5xl uppercase leading-[0.82] tracking-[-0.02em] sm:text-7xl md:text-8xl">
            {/* HE — slides up on mount */}
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '115%' }}
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
                initial={{ y: '115%' }}
                animate={{ y: yGone ? '115%' : 0 }}
                transition={{ duration: 0.95, ease: EASE, delay: yGone ? 0 : 0.45 }}
              >
                Y
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
                initial={{ y: '115%' }}
                animate={{ y: nokIn ? 0 : '115%' }}
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
