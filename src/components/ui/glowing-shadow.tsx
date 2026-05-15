import { type ReactNode } from "react"

interface GlowingShadowProps {
  children: ReactNode
  className?: string
}

export function GlowingShadow({ children, className = "" }: GlowingShadowProps) {
  return (
    <div className={`glow-container ${className}`}>
      <div className="glow-content">{children}</div>
    </div>
  )
}
