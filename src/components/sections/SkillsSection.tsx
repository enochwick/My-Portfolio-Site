import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import FadeIn from '../ui/FadeIn'
import SkillCard from '../ui/SkillCard'
import { services } from '../../data'

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="skills" className="bg-dark">
      {/* Section header */}
      <div className="px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-12">
        <FadeIn>
          <p className="font-mono uppercase tracking-[0.2em] text-xs sm:text-sm text-accent mb-4">
            / Services, Skills, Abilities
          </p>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h2 className="font-mono font-black text-white text-4xl sm:text-5xl md:text-6xl mb-4">
            What I do <span className="text-accent">best?</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="font-sans font-light text-white/40 text-lg max-w-2xl">
            I lead brands and products, creating design, 3D, web, and AI solutions that help
            businesses grow and make real impact.
          </p>
        </FadeIn>
      </div>

      {/* Stacking cards */}
      <div ref={containerRef} className="px-5 sm:px-8 md:px-10 pb-32">
        {services.map((s, i) => (
          <SkillCard
            key={s.number}
            service={s}
            index={i}
            totalCards={services.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
