import { motion } from 'framer-motion'
import { TOOLBOX } from './content'
import { Section } from './theme'
import { Reveal, WordReveal } from './Reveal'

const EASE = [0.625, 0.05, 0, 1] as const

export function Toolbox() {
  return (
    <Section theme="dark" id="toolbox" className="relative">
      <div className="mx-auto max-w-[1760px] px-5 py-24 md:px-12 md:py-32">
        <Reveal className="mb-5 inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Toolbox
        </Reveal>
        <h2 className="jm-display mb-16 max-w-3xl text-[9vw] leading-[0.95] text-paper md:mb-24 md:text-[4vw]">
          <WordReveal text={'The stack I build with'} />
        </h2>

        <div className="space-y-10 md:space-y-14">
          {TOOLBOX.map((cat, i) => (
            <div
              key={cat.label}
              className="grid gap-5 border-t border-paper/12 pt-8 md:grid-cols-[240px_1fr] md:gap-10"
            >
              <Reveal className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                <span className="mr-2 text-paper/30">0{i + 1}</span>
                {cat.label}
              </Reveal>
              <div className="flex flex-wrap gap-2.5">
                {cat.tools.map((tool, j) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.5, ease: EASE, delay: j * 0.04 }}
                    className="rounded-full border border-paper/15 px-4 py-2 font-sans text-sm text-paper/75 transition-colors hover:border-accent hover:text-accent md:text-[15px]"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
