import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const LEFT_LINKS = [
  { label: 'O nas', href: '#o-nas' },
  { label: 'Oferta', href: '#oferta' },
]

const RIGHT_LINKS = [
  { label: 'Galeria', href: '#galeria' },
  { label: 'Kontakt', href: '#kontakt' },
]

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS]

const linkClass =
  'group relative inline-block overflow-hidden px-1 py-1 text-[13px] font-medium tracking-[0.25em] text-white/80 uppercase transition-all duration-300 hover:-translate-y-[1px] hover:text-[#F3E5AB] hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]'

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className={linkClass}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-200/40 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100"
      />
      {label}
    </a>
  )
}

function Divider() {
  return (
    <span aria-hidden="true" className="font-serif text-xs text-amber-400/50">
      ✦
    </span>
  )
}

/** Full-width luxury navbar — compacts and darkens on scroll, hamburger menu on mobile. */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-6 right-0 left-0 z-50 backdrop-blur-md transition-all duration-300 md:top-0 ${
        scrolled
          ? 'bg-[#0D221A]/95 shadow-2xl shadow-black/50'
          : 'bg-[#0D221A]/70 shadow-lg shadow-black/30'
      }`}
    >
      {/* Złota linia u góry */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <div
        className={`mx-auto grid max-w-7xl grid-cols-2 items-center px-5 transition-all duration-300 md:grid-cols-[1fr_auto_1fr] md:px-8 ${
          scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
        }`}
      >
        {/* Lewe linki — desktop */}
        <nav className="hidden items-center gap-8 md:flex md:pl-44">
          {LEFT_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Marka */}
        <a
          href="#"
          className="flex flex-col items-start justify-self-start md:items-center md:justify-self-center md:px-10"
        >
          <span className="font-sans text-[9px] leading-none font-semibold tracking-[0.35em] whitespace-nowrap text-white/80 uppercase md:text-[11px]">
            Sala bankietowa
          </span>
          <span className="font-beau-rivage text-xl leading-tight tracking-wide whitespace-nowrap text-amber-200 drop-shadow-[0_0_10px_rgba(212,175,55,0.35)] md:text-4xl">
            Willa Pod Starym Dębem
          </span>
        </a>

        {/* Prawe linki — desktop */}
        <nav className="hidden items-center justify-end gap-8 md:flex">
          {RIGHT_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <Divider />
        </nav>

        {/* Hamburger — mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          className="justify-self-end text-amber-200 md:hidden"
        >
          {menuOpen ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>

      {/* Złota linia na dole */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

      {/* Rozwijane menu mobilne */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col border-t border-amber-400/20 px-5 py-3">
          {ALL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/5 py-3 text-sm font-medium tracking-[0.25em] text-white/80 uppercase transition-colors last:border-b-0 hover:text-amber-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
