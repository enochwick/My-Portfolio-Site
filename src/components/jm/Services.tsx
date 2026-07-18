import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SERVICES } from './content'
import { Section } from './theme'
import { Reveal, WordReveal } from './Reveal'

const EASE = [0.625, 0.05, 0, 1] as const

/**
 * A wide, centered row of large images that lies tilted back and "stands up"
 * into a flat row as it scrolls into view.
 */
function ServiceRow({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'center 0.55'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [42, 0])
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 1])

  return (
    <div ref={ref} style={{ perspective: 1600 }} className="mt-12 md:mt-16">
      <motion.div
        style={{ rotateX, y, opacity, transformOrigin: 'center bottom' }}
        className="flex snap-x snap-mandatory justify-start gap-4 overflow-x-auto pb-2 [transform-style:preserve-3d] [scrollbar-width:none] md:justify-center md:gap-6 md:overflow-visible"
      >
        {images.map((src, i) => (
          <motion.div
            key={src + i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
            className="relative aspect-square w-[76vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-white/5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/5 sm:w-[46vw] md:w-auto md:flex-1"
          >
            <img
              src={encodeURI(src)}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export function Services() {
  return (
    <Section theme="dark" id="services" className="relative">
      {/* wider container so the image rows read large */}
      <div className="mx-auto max-w-[1760px] px-5 pb-24 pt-10 md:px-12 md:pb-36 md:pt-16">
        {/* centered section header */}
        <div className="mx-auto mb-20 flex max-w-3xl flex-col items-center text-center md:mb-28">
          <Reveal className="mb-5 inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> What I do
          </Reveal>
          <h2 className="jm-display text-[8.5vw] leading-[0.95] text-paper md:text-[4.2vw]">
            <WordReveal text={'I help companies succeed on projects like:'} />
          </h2>
        </div>

        <div className="space-y-28 md:space-y-44">
          {SERVICES.map((s) => (
            <div key={s.n}>
              {/* reference-style header: large, centered, muted grey */}
              <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                <Reveal
                  as="p"
                  className="font-sans text-[11vw] font-bold leading-[1.02] tracking-tight text-paper/55 md:text-[3.6vw]"
                >
                  {s.title}
                </Reveal>
                <Reveal as="p" delay={0.05} className="mt-5 max-w-lg font-sans text-base leading-relaxed text-paper/45 md:text-lg">
                  {s.copy}
                </Reveal>
              </div>

              <ServiceRow images={s.images} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
