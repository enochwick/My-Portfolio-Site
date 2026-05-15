import { motion } from 'framer-motion'

const stats = [
  '7+ Years of Experience',
  '50+ Successful Projects',
  'Healthcare × Tech × Ecommerce',
  'AI-Forward Creative',
  'DFW Based',
  'React + Tailwind + Supabase',
  'Adobe Creative Suite',
  'KeyShot 3D',
]

export default function StatsMarquee() {
  const items = [...stats, ...stats]

  return (
    <motion.div
      className="bg-dark py-5 sm:py-6 overflow-hidden"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true }}
    >
      <div className="marquee-track">
        {items.map((stat, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-mono font-medium uppercase tracking-widest text-sm sm:text-base text-white whitespace-nowrap px-6">
              {stat}
            </span>
            <span className="text-[#4a4a4a] text-sm select-none">/</span>
          </span>
        ))}
      </div>
    </motion.div>
  )
}
