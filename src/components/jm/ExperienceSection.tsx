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

function Period({ start, end }: { start: [string, string]; end: [string, string] }) {
  const col = ([m, y]: [string, string]) => (
    <span className="flex flex-col">
      <span className="mb-1 h-[13px] font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-accent">
        {m}
      </span>
      <span className="jm-display text-2xl font-bold leading-none text-paper/30 md:text-5xl">{y}</span>
    </span>
  )
  return (
    <span className="flex items-end gap-6 md:gap-10">
      {col(start)}
      {col(end)}
    </span>
  )
}

const DATA: TimelineEntry[] = [
  {
    title: <Period start={['Feb', '2024']} end={['', 'Now']} />,
    content: (
      <Role
        role="Sr. Creative Lead"
        company="Biovotec LLC & Total Ancillary"
        points={[
          'Lead creative, branding, and marketing execution across Total Ancillary and affiliated brands.',
          'Design product packaging, sales collateral, presentations, digital campaigns, videos, and 3D product visuals.',
          'Develop and manage company websites, landing pages, product pages, and digital experiences.',
          'Built a centralized sales-representative portal for collateral ordering, sales resources, and brand-kit requests.',
          'Developed AI-powered sales assistants and product knowledge tools to support training and product education.',
          'Created automated workflows connecting website forms, internal databases, CRM processes, and team notifications.',
          'Translated complex healthcare and product information into clear, visually engaging sales and educational content.',
          'Established practical AI and automation initiatives to improve marketing, onboarding, and internal workflows.',
          'Collaborate with leadership, sales, and operations to maintain brand consistency and support company growth.',
        ]}
      />
    ),
  },
  {
    title: <Period start={['Aug', '2021']} end={['Feb', '2024']} />,
    content: (
      <Role
        role="Marketing Communication Coordinator"
        company="CTL Amedica"
        points={[
          'Produced digital and print materials, including surgical technique guides, 3D product renderings, product AR, animations, booth designs, promotional videos, sterilization tray designs and product packaging designs.',
          'Managed social media and email marketing campaigns and paid/SMS ads for targeted outreach.',
          'Oversaw social media platforms, driving engagement and online presence.',
          'Oversaw and maintained the company website, ensuring the latest information, and leveraged Google Analytics to assess website performance and visitor insights.',
          'Developed and executed marketing strategies for medical products and events.',
          'Demonstrated proficiency in leveraging AI tools and platforms for past marketing and promotional activities, resulting in heightened brand visibility and increased engagement.',
          'Ensured the accuracy of final print materials through effective communication with printing vendors.',
          'Overseen and managed a content management platform for the sales team, overseeing its implementation from onboarding to continuous training.',
        ]}
      />
    ),
  },
  {
    title: <Period start={['Sep', '2020']} end={['Jul', '2021']} />,
    content: (
      <Role
        role="Graphic Designer and eCommerce Specialist"
        company="Eshi Utopia"
        points={[
          'Created and promoted healthcare marketing materials on social media.',
          'Developed and maintained a content calendar to schedule marketing initiatives.',
          'Utilized Google Analytics, Shopify, and social media analytics tools to monitor web traffic and user engagement.',
          'Managed all online store operations, including administrative tasks, order processing, inventory management, and marketing emails.',
        ]}
      />
    ),
  },
  {
    title: <Period start={['Jun', '2018']} end={['Oct', '2020']} />,
    content: (
      <Role
        role="Retail Marketer"
        company="Hudson Group"
        points={[
          'Overseen inventory management, financial transactions, and customer service operations.',
          'Maintained comprehensive records of sales data, expenditure, and employee performance evaluations.',
          'Monitored product inventory levels, optimized product displays, and ensured overall brand presentation.',
        ]}
      />
    ),
  },
  {
    title: <Period start={['Jan', '2018']} end={['Jun', '2018']} />,
    content: (
      <Role
        role="Direct Marketing Representative"
        company="Charity Advertising and Marketing Partners"
        points={[
          'Represented the organization at community events, meetings, and conferences to promote company goals, solicit donations, and seek sponsorships.',
          "Effectively communicated the organization's mission and vision to potential donors.",
          'Identify and target potential donors and sponsors through market research and analysis to maximize fundraising efforts.',
        ]}
      />
    ),
  },
  {
    title: <Period start={['Aug', '2012']} end={['Mar', '2016']} />,
    content: (
      <Role
        role="Graphic Designer and IT Support"
        company="Habesha Weekly Promotions"
        points={[
          'Produced engaging digital content for websites, social media platforms, and designed effective print materials for promotional campaigns.',
          'Installed and configured computer systems, providing comprehensive IT support for hardware and software troubleshooting.',
          'Developed and implemented an inclusive IT security strategy, providing training to ensure compliance and efficient resource utilization.',
        ]}
      />
    ),
  },
  {
    title: (
      <span className="jm-display text-2xl font-bold text-paper/30 md:text-5xl">Education</span>
    ),
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
