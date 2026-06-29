import { useState } from 'react'
import { PERSON, CTA } from './content'
import { Section } from './theme'
import { Reveal, WordReveal } from './Reveal'

export function BigCTA() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard?.writeText(PERSON.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Section theme="dark" id="contact" className="relative">
      <div className="mx-auto flex min-h-[80vh] max-w-[1400px] flex-col justify-center px-5 py-28 md:px-10">
        <h2 className="jm-display max-w-5xl text-[11vw] leading-[0.95] md:text-[6.2vw]">
          <WordReveal text={CTA.headline.split('\n')[0]} />
          <span className="block text-accent">
            <WordReveal text={CTA.headline.split('\n')[1]} delay={0.12} />
          </span>
        </h2>

        <Reveal delay={0.1} className="mt-6 max-w-xl font-sans text-lg text-paper/60 md:text-xl">
          {CTA.sub}
        </Reveal>

        <Reveal delay={0.2} className="mt-14">
          <button
            onClick={copy}
            data-cursor={copied ? 'Copied!' : 'Copy my email'}
            className="group inline-flex flex-col items-start gap-2 text-left"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
              {copied ? 'Great — email copied' : "Let's talk"}
            </span>
            <span className="jm-display text-4xl text-paper transition-colors duration-300 group-hover:text-accent sm:text-5xl md:text-6xl">
              {PERSON.email}
            </span>
          </button>
        </Reveal>
      </div>
    </Section>
  )
}
