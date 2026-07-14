import { NavThemeProvider } from './components/jm/theme'
import { SmoothScroll } from './components/jm/SmoothScroll'
import { IntroLoader } from './components/jm/IntroLoader'
import { Nav } from './components/jm/Nav'
import { Hero } from './components/jm/Hero'
import { StatsBand } from './components/jm/StatsBand'
import { Services } from './components/jm/Services'
import { WorkSection } from './components/jm/WorkSection'
import { Benefits } from './components/jm/Benefits'
import { BigCTA } from './components/jm/BigCTA'
import { FooterJM } from './components/jm/FooterJM'

export default function SiteJM() {
  return (
    <NavThemeProvider>
      <SmoothScroll />
      <IntroLoader />
      <div>
        <Nav />
        <main>
          <Hero />
          <StatsBand />
          <Services />
          <WorkSection />
          <Benefits />
          <BigCTA />
          <FooterJM />
        </main>
      </div>
    </NavThemeProvider>
  )
}
