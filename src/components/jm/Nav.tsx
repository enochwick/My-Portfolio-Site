import { motion } from 'framer-motion'
import { PERSON, SOCIALS } from './content'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.625, 0.05, 0, 1], delay: 2.1 }}
      className="fixed inset-x-0 top-0 z-[120] mix-blend-difference"
      style={{ color: '#F3EDE6' }}
    >
      {/* mix-blend-difference keeps the nav legible over any section color */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-2 font-sans text-base font-semibold tracking-tight">
          <span>{PERSON.first}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>{PERSON.last}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.18em] opacity-70 transition-opacity hover:opacity-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <ol className="flex items-center gap-4">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.15em] opacity-70 transition-opacity hover:opacity-100"
              >
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.short}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </motion.header>
  )
}
