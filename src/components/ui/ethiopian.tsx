import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * A single "tibeb" motif — the geometric cross-and-diamond unit found in the
 * woven borders of habesha textiles. Chevrons on each side chain the motifs
 * into a continuous band.
 */
function TibebMotif() {
  return (
    <svg width="58" height="34" viewBox="0 0 58 34" fill="none" className="shrink-0">
      <path d="M29 4 L47 17 L29 30 L11 17 Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M29 10 V24 M21 17 H37" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="29" cy="17" r="1.5" fill="currentColor" />
      <path d="M2 17 L8 11 M2 17 L8 23" stroke="currentColor" strokeWidth="1.4" />
      <path d="M56 17 L50 11 M56 17 L50 23" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

/**
 * Animated tibeb weaving band. Scrolls infinitely; speeds up on hover
 * (interactive). Edge-masked so it dissolves into the page.
 */
export function TibebBand({ className }: { className?: string }) {
  const Row = () => (
    <div className="flex shrink-0 items-center gap-3">
      {Array.from({ length: 26 }).map((_, i) => (
        <TibebMotif key={i} />
      ))}
    </div>
  )

  return (
    <div
      aria-hidden
      className={cn(
        'group relative w-full overflow-hidden py-5 text-accent/35 transition-colors duration-500 hover:text-accent/70 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]',
        className,
      )}
    >
      <div className="flex w-max animate-[tibeb-scroll_38s_linear_infinite] group-hover:[animation-duration:14s]">
        <Row />
        <Row />
      </div>
    </div>
  )
}

/** Stylized geometric Ethiopian (Orthodox) cross. */
export function EthiopianCross({
  className,
  strokeWidth = 2,
}: {
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className={className} aria-hidden>
      {/* arms */}
      <path d="M50 6 V94 M6 50 H94" strokeWidth={strokeWidth} />
      {/* arm-end diamonds */}
      <path d="M50 6 l7 9 -7 9 -7 -9 z" strokeWidth={strokeWidth} />
      <path d="M50 94 l7 -9 -7 -9 -7 9 z" strokeWidth={strokeWidth} />
      <path d="M6 50 l9 -7 9 7 -9 7 z" strokeWidth={strokeWidth} />
      <path d="M94 50 l-9 -7 -9 7 9 7 z" strokeWidth={strokeWidth} />
      {/* center diamond + inner cross */}
      <path d="M50 32 l18 18 -18 18 -18 -18 z" strokeWidth={strokeWidth} />
      <path d="M50 42 V58 M42 50 H58" strokeWidth={strokeWidth} />
      <circle cx="50" cy="50" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Slow-rotating decorative cross for section backgrounds. */
export function SpinningCross({
  className,
  size = 320,
  duration = 44,
  reverse = false,
}: {
  className?: string
  size?: number
  duration?: number
  reverse?: boolean
}) {
  return (
    <motion.div
      aria-hidden
      className={cn('pointer-events-none absolute', className)}
      style={{ width: size, height: size }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <EthiopianCross className="h-full w-full" strokeWidth={1.1} />
    </motion.div>
  )
}
