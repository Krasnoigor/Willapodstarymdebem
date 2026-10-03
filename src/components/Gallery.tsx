import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Moon, Sun, X, ZoomIn } from 'lucide-react'
import logo from '@/assets/LOGO.png'
import { DayNightSlider } from '@/components/DayNightSlider'
import img1 from '@/assets/GALERIA/1.jpg'
import img2 from '@/assets/GALERIA/2.jpg'
import img3 from '@/assets/GALERIA/3.jpg'
import img4 from '@/assets/GALERIA/4.jpg'
import img5 from '@/assets/GALERIA/5.jpg'
import img6 from '@/assets/GALERIA/6.jpg'
import img7 from '@/assets/GALERIA/7.jpg'
import img8 from '@/assets/GALERIA/8.jpg'
import img9 from '@/assets/GALERIA/9.jpg'
import img10 from '@/assets/GALERIA/10.jpg'
import img11 from '@/assets/GALERIA/11.jpg'
import img12 from '@/assets/GALERIA/12.jpg'

type CategoryId = 'all' | 'plener' | 'wnetrza'

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'plener', label: 'Plener & Śluby' },
  { id: 'wnetrza', label: 'Wnętrza' },
]

type GalleryImage = {
  id: number
  src: string
  category: Exclude<CategoryId, 'all'>
  title: string
  /** Spans 2 columns and 2 rows in the bento grid. */
  big?: boolean
}

