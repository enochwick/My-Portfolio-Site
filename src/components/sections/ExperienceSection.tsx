import FadeIn from '../ui/FadeIn'
import GhostButton from '../ui/GhostButton'
import { experience } from '../../data'

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-[#EAEAEA] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn>
        <p className="font-mono uppercase tracking-[0.2em] text-xs sm:text-sm text-accent mb-4">
          / Career
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex justify-between items-end mb-4">
          <h2 className="font-mono font-black uppercase text-dark text-4xl sm:text-5xl md:text-6xl">
            Work <span className="text-accent">Experience</span>
          </h2>
          <GhostButton href="/resume.pdf" external className="hidden md:flex">Download CV</GhostButton>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="font-sans font-light text-[#6B6B6B] text-lg mb-12">My impact over the years.</p>
      </FadeIn>

      <div className="max-w-4xl">
        {experience.map((job, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-[rgba(12,12,12,0.1)] py-6 sm:py-8 gap-2 sm:gap-0 group">
              <span className="font-mono font-medium text-sm sm:text-base text-[#999999] sm:min-w-[180px] shrink-0 group-hover:text-accent transition-colors duration-150">
                {job.years}
              </span>
              <div>
                <p className="font-mono font-bold text-dark text-xl sm:text-2xl md:text-3xl">{job.role}</p>
                <p className="font-sans font-light text-[#6B6B6B] mt-1">{job.company}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
