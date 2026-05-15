import { motion, MotionValue, useTransform } from 'framer-motion'

interface Service {
  number: string
  label: string
  name: string
  description: string
  tools: string[]
  image: string
}

interface SkillCardProps {
  service: Service
  index: number
  totalCards: number
  progress: MotionValue<number>
}

export default function SkillCard({ service, index, totalCards, progress }: SkillCardProps) {
  const rangeStart = index / totalCards
  const targetScale = 1 - (totalCards - 1 - index) * 0.03
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale])

  return (
    <div className="h-[90vh] flex items-start justify-center sticky top-4">
      <motion.div
        style={{
          scale,
          top: `${index * 20}px`,
          backgroundColor: '#0C0C0C',
        }}
        className="absolute w-full min-h-[85vh] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] overflow-hidden origin-top"
      >
        <div className="flex flex-col md:flex-row min-h-[85vh]">
          {/* Content */}
          <div className="flex flex-col gap-5 sm:gap-6 p-6 sm:p-8 md:p-10 md:w-[55%]">
            <div className="flex items-center gap-6 sm:gap-8 md:gap-10">
              <span
                className="text-[#D7E2EA] font-black leading-none shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-1.5">
                <span
                  className="text-[#D7E2EA]/40 uppercase tracking-widest"
                  style={{ fontFamily: 'Caveat, cursive', fontSize: '1rem' }}
                >
                  {service.label}
                </span>
                <h3
                  className="text-[#D7E2EA] font-black uppercase leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 2.4vw, 2.2rem)' }}
                >
                  {service.name}
                </h3>
              </div>
            </div>

            <p className="font-sans font-light text-[#D7E2EA]/50 leading-relaxed text-sm sm:text-base max-w-xl">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {service.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-[11px] uppercase tracking-wider text-[#D7E2EA]/40 border border-[#D7E2EA]/20 rounded-full px-3 py-1"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="hidden md:block md:w-[45%] relative">
            <img
              src={service.image}
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C]/40 to-transparent" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
