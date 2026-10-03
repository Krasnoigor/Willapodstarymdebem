/** "Site under construction" notice: small bar on mobile, large diagonal corner ribbon on desktop. */
export function ConstructionRibbon() {
  const gradient = 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C]'

  return (
    <>
      {/* Mobile — pasek w rogu */}
      <div
        className={`pointer-events-none fixed top-0 left-0 z-[60] rounded-br-xl ${gradient} px-4 py-1 text-[10px] font-bold tracking-widest text-slate-950 uppercase shadow-lg shadow-black/40 sm:text-xs md:hidden`}
      >
        Strona w przebudowie
      </div>

      {/* Desktop — duża ukośna tasiemka w rogu */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[60] hidden size-64 overflow-hidden md:block"
      >
        <div
          className={`absolute top-[75px] -left-[85px] w-[360px] -rotate-45 ${gradient} py-2.5 text-center text-sm font-extrabold tracking-[0.22em] text-slate-950 uppercase shadow-xl shadow-black/50 ring-1 ring-amber-900/30`}
        >
          Strona w przebudowie
        </div>
      </div>
    </>
  )
}
