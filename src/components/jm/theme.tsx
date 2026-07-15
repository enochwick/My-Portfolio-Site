import { createContext, useContext, useEffect, useRef, useState } from 'react'

export type NavTheme = 'paper' | 'grey' | 'dark'

const NavThemeContext = createContext<{
  theme: NavTheme
  setTheme: (t: NavTheme) => void
}>({ theme: 'paper', setTheme: () => {} })

export function NavThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<NavTheme>('paper')
  return (
    <NavThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </NavThemeContext.Provider>
  )
}

export const useNavTheme = () => useContext(NavThemeContext)

/**
 * A full-bleed section that re-themes the floating nav when it crosses the
 * top of the viewport (mirrors Juan Mora's data-nav IntersectionObserver).
 */
export function Section({
  theme = 'paper',
  id,
  className = '',
  children,
}: {
  theme?: NavTheme
  id?: string
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const { setTheme } = useNavTheme()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setTheme(theme)
        })
      },
      { rootMargin: '-10% 0px -88% 0px', threshold: 0 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [theme, setTheme])

  return (
    <section
      ref={ref}
      id={id}
      data-nav={theme}
      className={className}
      // transparent so the site-wide dark gradient (on <body>) shows through
      style={{ backgroundColor: 'transparent', color: '#F3EDE6' }}
    >
      {children}
    </section>
  )
}
