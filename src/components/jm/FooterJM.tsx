import { PERSON, SOCIALS, MADE_WITH } from './content'
import { Section } from './theme'
import { HeynokReveal } from './HeynokReveal'

export function FooterJM() {
  return (
    <Section theme="paper" className="relative overflow-hidden">
      {/* faded portrait bleeding off the right, sitting way back in the background */}
      <img
        src="/images/portrait2.png"
        alt=""
        aria-hidden="true"
        decoding="async"
        className="pointer-events-none absolute right-0 top-1/2 z-0 h-[58%] w-auto max-w-none -translate-y-1/2 select-none object-contain opacity-[0.24] md:h-[80%] md:opacity-[0.28]"
        style={{
          filter: 'grayscale(1) sepia(0.34) saturate(1.5) brightness(1.25) contrast(1.02)',
          WebkitMaskImage: 'linear-gradient(to left, #000 15%, transparent 80%)',
          maskImage: 'linear-gradient(to left, #000 15%, transparent 80%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1760px] px-5 pb-10 pt-24 md:px-12 md:pt-32">
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

        {/* giant name — plays the Hey 👋 → Heynok → Henok wordplay in view */}
        <HeynokReveal className="py-10" />

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-paper/45 md:flex-row md:text-left">
          <span>{PERSON.role} · 2026</span>
          <span>{PERSON.location}</span>
        </div>
      </div>
    </Section>
  )
}
