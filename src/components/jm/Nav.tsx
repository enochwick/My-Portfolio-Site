import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PERSON, SOCIALS } from './content'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.625, 0.05, 0, 1], delay: 1.1 }}
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

          {/* desktop links */}
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

          {/* desktop socials */}
          <ol className="hidden items-center gap-4 md:flex">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.15em] opacity-70 transition-opacity hover:opacity-100"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>

          {/* mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex flex-col items-end gap-1.5 md:hidden"
          >
            <span className="block h-[2px] w-6 bg-current" />
            <span className="block h-[2px] w-6 bg-current" />
            <span className="block h-[2px] w-4 bg-current" />
          </button>
        </div>
      </motion.header>

      {/* mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex flex-col bg-[#0c0b0a] px-6 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-sans text-base font-semibold text-paper">
                {PERSON.first}
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {PERSON.last}
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="relative h-8 w-8 text-paper"
              >
                <span className="absolute left-1/2 top-1/2 block h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-1/2 top-1/2 block h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
              </button>
            </div>

            <nav className="mt-16 flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, ease: [0.625, 0.05, 0, 1] }}
                  className="jm-display text-[16vw] leading-tight text-paper"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 border-t border-paper/15 pt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.15em] text-paper/70"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
