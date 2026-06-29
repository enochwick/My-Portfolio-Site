import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PERSON } from './content'

const EASE = [0.625, 0.05, 0, 1] as const

/** Orange name-intro that grows a line, then wipes up to reveal the site. */
export function IntroLoader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => setDone(true), 2100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (done) document.body.style.overflow = ''
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-accent text-ink jm-display"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="flex items-center gap-3 overflow-hidden text-4xl sm:text-6xl md:text-7xl">
            {[PERSON.first, PERSON.last].map((word, i) => (
              <span key={word} className="flex items-center overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.12 }}
                >
                  {word}
                </motion.span>
                {i === 0 && (
                  <motion.span
                    className="mx-2 inline-block h-2.5 w-2.5 rounded-full bg-ink sm:h-3 sm:w-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.5 }}
                  />
                )}
              </span>
            ))}
          </div>
          <motion.div
            className="mt-8 h-px bg-ink/60"
            initial={{ width: 0 }}
            animate={{ width: '38vw' }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
