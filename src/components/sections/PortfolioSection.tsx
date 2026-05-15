import { motion } from 'framer-motion'
import FadeIn from '../ui/FadeIn'
import { projects } from '../../data'

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-[#EAEAEA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn>
        <p className="font-mono uppercase tracking-[0.2em] text-xs sm:text-sm text-accent mb-4">
          / Portfolio Projects
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex justify-between items-end mb-4">
          <h2 className="font-mono font-black uppercase text-dark text-4xl sm:text-5xl md:text-6xl">
            Selected <span className="text-accent">Work</span>
          </h2>
          <a
            href="#contact"
            className="hidden md:block font-sans font-medium text-sm text-[#6B6B6B] hover:text-accent transition-colors duration-150"
          >
            Work together →
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="font-sans font-light text-[#6B6B6B] text-lg mb-12">
          A carefully picked showcase of projects that highlight my commitment to craft.
        </p>
      </FadeIn>

      <div className="columns-1 md:columns-2 gap-6 md:gap-8 space-y-6 md:space-y-8">
        {projects.map((project, i) => (
          <FadeIn key={project.title} delay={i * 0.08}>
            <motion.div
              className="break-inside-avoid rounded-[20px] sm:rounded-[28px] border border-[rgba(12,12,12,0.06)] overflow-hidden bg-white cursor-pointer"
              whileHover={{
                borderColor: 'rgba(12,12,12,0.15)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="overflow-hidden bg-[#F5F5F5]" style={{ aspectRatio: project.featured ? '4/5' : '16/10' }}>
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-sans uppercase tracking-wider text-xs text-accent mb-2">{project.category}</p>
                <h3 className="font-mono font-bold text-dark text-lg sm:text-xl mb-2">{project.title}</h3>
                <p className="font-sans font-light text-[#6B6B6B] text-sm line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
