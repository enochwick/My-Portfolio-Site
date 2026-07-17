import { useEffect, useState } from 'react'

/** Reactive matchMedia hook — true when the viewport matches `query`. */
export function useIsMobile(query = '(max-width: 767px)') {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
