import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

export interface TimelineEntry {
  title: React.ReactNode
  content: React.ReactNode
}

/**
 * A single timeline row. Its content is dimmed until the growing line reaches
 * it — the reveal is driven by the SAME scroll progress as the line, keyed to
 * this row's measured position (`revealAt`), so they animate in together.
 */
function TimelineRow({
  item,
  progress,
  revealAt,
}: {
  item: TimelineEntry
  progress: MotionValue<number>
  revealAt: number
}) {
  const opacity = useTransform(progress, [revealAt - 0.07, revealAt + 0.02], [0.12, 1])
  const y = useTransform(progress, [revealAt - 0.07, revealAt + 0.02], [28, 0])

  return (
    <div className="flex justify-start pt-10 md:gap-20 md:pt-40">
      <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
        <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#141009] ring-1 ring-white/10 md:left-3">
          <div className="h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_12px_rgba(232,134,45,0.7)]" />
        </div>
        <motion.div style={{ opacity }} className="hidden md:block md:pl-20">
          {item.title}
        </motion.div>
      </div>

      <motion.div style={{ opacity, y }} className="relative w-full pl-20 pr-4 md:pl-4">
        <div className="mb-4 block md:hidden">{item.title}</div>
        {item.content}
      </motion.div>
    </div>
  )
}

/**
 * Scroll-driven timeline: a gradient line grows as you scroll, and each entry's
 * content fades in in sync with the line reaching it. Theme-aware (dark + amber).
 */
export const Timeline = ({
  data,
  heading,
  intro,
}: {
  data: TimelineEntry[]
  heading?: string
  intro?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  // reveal point (in scroll-progress space) per entry — refined once measured
  const [reveals, setReveals] = useState<number[]>(() => data.map((_, i) => (i + 0.4) / data.length))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const h = el.getBoundingClientRect().height
      setHeight(h)
      const rows = Array.from(el.children).slice(0, data.length) as HTMLElement[]
      setReveals(rows.map((r) => Math.min(0.99, (r.offsetTop + r.offsetHeight * 0.26) / h)))
    }
    measure()
    window.addEventListener('load', measure)
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('load', measure)
      window.removeEventListener('resize', measure)
    }
  }, [data])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 18%', 'end 65%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className="w-full px-5 font-sans md:pl-28 md:pr-12" ref={containerRef}>
      {(heading || intro) && (
        <div className="mx-auto max-w-[1760px] pt-6">
          {heading && (
            <h2 className="jm-display mb-4 max-w-4xl whitespace-pre-line text-[9vw] leading-[0.95] text-paper md:text-[4.4vw]">
              {heading}
            </h2>
          )}
          {intro && <p className="max-w-md text-sm text-paper/55 md:text-base">{intro}</p>}
        </div>
      )}

      <div ref={ref} className="relative mx-auto max-w-[1760px] pb-20">
        {data.map((item, index) => (
          <TimelineRow
            key={index}
            item={item}
            progress={scrollYProgress}
            revealAt={reveals[index] ?? (index + 0.4) / data.length}
          />
        ))}

        <div
          style={{ height: height + 'px' }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/15 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-accent from-[0%] via-accent/50 via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
