import { useEffect, useRef, useState } from 'react'
import { FallingLeaves } from '@/components/FallingLeaves'
import logo from '@/assets/LOGO_TEXTURE.png'
import heroBg from '@/assets/GALERIA/12.jpg'

const EVENTS = ['Wesela', 'Chrzciny', 'Przyjęcia okolicznościowe', 'Bale']

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false })

  function handleHeroMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = logoRef.current?.getBoundingClientRect()
    if (!rect) return
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    })
  }

  function handleHeroMouseLeave() {
    setSpotlight((s) => ({ ...s, active: false }))
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    let ticking = false
    function handleScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const heroHeight = sectionRef.current?.offsetHeight ?? window.innerHeight
        setProgress(Math.min(1, Math.max(0, window.scrollY / heroHeight)))
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative flex min-h-svh flex-col overflow-hidden bg-brand-emerald"
    >
      {/* Zdjęcie w tle — delikatna paralaksa przy scrollu */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `url(${heroBg})`,
          transform: `scale(1.1) translateY(${progress * 10}%)`,
        }}
      />

      {/* Ciemna nakładka — utrzymuje głębię i czytelność logo/listków, przyciemnia się przy scrollu */}
      <div
        className="absolute inset-0 bg-[#1C352D] transition-opacity duration-100 ease-out"
        style={{ opacity: 0.7 + progress * 0.25 }}
      />

      {/* Czyste cięcie po łuku — odcina ciemne zdjęcie od beżowej Galerii pod spodem */}
      <div className="absolute right-0 bottom-0 left-0 z-10 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-[50px] w-full md:h-[80px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,65 C650,170 900,10 1200,40 L1200,120 L0,120 Z"
            fill="#FDFBF7"
          />
        </svg>
      </div>

      {/* subtle decorative glow */}
      <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-brand-gold/5 blur-3xl" />

      {/* fills the section, centered both axes, with room left at the bottom for the floating nav */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 pt-28 pb-32 text-center sm:px-6 sm:pb-40 lg:px-8">
        {/* Główne logo — zmniejsza skalę i zanika przy scrollu */}
        <div
          ref={logoRef}
          className="relative w-[44vw] max-w-[600px] min-w-[320px] transition-[transform,opacity] duration-100 ease-out"
          style={{
            transform: `scale(${1 - progress * 0.15})`,
            opacity: 1 - progress,
          }}
        >
          <img
            src={logo}
            alt="Willa pod Starym Dębem"
            className="h-auto w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
          />

          {/* Interaktywny spotlight — zamaskowany kształtem logo, bez prostokątnej ramki */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
            style={{
              opacity: spotlight.active ? 1 : 0,
              background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.264), transparent 80%)`,
              mixBlendMode: 'overlay',
              WebkitMaskImage: `url(${logo})`,
              maskImage: `url(${logo})`,
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          />

          {/* Opadające, złote listki — startują od korony dębu */}
          <FallingLeaves className="absolute inset-x-0 top-[8%] -bottom-[70%]" />
        </div>

        {/* Oferta — duże napisy pod logo */}
        <nav
          aria-label="Rodzaje wydarzeń"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-serif text-lg font-semibold tracking-[0.18em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:mt-10 sm:gap-x-6 sm:text-2xl lg:text-3xl"
          style={{ opacity: 1 - progress }}
        >
          {EVENTS.map((label, i) => (
            <span key={label} className="flex items-center gap-x-4 sm:gap-x-6">
              {i > 0 && (
                <span aria-hidden="true" className="text-sm text-amber-400/70 sm:text-base">
                  ✦
                </span>
              )}
              <a
                href="#kontakt"
                className="group relative text-brand-cream transition-all duration-300 hover:-translate-y-[1px] hover:text-[#F3E5AB] hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]"
              >
                {label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] transition-all duration-300 group-hover:w-full"
                />
              </a>
            </span>
          ))}
        </nav>
      </div>
    </section>
  )
}
