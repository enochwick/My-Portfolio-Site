import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { STATS } from './content'
import { Section } from './theme'
import { WordReveal } from './Reveal'

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const yCircle = useTransform(scrollYProgress, [0, 1], [80, -120])
  const yPill = useTransform(scrollYProgress, [0, 1], [120, -80])
  const yHex = useTransform(scrollYProgress, [0, 1], [40, -160])
  const rot = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <Section theme="grey" className="relative overflow-hidden">
      <div ref={ref} className="relative mx-auto max-w-[1760px] px-5 py-28 md:px-12 md:py-40">
        {/* floating shapes */}
        <motion.div
          style={{ y: yCircle }}
          className="pointer-events-none absolute -left-6 top-10 h-28 w-28 rounded-full border border-ink/15 md:h-40 md:w-40"
        />
        <motion.div
          style={{ y: yPill, rotate: rot }}
          className="pointer-events-none absolute right-4 top-0 h-16 w-36 rounded-full bg-accent/15 md:right-24 md:h-20 md:w-52"
        />
        <motion.div
          style={{ y: yHex }}
          className="pointer-events-none absolute bottom-8 right-1/3 h-20 w-20 rotate-12 bg-peach/40 md:h-28 md:w-28"
          aria-hidden
        />

        <h2 className="jm-display relative z-10 max-w-5xl text-[10vw] leading-[0.95] md:text-[5.5vw]">
          <WordReveal text={"7+ years making brands click and"} />{' '}
          <span className="text-accent italic">scroll</span>
        </h2>

        <div className="relative z-10 mt-14 flex flex-wrap gap-3">
          {STATS.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.625, 0.05, 0, 1] }}
              className="rounded-full border border-ink/15 bg-paper/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/70"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </Section>
  )
}