const IMAGES: GalleryImage[] = [
  { id: 1, src: img12, category: 'plener', title: 'Wejście z czerwonym dywanem', big: true },
  { id: 2, src: img6, category: 'wnetrza', title: 'Sala weselna' },
  { id: 3, src: img11, category: 'plener', title: 'Powitanie gości' },
  { id: 4, src: img7, category: 'wnetrza', title: 'Przyjęcie w sali', big: true },
  { id: 5, src: img1, category: 'plener', title: 'Taras przed willą' },
  { id: 6, src: img2, category: 'plener', title: 'Ogród i strefa zabaw' },
  { id: 7, src: img3, category: 'plener', title: 'Namiot w ogrodzie' },
  { id: 8, src: img5, category: 'plener', title: 'Przyjęcie w namiocie' },
  { id: 9, src: img8, category: 'wnetrza', title: 'Sala weselna — stoły' },
  { id: 10, src: img10, category: 'wnetrza', title: 'Stół Młodej Pary' },
  { id: 11, src: img9, category: 'wnetrza', title: 'Słodki stół' },
  { id: 12, src: img4, category: 'plener', title: 'Alejka w ogrodzie' },
]

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [mobileIndex, setMobileIndex] = useState(0)
  const [showDayNight, setShowDayNight] = useState(false)

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? IMAGES
        : IMAGES.filter((image) => image.category === activeCategory),
    [activeCategory],
  )

  useEffect(() => {
    setMobileIndex(0)
  }, [activeCategory])

  const mobileImage = filtered[mobileIndex]

  function showMobilePrev() {
    setMobileIndex((i) => (i - 1 + filtered.length) % filtered.length)
  }

  function showMobileNext() {
    setMobileIndex((i) => (i + 1) % filtered.length)
  }

  const activeImage = lightboxIndex !== null ? filtered[lightboxIndex] : null

  function showNext() {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))
  }

  function showPrev() {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length,
    )
  }

  useEffect(() => {
    if (lightboxIndex === null) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, filtered.length])

  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] py-20 sm:py-28">
      {/* Znak wodny — ogromne logo, ledwo widoczne, czysto dekoracyjne */}
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-20 w-[600px] -translate-y-1/2 object-contain opacity-[0.04] select-none sm:w-[750px] lg:w-[900px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full border border-brand-gold/40 px-4 py-1.5 text-xs font-medium tracking-widest text-brand-gold uppercase">
          Nasza przestrzeń
        </span>
        <h2 className="mt-5 font-heading text-3xl leading-tight font-semibold text-[#1C352D] sm:text-4xl">
          Odkryj Magię Willi pod Starym Dębem
        </h2>

        {/* Filtry kategorii */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id)
                setShowDayNight(false)
              }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id && !showDayNight
                  ? 'border-brand-gold bg-brand-gold text-[#1C352D]'
                  : 'border-[#1C352D]/15 text-[#1C352D]/70 hover:border-brand-gold/60 hover:text-brand-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setShowDayNight(true)}
            aria-pressed={showDayNight}
            className={`group relative inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
              showDayNight
                ? 'border-transparent bg-[#1C352D] text-brand-gold shadow-lg'
                : 'border-transparent bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] text-[#1C352D] shadow-[0_0_22px_rgba(212,175,55,0.5)]'
            }`}
          >
            {!showDayNight && (
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 animate-pulse rounded-full bg-brand-gold/50 blur-md"
              />
            )}
            <Sun className="size-4" />
            Dzień i noc
            <Moon className="size-4" />
          </button>
        </div>

        {showDayNight ? (
          <DayNightSlider />
        ) : (
          <>
        {/* Bento grid — od sm w górę */}
        <div className="mt-12 hidden gap-3 sm:mt-16 sm:grid sm:grid-cols-4 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((image, index) => (
              <motion.button
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className={`group relative overflow-hidden rounded-2xl bg-brand-emerald/40 ${
                  image.big
                    ? 'col-span-2 row-span-2 aspect-square'
                    : 'aspect-square'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#1C352D]/0 opacity-0 transition-all duration-300 group-hover:bg-[#1C352D]/60 group-hover:opacity-100">
                  <ZoomIn className="size-6 text-brand-gold" />
                  <span className="px-3 text-center text-sm font-medium text-brand-cream">
                    {image.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Pojedyncze zdjęcie z nawigacją strzałkami — tylko mobile */}
        {mobileImage && (
          <div className="mt-12 sm:hidden">
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Poprzednie zdjęcie"
                onClick={showMobilePrev}
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-gold/40 bg-[#1C352D]/85 text-brand-gold shadow-md transition-colors hover:bg-[#1C352D] hover:text-amber-200"
              >
                <ChevronLeft className="size-5" />
              </button>

              <button
                type="button"
                onClick={() => setLightboxIndex(mobileIndex)}
                className="group relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl bg-brand-emerald/40 shadow-sm"
              >
                <img
                  key={mobileImage.id}
                  src={mobileImage.src}
                  alt={mobileImage.title}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#1C352D]/70 via-transparent to-transparent p-3">
                  <span className="text-sm font-medium text-brand-cream">{mobileImage.title}</span>
                </div>
              </button>

              <button
                type="button"
                aria-label="Następne zdjęcie"
                onClick={showMobileNext}
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-gold/40 bg-[#1C352D]/85 text-brand-gold shadow-md transition-colors hover:bg-[#1C352D] hover:text-amber-200"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            <p className="mt-4 text-center text-xs font-medium tracking-widest text-[#1C352D]/50 uppercase">
              {mobileIndex + 1} / {filtered.length}
            </p>
          </div>
        )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            aria-label="Zamknij podgląd"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 rounded-full p-2 text-brand-cream/80 transition-colors hover:text-brand-gold sm:top-6 sm:right-6"
          >
            <X className="size-7" />
          </button>

          <button
            type="button"
            aria-label="Poprzednie zdjęcie"
            onClick={(e) => {
              e.stopPropagation()
              showPrev()
            }}
            className="absolute left-2 rounded-full p-2 text-brand-cream/80 transition-colors hover:text-brand-gold sm:left-6"
          >
            <ChevronLeft className="size-8" />
          </button>

          <figure
            className="flex max-h-[85vh] max-w-4xl flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.src}
              alt={activeImage.title}
              className="max-h-[75vh] w-auto rounded-lg object-contain shadow-2xl"
            />
            <figcaption className="text-sm font-medium tracking-wide text-brand-cream/80">
              {activeImage.title}
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Następne zdjęcie"
            onClick={(e) => {
              e.stopPropagation()
              showNext()
            }}
            className="absolute right-2 rounded-full p-2 text-brand-cream/80 transition-colors hover:text-brand-gold sm:right-6"
          >
            <ChevronRight className="size-8" />
          </button>
        </div>
      )}
    </section>
  )
}
