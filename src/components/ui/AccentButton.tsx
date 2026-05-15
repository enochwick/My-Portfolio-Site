import { type ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  external?: boolean
}

export default function AccentButton({ href, external, children, className = '', ...props }: Props) {
  const base =
    'inline-flex items-center justify-center rounded-full bg-accent text-white font-mono font-bold uppercase tracking-widest text-xs sm:text-sm px-8 py-3 sm:px-10 sm:py-3.5 transition-transform duration-200 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50'

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
