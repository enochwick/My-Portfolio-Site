import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.625, 0.05, 0, 1] as const

/** Fade + rise on scroll-into-view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'span' | 'li' | 'p'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Word-by-word masked reveal for big editorial headlines
 * (stand-in for GSAP SplitText). Pass plain text; `\n` forces a line break.
 */
export function WordReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const lines = text.split('\n')
  let i = 0
  return (
    // whileInView lives on the (un-clipped) parent — observing an individual
    // word would deadlock, since each word starts translated 110% outside its
    // own overflow-hidden mask and IntersectionObserver reads it as never in
    // view. The parent drives the words via variants instead.
    <motion.span
      className={className}
      aria-label={text.replace(/\n/g, ' ')}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word, wi) => {
            const idx = i++
            return (
              <span
                key={wi}
                // pb + matching -mb gives descenders / round glyph bottoms (e.g.
                // the "G") room inside the overflow mask without changing layout.
                className="inline-block overflow-hidden align-bottom pb-[0.16em] -mb-[0.16em]"
                aria-hidden
              >
                <motion.span
                  className="inline-block"
                  variants={{ hidden: { y: '128%' }, visible: { y: 0 } }}
                  transition={{ duration: 0.7, ease: EASE, delay: delay + idx * stagger }}
                >
                  {word}
                  {wi < line.split(' ').length - 1 ? ' ' : ''}
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </motion.span>
  )
}
