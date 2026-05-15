import { type ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  external?: boolean
}

export default function GhostButton({ href, external, children, className = '', ...props }: Props) {
  const base =
    'inline-flex items-center justify-center rounded-full border border-[rgba(12,12,12,0.15)] bg-transparent text-[#0C0C0C] font-mono font-medium uppercase tracking-wider text-sm px-8 py-3 sm:px-10 sm:py-3.5 transition-all duration-200 hover:bg-surface hover:border-[rgba(12,12,12,0.3)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(12,12,12,0.2)]'

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`${base} ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  )
}
