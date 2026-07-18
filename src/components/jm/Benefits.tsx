import { motion } from 'framer-motion'
import { BENEFITS, BIO } from './content'
import { Section } from './theme'
import { Reveal, WordReveal } from './Reveal'
import { SpinningCross } from '../ui/ethiopian'

const EASE = [0.625, 0.05, 0, 1] as const

export function Benefits() {
  return (
    <Section theme="paper" id="about" className="relative overflow-hidden">
      <SpinningCross className="-right-24 top-10 text-accent/10" size={360} />
      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        {/* big stacked statement */}
        <div className="relative mb-20 md:mb-28">
          <h2 className="jm-display text-[12vw] leading-[0.92] md:text-[7vw]">
            <WordReveal text={'Good design'} />
            <span className="block text-paper/40">
              <WordReveal text={'takes time'} delay={0.1} />
            </span>
          </h2>
          <Reveal
            delay={0.15}
            className="mt-4 max-w-xl font-sans text-xl text-paper/70 md:absolute md:bottom-1 md:right-0 md:mt-0 md:text-2xl"
          >
            …and working with me saves it.
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          {/* portrait + real bio */}
          <div>
            <Reveal>
              <div className="relative mx-auto w-full max-w-[460px]">
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-[12%] top-[8%] -z-10 blur-[70px]"
                  style={{ background: 'radial-gradient(closest-side, rgba(232,134,45,0.2), transparent)' }}
                />
                <img
                  src="/images/portrait.webp"
                  alt="Henok Tadesse"
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full select-none object-contain"
                  style={{
                    filter: 'grayscale(1) sepia(0.32) saturate(1.35) brightness(1.02) contrast(1.03)',
                    WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 82%)',
                    maskImage: 'linear-gradient(to bottom, #000 55%, transparent 82%)',
                  }}
                />
              </div>
            </Reveal>
            <Reveal delay={0.05} as="p" className="mt-6 font-sans text-lg leading-relaxed text-paper/85">
              {BIO.lead}
            </Reveal>
            <Reveal delay={0.1} as="p" className="mt-3 font-sans text-base leading-relaxed text-paper/50">
              {BIO.body}
            </Reveal>
          </div>

          {/* benefits list */}
          <div className="flex flex-col justify-center">
            <h3 className="jm-display mb-10 text-3xl leading-tight md:text-4xl">
              Companies partner with me for my{' '}
              <span className="text-accent">perspective + sharp instincts.</span>
            </h3>
            <ul className="space-y-5">
              {BENEFITS.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                  className="flex items-start gap-4 border-t border-paper/15 pt-5"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] text-paper">
                    ✓
                  </span>
                  <span className="font-sans text-lg leading-snug text-paper/80">{b}</span>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              className="group mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:bg-accent hover:text-paper"
            >
              Learn more about me
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
