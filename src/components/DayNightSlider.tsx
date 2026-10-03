import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronsLeftRight } from 'lucide-react'
import dayPhoto from '@/assets/sala_stoly_dzien.jpg'
import nightPhoto from '@/assets/sala_stoly_noc.png'

/** Draggable before/after comparison of the banquet hall by day vs. by night. */
export function DayNightSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50) // % of width showing the day photo
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  useEffect(() => {
    function handleMove(e: MouseEvent | TouchEvent) {
      if (!draggingRef.current) return
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      updateFromClientX(clientX)
    }
    function handleUp() {
      draggingRef.current = false
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleMove)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('touchend', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchend', handleUp)
    }
  }, [updateFromClientX])

  function handleDown(e: React.MouseEvent | React.TouchEvent) {
    draggingRef.current = true
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    updateFromClientX(clientX)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 4))
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 4))
    if (e.key === 'Home') setPosition(0)
    if (e.key === 'End') setPosition(100)
  }

  return (
    <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-amber-400/25 bg-[#1C352D] p-5 text-center shadow-2xl shadow-[#1C352D]/25 sm:mt-14 sm:p-10">
      <div>
        <h2 className="font-heading text-2xl leading-tight font-semibold text-brand-cream sm:text-3xl">
          Zobacz Salę w Dwóch Odsłonach
        </h2>
        <p className="mt-3 text-sm text-brand-cream/70 sm:text-base">
          Przesuń suwak, aby zobaczyć klimat za dnia i po zmroku
        </p>

        <div
          ref={containerRef}
          role="slider"
          tabIndex={0}
          aria-label="Porównanie sali za dnia i w nocy"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          onMouseDown={handleDown}
          onTouchStart={handleDown}
          onKeyDown={handleKeyDown}
          className="relative mx-auto mt-10 aspect-[16/9] w-full touch-none overflow-hidden rounded-2xl border border-amber-500/20 select-none sm:mt-14"
        >
          {/* Wersja nocna — warstwa bazowa */}
          <img
            src={nightPhoto}
            alt="Sala bankietowa nocą"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Wersja dzienna — odkrywana przez suwak */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src={dayPhoto}
              alt="Sala bankietowa za dnia"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          {/* Etykiety w rogach */}
          <span className="pointer-events-none absolute top-4 left-4 rounded-full border border-brand-gold/50 bg-[#1C352D]/60 px-3 py-1.5 text-[11px] font-semibold tracking-widest text-brand-gold uppercase backdrop-blur-sm sm:text-xs">
            Sala w dzień
          </span>
          <span className="pointer-events-none absolute top-4 right-4 rounded-full border border-brand-gold/50 bg-[#1C352D]/60 px-3 py-1.5 text-[11px] font-semibold tracking-widest text-brand-gold uppercase backdrop-blur-sm sm:text-xs">
            Magia nocy
          </span>

          {/* Linia i uchwyt suwaka */}
          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-brand-gold/80"
            style={{ left: `${position}%` }}
          />
          <div
            className="absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-gold bg-[#1C352D] text-brand-gold shadow-lg"
            style={{ left: `${position}%` }}
          >
            <ChevronsLeftRight className="size-5" />
          </div>
        </div>
      </div>
    </div>
  )
}
