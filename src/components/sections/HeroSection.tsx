import { useCallback, useEffect, useState, forwardRef, useRef } from 'react'
import { motion, MotionValue, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { Menu } from 'lucide-react'
import Magnet from '../ui/Magnet'
import MobileNav from '../ui/MobileNav'

function Letter({
  char,
  mouseX,
  containerRef,
  onMount,
}: {
  char: string
  mouseX: MotionValue<number>
  containerRef: React.RefObject<HTMLDivElement | null>
  onMount?: (el: HTMLSpanElement) => void
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current && onMount) onMount(ref.current)
  }, [onMount])

  const raw = useTransform(mouseX, (mx) => {
    if (mx === Infinity) return 1
    const el = ref.current
    const ct = containerRef.current
    if (!el || !ct) return 1
    const elRect = el.getBoundingClientRect()
    const ctRect = ct.getBoundingClientRect()
    const center = elRect.left - ctRect.left + elRect.width / 2
    const dist = Math.abs(mx - center)
    return 1 - 0.55 * Math.max(0, 1 - dist / 180)
  })

  const scaleX = useSpring(raw, { stiffness: 380, damping: 26 })

  return (
    <motion.span ref={ref} style={{ scaleX, display: 'inline-block', transformOrigin: 'center' }}>
      {char}
    </motion.span>
  )
}

