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
    <span className={className} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word, wi) => {
            const idx = i++
            return (
              <span
                key={wi}
                className="inline-block overflow-hidden align-bottom"
                aria-hidden
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
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
    </span>
  )
}
