import { motion } from 'framer-motion'

const ACCENT = '#E8862D'

/**
 * Circular Ethiopian-inspired motif — concentric rings, radial mesob-style
 * ribs, a ring of diamonds, and an eight-pointed star at the center (a nod to
 * Axum cross geometry). Two layers counter-rotate slowly. Decorative only.
 */
export function EthioPattern({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      {/* outer layer — clockwise */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 110, ease: 'linear' }}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
          {/* dotted outer ring */}
          <circle cx="200" cy="200" r="194" stroke={ACCENT} strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="1 9" strokeLinecap="round" />
          {/* ring of diamonds */}
          {Array.from({ length: 24 }).map((_, i) => (
            <path
              key={i}
              d="M0 -8 L6 0 L0 8 L-6 0 Z"
              transform={`rotate(${i * 15} 200 200) translate(200 28)`}
              fill={ACCENT}
              fillOpacity={i % 2 ? 0.18 : 0.4}
            />
          ))}
          {/* double band */}
          <circle cx="200" cy="200" r="150" stroke={ACCENT} strokeOpacity="0.4" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="144" stroke={ACCENT} strokeOpacity="0.22" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* inner layer — counter-clockwise */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 75, ease: 'linear' }}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
          {/* radial mesob ribs */}
          {Array.from({ length: 48 }).map((_, i) => (
            <line
              key={i}
              x1="200"
              y1="62"
              x2="200"
              y2="94"
              transform={`rotate(${i * 7.5} 200 200)`}
              stroke={ACCENT}
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />
          ))}
          <circle cx="200" cy="200" r="100" stroke={ACCENT} strokeOpacity="0.35" strokeWidth="1.5" />
          {/* ring of crosses */}
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d="M-2.5 -9 L2.5 -9 L2.5 -2.5 L9 -2.5 L9 2.5 L2.5 2.5 L2.5 9 L-2.5 9 L-2.5 2.5 L-9 2.5 L-9 -2.5 L-2.5 -2.5 Z"
              transform={`rotate(${i * 30} 200 200) translate(200 128)`}
              fill={ACCENT}
              fillOpacity="0.35"
            />
          ))}
          <circle cx="200" cy="200" r="48" stroke={ACCENT} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 6" strokeLinecap="round" />
          {/* eight-pointed star center */}
          <rect x="178" y="178" width="44" height="44" stroke={ACCENT} strokeOpacity="0.45" strokeWidth="1.5" />
          <rect x="178" y="178" width="44" height="44" transform="rotate(45 200 200)" stroke={ACCENT} strokeOpacity="0.45" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="7" fill={ACCENT} fillOpacity="0.5" />
        </svg>
      </motion.div>
    </div>
  )
}