function LetterCompress({
  text,
  className,
  style,
  align = 'left',
  onLetterMount,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
  align?: 'left' | 'right'
  onLetterMount?: Record<number, (el: HTMLSpanElement) => void>
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(Infinity)

  return (
    <div
      ref={containerRef}
      className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'} ${className ?? ''}`}
      style={style}
      onMouseMove={(e) => {
        const rect = containerRef.current!.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {text.split('').map((char, i) => (
        <Letter
          key={i}
          char={char}
          mouseX={mouseX}
          containerRef={containerRef}
          onMount={onLetterMount?.[i]}
        />
      ))}
    </div>
  )
}

function ElegantShape({
  className = '',
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]',
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 2.4, delay, ease: [0.23, 0.86, 0.39, 0.96], opacity: { duration: 1.2 } }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={[
            'absolute inset-0 rounded-full',
            'bg-gradient-to-r to-transparent',
            gradient,
            'backdrop-blur-[2px] border-2 border-white/[0.12]',
            'shadow-[0_8px_32px_0_rgba(255,255,255,0.06)]',
            'after:absolute after:inset-0 after:rounded-full',
            'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]',
          ].join(' ')}
        />
      </motion.div>
    </motion.div>
  )
}

type OPos = { left: number; top: number; width: number; height: number; fontSize: number }

export default forwardRef<HTMLElement>(function HeroSection(_, ref) {
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function updateClock() {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Chicago',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      setTime(t)
    }
    updateClock()
    const id = setInterval(updateClock, 1000)
    return () => clearInterval(id)
  }, [])

  const nameSize = 'clamp(60px, 9.5vw, 152px)'

  // ── Scroll driver ─────────────────────────────────────────────────────────
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] })

  // ── Capture the real "O" element from HENOK ───────────────────────────────
  const oPosRef = useRef<OPos | null>(null)
  const [oPos, setOPos] = useState<OPos | null>(null)

  const captureO = useCallback((el: HTMLSpanElement) => {
    setTimeout(() => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const fontSize = parseFloat(window.getComputedStyle(el).fontSize)
      const pos: OPos = { left: r.left, top: r.top, width: r.width, height: r.height, fontSize }
      oPosRef.current = pos
      setOPos(pos)
    }, 950)
  }, [])

  // ── Dark iris: appears instantly, covers screen, then fades to reveal section below ─
  // Opacity: jumps to 1 at scroll start, holds, then fades out at the end
  const oOpacity = useTransform(scrollYProgress, [0, 0.04, 0.85, 1.0], [0, 1, 1, 0])

  // Scale: grows from O size → covers every corner, using actual O center position
  const oScale = useTransform(scrollYProgress, (p) => {
    const pos = oPosRef.current
    if (!pos || p < 0.04) return 1
    const oCenterX = pos.left + pos.width / 2
    const oCenterY = pos.top + pos.height / 2
    const maxDist = Math.max(
      Math.hypot(oCenterX, oCenterY),
      Math.hypot(window.innerWidth - oCenterX, oCenterY),
      Math.hypot(oCenterX, window.innerHeight - oCenterY),
      Math.hypot(window.innerWidth - oCenterX, window.innerHeight - oCenterY),
    )
    const target = (maxDist * 2.1) / pos.width
    return 1 + (target - 1) * Math.min(1, (p - 0.04) / 0.81)
  })

  return (
    <section id="top" ref={ref} className="bg-dark">
      <div ref={scrollRef} style={{ height: '250vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

          {/* ── Iris wipe: dark circle expands from the O position, covers hero, then reveals next section ── */}
          {oPos && (
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
              <motion.div
                style={{
                  position: 'absolute',
                  left: oPos.left,
                  top: oPos.top + (oPos.height - oPos.width) / 2,
                  width: oPos.width,
                  height: oPos.width,
                  borderRadius: '50%',
                  backgroundColor: '#0C0C0C',
                  opacity: oOpacity,
                  scale: oScale,
                  transformOrigin: 'center',
                }}
              />
            </div>
          )}

          <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

          {/* Hero content — O zoom overlay covers it during scroll */}
          <div className="absolute inset-0 flex flex-col">

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <ElegantShape
                delay={0.3}
                width={600}
                height={140}
                rotate={12}
                gradient="from-accent/[0.12]"
                className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
              />
              <ElegantShape
                delay={0.5}
                width={500}
                height={120}
                rotate={-15}
                gradient="from-white/[0.05]"
                className="right-[-5%] md:right-[0%] top-[60%] md:top-[65%]"
              />
              <ElegantShape
                delay={0.4}
                width={300}
                height={80}
                rotate={-8}
                gradient="from-accent/[0.08]"
                className="left-[5%] md:left-[10%] bottom-[8%] md:bottom-[12%]"
              />
              <ElegantShape
                delay={0.6}
                width={220}
                height={60}
                rotate={20}
                gradient="from-white/[0.07]"
                className="right-[15%] md:right-[22%] top-[8%] md:top-[12%]"
              />
              <ElegantShape
                delay={0.7}
                width={160}
                height={45}
                rotate={-25}
                gradient="from-accent/[0.1]"
                className="left-[18%] md:left-[24%] top-[4%] md:top-[8%]"
              />
            </div>

            {/* Subtle edge vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/40 pointer-events-none" />

            {/* Mobile menu button */}
            <div className="md:hidden absolute top-6 right-6 z-10">
              <button
                onClick={() => setMenuOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={18} className="text-white" />
              </button>
            </div>

            {/* ── Desktop 3-column hero ── */}
            <div className="hidden md:flex flex-1 items-stretch px-10 lg:px-16 pb-20 relative z-10">

              {/* Left column: badge + HENOK */}
              <div className="flex flex-col justify-between flex-1 pt-10">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <span className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-xs text-accent uppercase tracking-wider">Available</span>
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <LetterCompress
                    text="HENOK"
                    className="font-mono font-black text-white leading-[0.85] tracking-tight select-none"
                    style={{ fontSize: nameSize }}
                    onLetterMount={{ 3: captureO }}
                  />
                </motion.div>

                <div />
              </div>

              {/* Center: portrait card */}
              <div className="flex items-center justify-center px-6 lg:px-10 z-10">
                <Magnet padding={60} strength={4}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: -3 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="rounded-[28px] overflow-hidden bg-white"
                    style={{
                      width: 'clamp(200px, 18vw, 320px)',
                      aspectRatio: '3/4',
                      boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.6)',
                    }}
                  >
                    <img
                      src="/images/portrait.png"
                      alt="Henok Tadesse"
                      className="w-full h-full object-cover object-top"
                    />
                  </motion.div>
                </Magnet>
              </div>

              {/* Right column: TADESSE + role + time */}
              <div className="flex flex-col justify-between flex-1 min-w-0 items-end pt-10">
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="font-sans text-sm text-white/50"
                >
                  Designer &amp; Founder
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <LetterCompress
                    text="TADESSE"
                    align="right"
                    className="font-mono font-black text-white leading-[0.85] tracking-tight select-none"
                    style={{ fontSize: nameSize }}
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-sans font-light text-sm text-white/40 uppercase tracking-widest text-right"
                >
                  Flower Mound, TX, {time} CST
                </motion.p>
              </div>
            </div>

            {/* ── Mobile hero ── */}
            <div className="md:hidden flex flex-col flex-1 px-6 pt-16 pb-32 relative z-10">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono uppercase tracking-[0.25em] text-xs text-accent mb-4"
              >
                Creative Director + AI Builder
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-mono font-black text-white leading-[0.85] tracking-tight mb-2"
                style={{ fontSize: 'clamp(60px, 18vw, 100px)' }}
              >
                HENOK
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-mono font-black text-white leading-[0.85] tracking-tight mb-6"
                style={{ fontSize: 'clamp(60px, 18vw, 100px)' }}
              >
                TADESSE
              </motion.h1>

              <div className="flex-1 flex items-center justify-center">
                <div
                  className="rounded-[24px] overflow-hidden bg-white"
                  style={{
                    width: '60vw',
                    aspectRatio: '3/4',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.6)',
                    transform: 'rotate(-3deg)',
                  }}
                >
                  <img src="/images/portrait.png" alt="Henok Tadesse" className="w-full h-full object-cover object-top" />
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-sans font-light text-sm text-white/40 uppercase tracking-wider mt-6"
              >
                Flower Mound, TX, {time} CST
              </motion.p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
})
