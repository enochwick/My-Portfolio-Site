import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

const EASE = [0.625, 0.05, 0, 1] as const
const enter = { opacity: 0, y: '-55%' }
const shown = { opacity: 1, y: 0 }
const leave = { opacity: 0, y: '55%', transition: { duration: 0.5, ease: EASE } }
const LAYOUT = { duration: 0.5, ease: EASE }

/**
 * The same "Hey 👋 → Heynok" wordplay as the intro, but loops continuously while
 * in view: it swaps between "Hey 👋" and "Heynok" (y turning brand orange) over
 * and over. Maskless, so nothing ever clips.
 */
export function HeynokReveal({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' })
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!inView) return
    // Loop forever while in view: toggle between "Hey 👋" and "Heynok".
    const iv = setInterval(() => setPhase((p) => (p === 0 ? 1 : 0)), 1800)
    return () => clearInterval(iv)
  }, [inView])

  const swap = phase >= 1

  return (
    <div ref={ref} className={className}>
      <div className="jm-display flex items-baseline justify-center leading-[1.1] tracking-normal text-[20vw] md:text-[14vw]">
        <AnimatePresence mode="popLayout">
          {inView && (
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
          )}

          {inView && (
            <motion.span
              key="y"
              layout="position"
              className="inline-block"
              initial={enter}
              animate={{ opacity: 1, y: 0, color: swap ? '#E8862D' : '#F3EDE6' }}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: 0.2,
                layout: LAYOUT,
                color: { duration: 0.5, ease: EASE, delay: 0.4 },
              }}
            >
              y
            </motion.span>
          )}

          {inView && !swap && (
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

          {inView && swap && (
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
    </div>
  )
}
