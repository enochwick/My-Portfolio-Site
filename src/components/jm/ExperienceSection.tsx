import { Section } from './theme'
import { Timeline, type TimelineEntry } from '../ui/timeline'

const RESUME_PDF = '/Henok-Tadesse-Resume.pdf'

function Role({ role, company, points }: { role: string; company: string; points: string[] }) {
  return (
    <div>
      <h4 className="font-sans text-xl font-semibold tracking-tight text-paper md:text-2xl">{role}</h4>
      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{company}</p>
      <ul className="mt-5 space-y-2.5">
        {points.map((p, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-paper/70 md:text-[15px]">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}

const DATA: TimelineEntry[] = [
  {
    title: '2021 — Now',
    content: (
      <Role
        role="Marketing Communications Coordinator"
        company="CTL Amedica"
        points={[
          'Produced surgical technique guides, 3D product renderings, product AR, animations, booth designs, promo videos, and sterilization-tray & packaging designs.',
          'Ran social, email, and paid/SMS campaigns — driving engagement and online presence.',
          'Maintained the company website and used Google Analytics to assess performance and visitor insights.',
          'Leveraged AI tools across marketing to lift brand visibility and engagement.',
        ]}
      />
    ),
  },
  {
    title: '2020 — 2021',
    content: (
      <Role
        role="Graphic Designer & eCommerce Specialist"
        company="Eshi Utopia"
        points={[
          'Created healthcare and brand marketing for social media and built a content calendar.',
          'Ran all Shopify store operations — orders, inventory, and email marketing.',
          'Tracked traffic and engagement with Google Analytics and social analytics tools.',
        ]}
      />
    ),
  },
  {
    title: '2018 — 2020',
    content: (
      <Role
        role="Retail Supervisor"
        company="Hudson Group"
        points={[
          'Oversaw inventory, transactions, and customer-service operations; kept detailed sales records.',
          'Optimized product displays and overall brand presentation.',
        ]}
      />
    ),
  },
  {
    title: '2018',
    content: (
      <Role
        role="Direct Marketing Representative"
        company="Charity Advertising & Marketing Partners"
        points={[
          'Represented the organization at events to promote goals, solicit donations, and seek sponsorships.',
          'Identified and targeted potential donors through market research and analysis.',
        ]}
      />
    ),
  },
  {
    title: '2012 — 2016',
    content: (
      <Role
        role="Graphic Designer & IT Support"
        company="Habesha Weekly Promotions"
        points={[
          'Produced engaging digital content and effective print for promotional campaigns.',
          'Installed and configured systems, providing IT support and security training.',
        ]}
      />
    ),
  },
  {
    title: 'Education',
    content: (
      <ul className="space-y-6">
        {[
          ['UI Design', 'California Institute of the Arts'],
          ['Digital Marketing Certificate', 'University of Illinois at Urbana-Champaign'],
          ['B.Sc. Computer Science', 'Addis Ababa University'],
        ].map(([degree, place]) => (
          <li key={degree}>
            <p className="font-sans text-lg font-semibold text-paper md:text-xl">{degree}</p>
            <p className="mt-0.5 font-sans text-sm text-paper/55">{place}</p>
          </li>
        ))}
      </ul>
    ),
  },
]

export function ExperienceSection() {
  return (
    <Section theme="dark" id="experience" className="relative">
      <Timeline
        heading={'The journey\nso far'}
        intro="7+ years across healthcare, ecommerce, and tech — crafting surgical guides, 3D renders, brand systems, and AI tools."
        data={DATA}
      />
      {/* download résumé */}
      <div className="mx-auto -mt-6 max-w-7xl px-4 pb-24 md:px-16 lg:px-20">
        <a
          href={RESUME_PDF}
          download
          className="group inline-flex items-center gap-3 rounded-full bg-paper px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:bg-accent hover:text-paper"
        >
          Download résumé (PDF)
          <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
        </a>
      </div>
    </Section>
  )
}
