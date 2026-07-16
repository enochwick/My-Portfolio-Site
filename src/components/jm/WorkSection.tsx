import { PROJECTS } from './content'
import { Section } from './theme'
import { Reveal } from './Reveal'
import { StackingCards, type StackingCardData } from '../ui/stacking-card'

const CARDS: StackingCardData[] = PROJECTS.map((p) => ({
  title: p.title,
  eyebrow: p.category,
  description: p.description,
  image: p.image,
  color: p.color,
  href: '#contact',
}))

export function WorkSection() {
  return (
    <Section theme="dark" id="work" className="relative">
      <div className="mx-auto max-w-[1400px] px-5 pt-24 md:px-10 md:pt-32">
        <div className="flex flex-col items-center text-center">
          <Reveal className="font-sans text-lg text-paper/55">Curious?… Take a look at my</Reveal>
          <Reveal delay={0.05}>
            <h2 className="jm-display text-[26vw] leading-[0.8] tracking-tightest md:text-[18vw]">
              W<span className="text-accent">o</span>rk
            </h2>
          </Reveal>
        </div>
      </div>

      {/* projects stack as you scroll */}
      <StackingCards items={CARDS} className="pb-[10vh]" />
    </Section>
  )
}
