import { Mail, Phone, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import bgSala from '@/assets/GALERIA/8.jpg'
import bgTaras from '@/assets/GALERIA/1.jpg'
import bgOgrod from '@/assets/GALERIA/2.jpg'

// Trzy zdjęcia w tle — każde we własnym pasie, łagodnie ścięte po przekątnej
const BACKGROUNDS = [
  { src: bgSala, left: '0%', width: '38%', position: '50% 55%', clip: 'polygon(0 0, 100% 0, 87% 100%, 0 100%)' },
  { src: bgTaras, left: '31%', width: '38%', position: '45% 50%', clip: 'polygon(13% 0, 100% 0, 87% 100%, 0 100%)' },
  { src: bgOgrod, left: '62%', width: '38%', position: '55% 55%', clip: 'polygon(13% 0, 100% 0, 100% 100%, 0 100%)' },
]

const EMAIL = 'kontakt@willapodstarymdebem.pl'

const ITEMS: {
  icon: LucideIcon
  label: string
  value: string
  href: string
  size: string
}[] = [
  { icon: Phone, label: 'Zadzwoń', value: '530 707 077', href: 'tel:+48530707077', size: 'text-3xl sm:text-4xl' },
  { icon: Phone, label: 'Zadzwoń', value: '788 999 885', href: 'tel:+48788999885', size: 'text-3xl sm:text-4xl' },
  { icon: Mail, label: 'Napisz', value: EMAIL, href: `mailto:${EMAIL}`, size: 'text-[15px] tracking-normal sm:text-lg lg:text-xl' },
]

/** Contact section — short intro on the left, large phone numbers and e-mail on the right. */
export function Contact() {
  return (
    <section id="kontakt" className="relative overflow-hidden bg-[#0D221A] px-6 py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 opacity-80">
        {BACKGROUNDS.map(({ src, left, width, position, clip }) => (
          <div
            key={src}
            className="absolute inset-y-0 bg-cover"
            style={{ left, width, backgroundImage: `url(${src})`, backgroundPosition: position, clipPath: clip }}
          />
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0D221A]/70 via-[#0D221A]/35 to-[#0D221A]/70" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0D221A]/80 via-[#0D221A]/30 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <Reveal className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Wstęp */}
        <div className="rounded-2xl border border-amber-400/20 bg-[#0D221A]/70 p-8 text-center backdrop-blur-sm sm:p-10 lg:text-left">
          <span className="font-sans text-xs font-semibold tracking-[0.3em] text-amber-400 uppercase">
            Kontakt
          </span>
          <h2 className="mt-3 font-serif text-4xl leading-tight font-semibold text-white md:text-5xl">
            Opowiedz nam o swoim przyjęciu
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent lg:mx-0 lg:from-amber-400 lg:via-amber-400/40" />
          <p className="mt-6 font-sans text-base leading-relaxed text-white/90 md:text-lg">
            Planujesz wesele, chrzciny albo rodzinne przyjęcie? Zadzwoń lub napisz — chętnie
            posłuchamy o Twoich pomysłach, odpowiemy na każde pytanie i przygotujemy ofertę
            dopasowaną właśnie do Ciebie.
          </p>
        </div>

        {/* Dane kontaktowe */}
        <div className="divide-y divide-white/10 rounded-2xl border border-amber-400/20 bg-[#0D221A]/60 backdrop-blur-sm">
          {ITEMS.map(({ icon: Icon, label, value, href, size }) => (
            <a
              key={value}
              href={href}
              className="group flex items-center gap-5 px-6 py-6 transition-colors hover:bg-white/5 sm:px-8"
            >
              <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 transition-colors group-hover:bg-amber-400 group-hover:text-[#0D221A]">
                <Icon className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="block font-sans text-[11px] font-semibold tracking-[0.3em] text-amber-400 uppercase">
                  {label}
                </span>
                <span
                  className={`mt-1 block font-sans font-semibold tracking-wide text-white transition-colors group-hover:text-[#F3E5AB] ${size}`}
                >
                  {value}
                </span>
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
