const marqueeText = "Let's work together ✱ "

export default function Footer() {
  const items = Array(10).fill(marqueeText)

  return (
    <footer className="bg-dark rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] overflow-hidden">
      {/* Marquee */}
      <div className="py-6 overflow-hidden border-b border-white/5">
        <div className="marquee-track-slow">
          {[...items, ...items].map((text, i) => (
            <span
              key={i}
              className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-white/15 whitespace-nowrap px-4 shrink-0"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-10 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <span className="font-sans font-light text-sm text-[#999999]">© 2026 Henok Tadesse</span>
        <a
          href="mailto:hello@heynok.com"
          className="font-mono text-sm text-white hover:text-accent transition-colors duration-150"
        >
          hello@heynok.com
        </a>
        <span className="font-sans font-light text-sm text-[#999999]">Built with craft and code.</span>
      </div>
    </footer>
  )
}
