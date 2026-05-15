import { useRef } from 'react'
import HeroSection from './components/sections/HeroSection'
import StatsMarquee from './components/sections/StatsMarquee'
import SkillsSection from './components/sections/SkillsSection'
import AboutSection from './components/sections/AboutSection'
import PortfolioSection from './components/sections/PortfolioSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/sections/Footer'
import FloatingNav from './components/ui/FloatingNav'

export default function App() {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <main className="overflow-x-clip">
      <HeroSection ref={heroRef} />
      <StatsMarquee />
      <SkillsSection />
      <AboutSection />
      <PortfolioSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <FloatingNav heroRef={heroRef} />
    </main>
  )
}
