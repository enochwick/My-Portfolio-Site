import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// Ge'ez / Amharic fidäl (ፊደል) — a broad spread of syllables for the matrix.
const FIDEL =
  'ሀሁሂሃሄህሆለሉሊላሌልሎሐሑሒሓሔሕሖመሙሚማሜምሞሠሡሢሣሤሥሦረሩሪራሬርሮሰሱሲሳሴስሶሸሹሺሻሼሽሾቀቁቂቃቄቅቆቈበቡቢባቤብቦተቱቲታቴትቶቸቹቺቻቼችቾኀኁኂኃኄኅኆነኑኒናኔንኖኘኙኚኛኜኝኞአኡኢኣኤእኦከኩኪካኬክኮኰኸኹኺኻኼኽኾወዉዊዋዌውዎዐዑዒዓዔዕዖዘዙዚዛዜዝዞዠዡዢዣዤዥዦየዩዪያዬይዮደዱዲዳዴድዶዸዹዺዻዼዽዾጀጁጂጃጄጅጆገጉጊጋጌግጎጐጠጡጢጣጤጥጦጨጩጪጫጬጭጮጰጱጲጳጴጵጶጸጹጺጻጼጽጾፀፁፂፃፄፅፆፈፉፊፋፌፍፎፐፑፒፓፔፕፖ'

/**
 * Interactive Amharic-character grid. Letters near the cursor glow amber.
 * Click a tile to glitch it to a new random fidäl.
 *
 * Perf notes: tile positions are derived from grid math (one container rect
 * read per frame, not one per tile), updates are rAF-throttled, and the whole
 * effect pauses when scrolled out of view.
 */
export function AmharicMatrix({ className, auto = false }: { className?: string; auto?: boolean }) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // On phones the grid is touch-driven (glow follows a finger, tap glitches a
    // tile). Use larger tiles there so the live-tile count stays well under the
    // ~100 that OOM-crashed iOS Safari alongside the big hero blurs.
    const isPhone = window.matchMedia('(max-width: 767px)').matches

    const pick = () => FIDEL[Math.floor(Math.random() * FIDEL.length)]
    let columns = 0
    let rows = 0

    const buildGrid = () => {
      const size = isPhone ? 76 : 56
      const w = grid.clientWidth || window.innerWidth
      const h = grid.clientHeight || window.innerHeight
      columns = Math.max(1, Math.floor(w / size))
      rows = Math.max(1, Math.floor(h / size))
      grid.style.setProperty('--columns', String(columns))
      grid.style.setProperty('--rows', String(rows))

      const frag = document.createDocumentFragment()
      for (let i = 0; i < columns * rows; i++) {
        const tile = document.createElement('div')
        tile.className = 'am-tile'
        tile.textContent = pick()
        tile.addEventListener('click', () => {
          tile.textContent = pick()
          tile.classList.add('am-glitch')
          setTimeout(() => tile.classList.remove('am-glitch'), 220)
        })
        frag.appendChild(tile)
      }
      grid.replaceChildren(frag)
    }

    let visible = true
    let mx = -9999
    let my = -9999
    let raf = 0
    let queued = false

    const apply = () => {
      queued = false
      if (!visible) return
      const rect = grid.getBoundingClientRect()
      const tileW = rect.width / columns
      const tileH = rect.height / rows
      const localX = mx - rect.left
      const localY = my - rect.top
      const radius = Math.min(rect.width, window.innerWidth) / 6.5
      const tiles = grid.children
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const tile = tiles[r * columns + c] as HTMLElement | undefined
          if (!tile) continue
          const dx = localX - (c + 0.5) * tileW
          const dy = localY - (r + 0.5) * tileH
          const dist = Math.sqrt(dx * dx + dy * dy)
          const intensity = Math.max(0, 1 - dist / radius)
          tile.style.setProperty('--intensity', intensity.toFixed(3))
        }
      }
    }

    const queue = () => {
      if (!queued) {
        queued = true
        raf = requestAnimationFrame(apply)
      }
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      queue()
    }

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      mx = t.clientX
      my = t.clientY
      queue()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(grid)

    buildGrid()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('resize', buildGrid)

    // Auto mode: gently flicker a few random tiles to new fidäl so the grid
    // animates on its own (used behind the intro loader, where there's no
    // pointer to drive the glow).
    let flicker = 0
    if (auto) {
      flicker = window.setInterval(() => {
        if (!visible) return
        const tiles = grid.children
        const n = tiles.length
        if (!n) return
        for (let k = 0; k < 3; k++) {
          const tile = tiles[Math.floor(Math.random() * n)] as HTMLElement | undefined
          if (!tile) continue
          tile.textContent = pick()
          tile.classList.add('am-glitch')
          setTimeout(() => tile.classList.remove('am-glitch'), 220)
        }
      }, 140)
    }

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('resize', buildGrid)
      io.disconnect()
      cancelAnimationFrame(raf)
      if (flicker) clearInterval(flicker)
    }
  }, [auto])

  return <div ref={gridRef} className={cn('am-tiles', className)} aria-hidden />
}
