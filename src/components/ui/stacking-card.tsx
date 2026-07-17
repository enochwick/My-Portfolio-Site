import { useRef } from 'react'
import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/lib/useIsMobile'

export interface StackingCardData {
  title: string
  eyebrow?: string
  description: string
  image: string
  color: string
  href?: string
}

/** Shared card visuals. `imageScale` only passed on desktop for the parallax. */
function CardBody({
  title,
  eyebrow,
  description,
  href = '#contact',
  image,
  imageScale,
}: StackingCardData & { imageScale?: MotionValue<number> }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-sans text-2xl font-semibold tracking-tight text-paper md:text-3xl">
          {title}
        </h3>
        {eyebrow && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-accent md:text-[11px]">
            {eyebrow}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:gap-10">
        <div className="md:w-[38%]">
          <p className="font-sans text-sm leading-relaxed text-paper/70 md:text-[15px]">
            {description}
          </p>
          <a
            href={href}
            className="group mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/90 underline-offset-4 hover:text-accent hover:underline"
          >
            See more
            <svg
              width="22"
              height="12"
              viewBox="0 0 22 12"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>

        <div className="relative h-[220px] overflow-hidden rounded-2xl md:h-[380px] md:w-[62%]">
          <motion.div className="h-full w-full" style={imageScale ? { scale: imageScale } : undefined}>
            <img
              src={encodeURI(image)}
              alt={title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </>
  )
}

interface CardProps extends StackingCardData {
  i: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}

/** Desktop sticky stacking card. */
function Card({ i, progress, range, targetScale, color, ...data }: CardProps) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.6, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="sticky top-0 flex h-screen items-center justify-center px-3 md:px-5">
      <motion.div
        style={{ backgroundColor: color, scale, top: `calc(-5vh + ${i * 26}px)` }}
        className="relative flex w-full origin-top flex-col overflow-hidden rounded-[28px] p-6 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10 md:p-12"
      >
        <CardBody {...data} color={color} imageScale={imageScale} />
      </motion.div>
    </div>
  )
}

/**
 * Sticky stacking cards on desktop; a plain vertical list on mobile (no
 * scroll-jacking — six pinned cards is exhausting to thumb-scroll).
 * Relies on the app-level Lenis instance rather than mounting its own.
 */
export function StackingCards({
  items,
  className,
}: {
  items: StackingCardData[]
  className?: string
}) {
  const isMobile = useIsMobile()
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  if (isMobile) {
    return (
      <div className={cn('space-y-5 px-3 pb-8', className)}>
        {items.map((item) => (
          <div
            key={item.title}
            style={{ backgroundColor: item.color }}
            className="relative overflow-hidden rounded-3xl p-6 ring-1 ring-white/10"
          >
            <CardBody {...item} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={container} className={cn('relative', className)}>
      {items.map((item, i) => (
        <Card
          key={item.title}
          i={i}
          {...item}
          progress={scrollYProgress}
          // spread ranges across the list so they stay ascending and < 1
          range={[i / items.length, 1]}
          targetScale={1 - (items.length - i) * 0.04}
        />
      ))}
    </div>
  )
}
