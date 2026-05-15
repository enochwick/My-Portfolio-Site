import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  text: string
  className?: string
}

export default function AnimatedText({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = text.split('')

  return (
    <p ref={ref} className={`${className} leading-relaxed`} aria-label={text}>
      {chars.map((char, i) => {
        const start = i / chars.length
        const end = Math.min(start + 1 / chars.length + 0.05, 1)
        return (
          <AnimatedChar
            key={i}
            char={char}
            progress={scrollYProgress}
            start={start}
            end={end}
          />
        )
      })}
    </p>
  )
}

function AnimatedChar({
  char,
  progress,
  start,
  end,
}: {
  char: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
  end: number
}) {
  const opacity = useTransform(progress, [start, end], [0.12, 1])
  return (
    <motion.span style={{ opacity }} aria-hidden>
      {char}
    </motion.span>
  )
}
