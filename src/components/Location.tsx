import { ArrowUpRight, MapPin } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const MAPS_QUERY = encodeURIComponent('Willa pod Starym Dębem, ul. Lemiesz 63, 03-030 Warszawa')
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`

/** Location section — centered heading, address bar and a full-width map. */
export function Location() {
  return (
    <section id="lokalizacja" className="bg-[#FDFBF7] px-6 py-24 text-center sm:py-32">
      <Reveal>
      <span className="font-sans text-xs font-semibold tracking-[0.3em] text-brand-gold uppercase">
        Lokalizacja
      </span>
      <h2 className="mt-3 font-serif text-4xl leading-tight font-semibold text-brand-emerald md:text-5xl">
        Jak do nas dojechać?
      </h2>
      <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

      <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center justify-between gap-6 md:flex-row">
        <address className="flex items-center gap-4 font-sans text-xl font-semibold text-brand-emerald not-italic md:text-2xl">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-emerald text-brand-gold">
            <MapPin className="size-5" />
          </span>
          ul. Lemiesz 63, 03-030 Warszawa
        </address>

        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] px-7 py-3.5 text-sm font-semibold tracking-wider text-slate-950 uppercase shadow-md transition-all hover:brightness-110"
        >
          Otwórz w Google Maps
          <ArrowUpRight className="size-4" />
        </a>
      </div>

      <iframe
        src={MAPS_EMBED_SRC}
        title="Mapa dojazdu — Willa pod Starym Dębem"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="mx-auto mt-8 h-[360px] w-full max-w-5xl rounded-2xl border border-brand-emerald/15 shadow-2xl shadow-brand-emerald/10 contrast-[0.95] saturate-[0.8] md:h-[440px]"
      />
      </Reveal>
    </section>
  )
}
