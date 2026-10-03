import { ConstructionRibbon } from '@/components/ConstructionRibbon'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { UpcomingEvent } from '@/components/UpcomingEvent'
import { Gallery } from '@/components/Gallery'
import { Contact } from '@/components/Contact'
import { Location } from '@/components/Location'
import { Footer } from '@/components/Footer'

function App() {
  return (
    <div className="min-h-svh bg-brand-cream">
      <ConstructionRibbon />
      <Navbar />
      <Hero />
      <UpcomingEvent />
      <Gallery />
      <Contact />
      <Location />
      <Footer />
    </div>
  )
}

export default App
