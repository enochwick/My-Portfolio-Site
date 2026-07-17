import { NavThemeProvider } from './components/jm/theme'
import { SmoothScroll } from './components/jm/SmoothScroll'
import { IntroLoader } from './components/jm/IntroLoader'
import { Nav } from './components/jm/Nav'
import { Hero } from './components/jm/Hero'
import { Services } from './components/jm/Services'
import { WorkSection } from './components/jm/WorkSection'
import { Benefits } from './components/jm/Benefits'
import { ExperienceSection } from './components/jm/ExperienceSection'
import { BigCTA } from './components/jm/BigCTA'
import { FooterJM } from './components/jm/FooterJM'
import { TibebBand } from './components/ui/ethiopian'

export default function SiteJM() {
  return (
    <NavThemeProvider>
      <SmoothScroll />
      <IntroLoader />
      <div>
        <Nav />
        <main>
          <Hero />
          <Services />
          <TibebBand />
          <WorkSection />
          <TibebBand />
          <Benefits />
          <ExperienceSection />
          <TibebBand />
          <BigCTA />
          <FooterJM />
        </main>
      </div>
    </NavThemeProvider>
  )
}
