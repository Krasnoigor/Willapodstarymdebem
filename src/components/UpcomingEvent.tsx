import { ArrowRight, Calendar, Clock, Music, Sparkles, Utensils, Wine } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import poster from '@/assets/BAL/andrzeji2026.jpeg'

/**
 * Tymczasowa sekcja pod Hero — pokazuje najbliższy bal / wydarzenie.
 * Aby podmienić wydarzenie: zmień plakat i dane poniżej.
 * Sekcja znika automatycznie po dniu wydarzenia (`date`). Żeby wyłączyć ją
 * wcześniej, usuń `<UpcomingEvent />` z App.tsx.
 */
const EVENT = {
  date: '2026-11-28', // RRRR-MM-DD — po tym dniu sekcja sama się ukryje
  title: 'Bal Andrzejkowy',
  eyebrow: 'Najbliższe wydarzenie',
  dateLabel: '28.11.2026',
  timeLabel: 'Start 20:00',
  price: '285 zł / os.',
  description:
    'Zapraszamy na wyjątkowy wieczór pełen dobrej muzyki, tańca i świetnej zabawy! Spędźcie z nami Andrzejki w miłej atmosferze, przy pysznym jedzeniu i muzyce, która porwie Was na parkiet.',
  perks: [
    { icon: Utensils, text: 'Pyszne jedzenie' },
    { icon: Music, text: 'Świetna muzyka' },
    { icon: Wine, text: 'Dobry klimat' },
    { icon: Sparkles, text: 'Zabawa do białego rana' },
  ],
  closing: 'Zabierzcie bliskich i przyjaciół — do zobaczenia na parkiecie!',
  poster,
}


const GOLD = '#D4AF37'
const WINE = '#8B1E2D'

function Sparkle({ className, color = GOLD }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={color} aria-hidden="true">
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5Z" />
    </svg>
  )
}

