import { motion } from 'framer-motion'
import { PROJECTS } from './content'
import { Section } from './theme'
import { Reveal } from './Reveal'

const EASE = [0.625, 0.05, 0, 1] as const

export function WorkSection() {
  return (
    <Section theme="grey" id="work" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-8 flex flex-col items-center text-center">
          <Reveal className="font-sans text-lg text-ink/60">Curious?… Take a look at my</Reveal>
          <Reveal delay={0.05}>
            <h2 className="jm-display text-[26vw] leading-[0.8] tracking-tightest md:text-[18vw]">
              W<span className="text-accent">o</span>rk
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.title}
              href="#contact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.06 }}
              data-cursor="View"
              className="group relative block overflow-hidden rounded-3xl bg-paper"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={encodeURI(p.image)}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <span className="font-sans text-lg font-semibold tracking-tight">{p.title}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{p.category}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  )
}
