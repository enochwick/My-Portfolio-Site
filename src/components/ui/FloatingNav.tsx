import { motion, AnimatePresence } from 'framer-motion'
import { Home } from 'lucide-react'
import { useState, useEffect } from 'react'

const links = [
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Exp', href: '#experience' },
]

interface Props {
  heroRef: React.RefObject<HTMLElement | null>
}

export default function FloatingNav({ heroRef }: Props) {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [heroRef])

  useEffect(() => {
    const sections = ['skills', 'about', 'portfolio', 'experience', 'contact']
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-1 bg-dark rounded-full px-3 py-2 shadow-xl shadow-black/20">
            <a
              href="#top"
              className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-150"
              aria-label="Home"
            >
              <Home size={16} />
            </a>

            <div className="hidden sm:flex items-center">
              {links.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className={`font-sans font-medium text-sm px-4 py-2 rounded-full transition-colors duration-150 ${
                    active === href
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="rounded-full bg-accent text-white font-sans font-semibold text-sm px-5 py-2.5 hover:bg-accent-hover active:scale-[0.97] transition-all duration-150 ml-1"
            >
              Contact me
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
