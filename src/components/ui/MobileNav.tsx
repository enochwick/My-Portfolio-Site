import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const links = [
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function MobileNav({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-white/[0.98] backdrop-blur-xl flex flex-col items-center justify-center"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(12,12,12,0.15)] hover:bg-surface transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>

          <nav className="flex flex-col items-center gap-8">
            {links.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                onClick={onClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="font-serif italic text-4xl text-dark hover:text-accent transition-colors duration-150"
              >
                {label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
