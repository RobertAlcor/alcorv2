import type { Metadata } from 'next'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CtaBand } from '@/components/sections/cta-band'
import { personSchema } from '@/lib/schema'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Über Robert Alchimowicz',
  description:
    'Robert Alchimowicz, Webentwickler aus Wien seit 2002. Eine Person, voller Code-Besitz von Strategie bis Deployment.',
  alternates: { canonical: '/ueber-mich' },
}

// === EINFACHER FOTO-AUSTAUSCH ===
// Sobald eigenes Foto verfügbar: ABOUT_PHOTO einfach auf '/foto-robert.jpg' setzen
// und Datei nach /public/ kopieren. Kein anderer Code muss geändert werden.
const ABOUT_PHOTO = {
  src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80',
  alt: 'Robert Alchimowicz an seinem Arbeitsplatz',
  credit: 'Foto: Unsplash – wird durch eigenes Foto ersetzt',
} as const

const STATIONEN = [
  {
    year: '2002',
    title: 'Erste Website',
    description: 'Mein erster bezahlter Auftrag – eine kleine Bäckerei in Wien.',
  },
  {
    year: '2008',
    title: 'PHP und MySQL',
    description: 'Eigene CMS-Lösungen für KMU, weg von statischen HTML-Sites.',
  },
  {
    year: '2015',
    title: 'Mobile First',
    description: 'Responsive Design wird Standard. Performance wird zur Disziplin.',
  },
  {
    year: '2020',
    title: 'JAMstack-Wende',
    description: 'Statische Generierung, JavaScript-Frameworks, Vercel und Co.',
  },
  {
    year: '2024',
    title: 'Next.js und TypeScript',
    description: 'Komplette Umstellung auf modernen React-Stack. Höhere Qualität, weniger Bugs.',
  },
  {
    year: '2026',
    title: 'GEO-Ära',
    description: 'AI-Suchmaschinen verändern SEO grundlegend. Zeit, sich anzupassen.',
  },
] as const

const WERTE = [
  {
    title: 'Code-Besitz',
    description:
      'Sie bekommen alles, was ich für Sie schreibe. Kein Vendor-Lock-in, keine versteckten Lizenzen.',
  },
  {
    title: 'Direktheit',
    description:
      'Ich sage Ihnen, was funktioniert und was nicht. Auch wenn es kein Auftrag wird.',
  },
  {
    title: 'Verlässlichkeit',
    description:
      'Versprochene Termine werden gehalten. Kein "Account-Manager meldet sich morgen".',
  },
  {
    title: 'Handwerk',
    description:
      'Eine Website ist kein Klick-Geschäft. Jede Zeile Code wird bewusst gesetzt.',
  },
] as const

export default function UeberMichPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Über mich', href: '/ueber-mich' },
        ]}
      />

      {/* Hero with photo */}
      <section className="container-fluid pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Über mich
            </p>
            <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-8">
              Robert <em className="text-signal-2 italic">Alchimowicz.</em>
            </h1>
            <p className="font-serif italic text-xl md:text-2xl text-paper-mute leading-snug mb-6">
              Webentwickler aus Wien. Seit 2002.
            </p>
            <p className="text-paper-mute leading-relaxed text-pretty">
              Ich baue Websites, weil ich es vor 24 Jahren mit einer Bäckerei
              angefangen habe und nie aufhören wollte. Heute mache ich das in
              modernem TypeScript, Next.js und mit deutlich mehr Erfahrung – aber
              die Grundhaltung ist gleich geblieben: Code von Hand, klar denken,
              ehrlich bleiben.
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-line">
              <Image
                src={ABOUT_PHOTO.src}
                alt={ABOUT_PHOTO.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              {/* Overlay gradient for depth */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 50%, rgba(10,14,39,0.4) 100%)',
                }}
              />
            </div>
            <p className="text-[0.7rem] text-paper-dim mt-2 italic text-right">
              {ABOUT_PHOTO.credit}
            </p>
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="container-fluid py-20 md:py-24 border-t border-line">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Werte
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance">
            Vier Grundsätze, nach denen ich arbeite.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {WERTE.map((wert, idx) => (
            <div
              key={wert.title}
              className="bg-deep-2 border border-line p-8 rounded-sm"
            >
              <div className="font-mono text-xs text-paper-dim mb-3">
                0{idx + 1}
              </div>
              <h3 className="font-serif text-2xl text-paper mb-3">{wert.title}</h3>
              <p className="text-paper-mute leading-relaxed">{wert.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stationen / Timeline */}
      <section className="container-fluid py-20 md:py-24 border-t border-line">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Stationen
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance">
            24 Jahre in sechs Stationen.
          </h2>
        </div>
        <ol className="relative max-w-3xl">
          {/* Timeline line */}
          <div
            aria-hidden
            className="absolute left-0 top-2 bottom-2 w-px bg-line"
          />
          {STATIONEN.map((station) => (
            <li key={station.year} className="relative pl-10 pb-10 last:pb-0">
              <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-signal-2" />
              <div className="font-mono text-xs text-signal-2 uppercase tracking-wider mb-1">
                {station.year}
              </div>
              <h3 className="font-serif text-2xl text-paper mb-2">{station.title}</h3>
              <p className="text-paper-mute leading-relaxed">{station.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Kontext: Standort + Familie */}
      <section className="container-fluid py-20 md:py-24 border-t border-line">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Privat
          </p>
          <p className="font-serif italic text-2xl md:text-3xl text-paper text-balance leading-snug">
            Ich lebe und arbeite im 22. Wiener Bezirk. Verheiratet, ein Sohn.
            Nebenbei Fotograf – das hilft, wenn Kunden für ihre Website auch
            Bilder brauchen.
          </p>
          <p className="text-paper-mute leading-relaxed mt-8 text-pretty">
            Geschäftssitz: {SITE.address.street}, {SITE.address.postalCode}{' '}
            {SITE.address.city}. Termine vor Ort möglich – meist sind es aber
            Telefonate oder Videocalls. Effizienter für alle.
          </p>
        </div>
      </section>

      <CtaBand
        title="Lust auf ein erstes Gespräch?"
        subtitle="15 Minuten reichen meistens, um einzuschätzen, ob wir zusammenpassen. Kostenlos, ohne Verkaufsdruck."
      />
    </>
  )
}
