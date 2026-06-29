import { useEffect, useRef, useState } from 'react'

/**
 * Liquid follow-cursor. Any element carrying `data-cursor="Some label"` will
 * expand the cursor and show that label on hover (mirrors Juan Mora's
 * "Copy my Email" cursor). Hidden on touch / coarse pointers.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [active, setActive] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...mouse }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null
      if (el) {
        setLabel(el.getAttribute('data-cursor') || '')
        setActive(true)
      } else {
        setActive(false)
      }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)

    let raf = 0
    const loop = () => {
      pos.x += (mouse.x - pos.x) * 0.18
      pos.y += (mouse.y - pos.y) * 0.18
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={dot}
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:flex items-center justify-center rounded-full bg-ink text-paper transition-[width,height,padding] duration-300 ease-out"
      style={{
        width: active ? 'auto' : 14,
        height: active ? 36 : 14,
        paddingInline: active ? 18 : 0,
        mixBlendMode: active ? 'normal' : 'difference',
      }}
    >
      <span
        className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.15em] transition-opacity duration-200"
        style={{ opacity: active ? 1 : 0 }}
      >
        {label}
      </span>
    </div>
  )
}