function Mask({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <path
        fill={GOLD}
        fillRule="evenodd"
        d="M6 30 C6 10 40 6 60 20 C80 6 114 10 114 30 C114 48 86 52 72 41 C66 37 54 37 48 41 C34 52 6 48 6 30 Z M28 28 C32 21 47 21 52 28 C47 35 32 35 28 28 Z M68 28 C73 21 88 21 92 28 C88 35 73 35 68 28 Z"
      />
      <path d="M60 20 C58 12 62 6 60 0" stroke={WINE} strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="6" r="3" fill={WINE} />
      <path d="M10 22 C22 18 34 20 40 24 M110 22 C98 18 86 20 80 24" stroke={WINE} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function Flute({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 120" className={className} aria-hidden="true">
      <path fill={GOLD} d="M9 4 H31 L28.5 52 C27.5 64 12.5 64 11.5 52 Z" />
      <path fill="#FDFBF7" opacity="0.55" d="M12 14 H28 L26.6 36 H13.4 Z" />
      <rect x="18.5" y="62" width="3" height="42" fill={GOLD} />
      <rect x="9" y="104" width="22" height="4" rx="2" fill={GOLD} />
    </svg>
  )
}

function Streamer({ className, color = GOLD }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 220" className={className} fill="none" aria-hidden="true">
      <path
        d="M10 0 C60 30 -10 62 40 94 S70 150 24 184 S40 210 60 220"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Dekoracje w tle — motyw balu andrzejkowego (maska, kieliszki, serpentyny, iskry). */
function PartyDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 select-none">
      <Mask className="absolute -top-2 -left-6 w-44 -rotate-12 opacity-30 sm:left-4 sm:w-60 lg:left-16" />
      <Mask className="absolute -right-8 -bottom-1 hidden w-48 rotate-[168deg] opacity-20 sm:block lg:right-20" />

      <div className="absolute -right-3 -top-2 flex items-start gap-0 opacity-30 sm:right-8 lg:right-24">
        <Flute className="h-28 w-10 rotate-[18deg] sm:h-40 sm:w-14" />
        <Flute className="-ml-2 h-28 w-10 -rotate-[14deg] sm:h-40 sm:w-14" />
      </div>

      <Streamer className="absolute top-8 -left-6 hidden h-56 w-20 opacity-25 sm:block" />
      <Streamer color={WINE} className="absolute -bottom-2 left-2 h-44 w-16 rotate-180 opacity-20 sm:left-10" />
      <Streamer color={WINE} className="absolute top-10 right-0 hidden h-52 w-16 -scale-x-100 opacity-20 md:block" />

      <Sparkle className="absolute top-[18%] left-[30%] hidden size-5 opacity-40 sm:block" />
      <Sparkle className="absolute top-6 right-[32%] size-4 opacity-40" />
      <Sparkle color={WINE} className="absolute bottom-6 left-[38%] size-5 opacity-30" />
      <Sparkle className="absolute right-[18%] bottom-8 size-6 opacity-40" />
      <Sparkle className="absolute bottom-[40%] left-2 size-4 opacity-40 sm:left-6" />
      <span className="absolute top-[30%] right-[10%] size-2 rounded-full bg-[#D4AF37] opacity-40" />
      <span className="absolute bottom-[22%] left-[22%] size-2 rounded-full bg-[#8B1E2D] opacity-30" />
      <span className="absolute top-[10%] left-[46%] size-1.5 rounded-full bg-[#D4AF37] opacity-50" />
      <span className="absolute right-[44%] bottom-[10%] size-1.5 rounded-full bg-[#D4AF37] opacity-50" />
    </div>
  )
}

export function UpcomingEvent() {
  const endOfEvent = new Date(`${EVENT.date}T23:59:59`)
  if (new Date() > endOfEvent) return null

  return (
    <section id="bal" className="relative overflow-hidden bg-[#FDFBF7] px-4 py-24 sm:px-6 sm:py-36">
      <PartyDecor />
      <Reveal className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-3xl border border-amber-400/30 bg-[#0D221A] p-6 shadow-2xl shadow-[#0D221A]/30 sm:p-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14 lg:p-12">
        <a
          href={EVENT.poster}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Powiększ plakat: ${EVENT.title}`}
          className="mx-auto block w-full max-w-sm overflow-hidden rounded-2xl border border-amber-400/40 shadow-xl shadow-black/50 transition-transform duration-500 hover:scale-[1.02] lg:max-w-none"
        >
          <img src={EVENT.poster} alt={`Plakat: ${EVENT.title}`} loading="lazy" decoding="async" className="block h-auto w-full" />
        </a>

        <div className="text-center lg:text-left">
          <span className="font-sans text-xs font-semibold tracking-[0.3em] text-amber-400 uppercase">
            {EVENT.eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-4xl leading-tight font-semibold text-white md:text-5xl">
            {EVENT.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent lg:mx-0 lg:from-amber-400 lg:via-amber-400/40" />

          <p className="mt-6 font-sans text-base leading-relaxed text-white/85 md:text-lg">
            {EVENT.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-5 py-2.5 font-sans text-sm font-semibold text-amber-200">
              <Calendar className="size-4" /> {EVENT.dateLabel}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-5 py-2.5 font-sans text-sm font-semibold text-amber-200">
              <Clock className="size-4" /> {EVENT.timeLabel}
            </span>
            <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-400/10 px-5 py-2.5 font-sans text-sm font-semibold text-amber-200">
              {EVENT.price}
            </span>
          </div>

          <ul className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            {EVENT.perks.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 font-sans text-white/90">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-amber-400/30 bg-white/5 text-amber-300">
                  <Icon className="size-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <p className="mt-8 font-serif text-xl text-amber-200 italic">{EVENT.closing}</p>

          <a
            href="#kontakt"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] px-7 py-3.5 text-sm font-semibold tracking-wider text-slate-950 uppercase shadow-md transition-all hover:brightness-110"
          >
            Zarezerwuj miejsce
            <ArrowRight className="size-4" />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
