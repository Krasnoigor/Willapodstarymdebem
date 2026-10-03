/** Site footer — copyright and credits. */
export function Footer() {
  return (
    <footer className="border-t border-amber-400/20 bg-[#0A1510] px-6 py-8 text-center">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-sans text-sm text-white/60 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Willa pod Starym Dębem. Wszelkie prawa zastrzeżone.
        </p>
        <p>
          Wykonawca strony: {' '}
          <a
            href="https://szekir.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-400 transition-colors hover:text-[#F3E5AB]"
          >
            szekir.pl
          </a>
        </p>
      </div>
    </footer>
  )
}
