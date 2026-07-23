import { useState, type FormEvent } from 'react'
import { Mail } from 'lucide-react'
import { LinkedInIcon, YouTubeIcon } from '../ui/SocialIcons'
import FadeIn from '../ui/FadeIn'
import AccentButton from '../ui/AccentButton'

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', email: '', status: '', message: '' })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-white border border-[rgba(12,12,12,0.1)] rounded-xl px-4 py-3 font-sans text-dark placeholder:text-[#999999] focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/15 transition-all duration-150'

  return (
    <section id="contact" className="bg-[#EAEAEA] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn>
        <p className="font-mono uppercase tracking-[0.2em] text-xs sm:text-sm text-accent mb-4">
          / Contact Information
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <h2 className="font-mono font-black text-dark text-4xl sm:text-5xl md:text-6xl mb-4">
          Let's get <span className="text-accent">started</span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="font-sans font-light text-[#6B6B6B] text-lg mb-12">
          I would love to hear more about your project or company.
        </p>
      </FadeIn>

      <div className="flex flex-col md:flex-row gap-12 md:gap-16">
        {/* Left */}
        <FadeIn delay={0.1} className="md:w-2/5">
          <p className="font-sans text-[#6B6B6B] leading-relaxed mb-8">
            If the work above fits what you need, send me a note. Share the goal, a link, budget range, and when you want to start. I'll reply with the next step.
          </p>
          <a
            href="mailto:hello@heynok.com"
            className="font-mono text-dark text-lg hover:text-accent transition-colors duration-150 block mb-2"
          >
            hello@heynok.com
          </a>
          <p className="font-sans text-[#999999] mb-6">Flower Mound, TX</p>
          <div className="flex gap-4">
            {[
              { icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: YouTubeIcon, href: 'https://youtube.com', label: 'YouTube' },
              { icon: Mail, href: 'mailto:hello@heynok.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-[#999999] hover:text-accent transition-colors duration-150"
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </FadeIn>

        {/* Right — form */}
        <FadeIn delay={0.15} className="md:w-3/5">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center bg-white rounded-[24px] p-8">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Mail size={20} className="text-accent" />
              </div>
              <h3 className="font-mono font-bold text-dark text-xl mb-2">Message received!</h3>
              <p className="font-sans text-[#6B6B6B]">I'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className={inputClass}
                type="text"
                placeholder="Your Full Name *"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className={inputClass}
                type="text"
                placeholder="Your Role *"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <input
                className={inputClass}
                type="email"
                placeholder="Your Email *"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <select
                className={inputClass}
                required
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="" disabled>Your Status *</option>
                <option value="project">I have a project</option>
                <option value="recruiter">I am a recruiter</option>
                <option value="hi">Just saying hi</option>
              </select>
              <textarea
                className={`${inputClass} resize-none`}
                rows={5}
                placeholder="More info *"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <AccentButton type="submit" className="w-full">Submit</AccentButton>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  )
}
