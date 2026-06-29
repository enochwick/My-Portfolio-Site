import { PERSON, SOCIALS, MADE_WITH } from './content'
import { Section } from './theme'
import { Reveal } from './Reveal'

export function FooterJM() {
  return (
    <Section theme="paper" className="relative">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-24 md:px-10 md:pt-32">
        <div className="grid grid-cols-2 gap-10 border-b border-ink/12 pb-14 md:flex md:justify-between">
          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">Built with</h3>
            <ul className="space-y-1.5">
              {MADE_WITH.map((m) => (
                <li key={m} className="font-sans text-sm text-ink/70">{m}</li>
              ))}
            </ul>
          </div>

          <div className="md:text-right">
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">Contact</h3>
            <ul className="space-y-1.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-ink/70 transition-colors hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`tel:${PERSON.phone.replace(/\s/g, '')}`}
                  className="font-sans text-sm text-ink/70 transition-colors hover:text-accent"
                >
                  {PERSON.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* giant name */}
        <Reveal className="py-10">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <span className="jm-display text-[16vw] leading-none md:text-[12vw]">{PERSON.first}</span>
            <span className="h-3 w-3 shrink-0 rounded-full bg-accent md:h-5 md:w-5" />
            <span className="jm-display text-[16vw] leading-none md:text-[12vw]">{PERSON.last}</span>
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-ink/45 md:flex-row md:text-left">
          <span>{PERSON.role} · 2026</span>
          <span>{PERSON.location}</span>
        </div>
      </div>
    </Section>
  )
}
