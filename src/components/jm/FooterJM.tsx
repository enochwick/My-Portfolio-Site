import { PERSON, SOCIALS, MADE_WITH } from './content'
import { Section } from './theme'
import { Reveal } from './Reveal'

export function FooterJM() {
  return (
    <Section theme="paper" className="relative">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-24 md:px-10 md:pt-32">
        <div className="grid grid-cols-2 gap-10 border-b border-paper/15 pb-14 md:flex md:justify-between">
          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/40">Built with</h3>
            <ul className="space-y-1.5">
              {MADE_WITH.map((m) => (
                <li key={m} className="font-sans text-sm text-paper/70">{m}</li>
              ))}
            </ul>
          </div>

          <div className="md:text-right">
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/40">Contact</h3>
            <ul className="space-y-1.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-paper/70 transition-colors hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* giant name */}
        <Reveal className="py-10">
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-8">
            <span className="jm-display text-[18vw] uppercase leading-[0.85] md:text-[12vw]">{PERSON.first}</span>
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent md:h-5 md:w-5" />
            <span className="jm-display text-[18vw] uppercase leading-[0.85] md:text-[12vw]">{PERSON.last}</span>
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-paper/45 md:flex-row md:text-left">
          <span>{PERSON.role} · 2026</span>
          <span>{PERSON.location}</span>
        </div>
      </div>
    </Section>
  )
}
