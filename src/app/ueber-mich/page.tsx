import type { Metadata } from 'next'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CtaBand } from '@/components/sections/cta-band'
import { personSchema } from '@/lib/schema'
import { SITE } from '@/lib/site'
import { RelatedPages } from '@/components/sections/related-pages'
import { RELATED_FOR } from '@/lib/related-pages'

export const metadata: Metadata = {
  title: 'Über Robert Alchimowicz',
  description:
    'Robert Alchimowicz, Webentwickler aus Wien. Über 10 Jahre Erfahrung, kontinuierliche Weiterbildung, zukunftsorientiertes Arbeiten. Eine Person, voller Code-Besitz.',
  alternates: { canonical: '/ueber-mich' },
}

// === EINFACHER FOTO-AUSTAUSCH ===
const ABOUT_PHOTO = {
  src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80',
  alt: 'Robert Alchimowicz an seinem Arbeitsplatz',
  credit: 'Foto: Unsplash – wird durch eigenes Foto ersetzt',
} as const

const STATIONEN = [
  {
    year: '2014',
    title: 'Erste eigene Auftragsarbeit',
    description:
      'Mein erster bezahlter Webauftrag. Ab da war klar: Programmieren ist kein Job, das ist meine Leidenschaft.',
  },
  {
    year: '2017',
    title: 'PHP & MySQL als täglich Brot',
    description:
      'Eigene CMS-Lösungen für KMU in Wien. Erste Großkunden, erste Verantwortung für komplette digitale Auftritte.',
  },
  {
    year: '2020',
    title: 'Mobile First & Performance',
    description:
      'Responsive Design wird Pflicht. Performance wird zur Disziplin. Lighthouse-Scores werden mein täglicher Maßstab.',
  },
  {
    year: '2022',
    title: 'JAMstack & Serverless',
    description:
      'Statische Generierung statt traditioneller Stacks. Vercel, Cloudflare, edge-deployed. Ladezeiten unter einer Sekunde.',
  },
  {
    year: '2024',
    title: 'Next.js & TypeScript',
    description:
      'Komplette Umstellung auf modernen React-Stack. Höhere Code-Qualität, weniger Bugs, bessere DX.',
  },
  {
    year: '2026',
    title: 'GEO & AI-Optimierung',
    description:
      'KI-Suchmaschinen verändern SEO grundlegend. Ich bilde mich kontinuierlich weiter, um vorne mit dabei zu sein.',
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
      'Versprochene Termine werden gehalten. Kein „Account-Manager meldet sich morgen".',
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
              Webentwickler aus Wien. Über 10 Jahre im Web, immer noch
              begeistert wie am ersten Tag.
            </p>
            <p className="text-paper-mute leading-relaxed text-pretty mb-4">
              Ich programmiere und mache Webdesign seit über zehn Jahren – und
              ich liebe es immer noch. Jede neue Technologie, jede Library, jede
              Architektur-Entscheidung. Was ich heute baue, hat mit dem, was ich
              vor zehn Jahren gebaut habe, nur noch die Leidenschaft gemeinsam.
            </p>
            <p className="text-paper-mute leading-relaxed text-pretty">
              Ich bilde mich kontinuierlich weiter, um am aktuellen Stand zu
              bleiben und zukunftsorientiert arbeiten zu können. Das Web
              verändert sich schnell – wer heute stehenbleibt, baut morgen
              veraltete Sites.
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
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 50%, rgba(22,22,24,0.5) 100%)',
                }}
              />
            </div>
            <p className="text-[0.7rem] text-paper-dim mt-2 italic text-right">
              {ABOUT_PHOTO.credit}
            </p>
          </div>
        </div>
      </section>

      {/* Was mich antreibt */}
      <section className="container-fluid py-20 md:py-24 border-t border-line">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Was mich antreibt
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance mb-8">
            Warum ich das mache, was ich mache.
          </h2>
          <div className="space-y-6">
            <p className="text-paper-mute leading-relaxed text-pretty">
              Mich fasziniert, wie aus ein paar Zeilen Code etwas entsteht, das
              echten Menschen hilft – einer Praxis mehr Termine, einem Handwerker
              mehr Anfragen, einem Berater mehr Sichtbarkeit. Code ist für mich
              kein Selbstzweck. Code ist das Werkzeug, das den Unterschied macht,
              ob Ihre Website ein Kostenfaktor oder ein Vertriebskanal ist.
            </p>
            <p className="text-paper-mute leading-relaxed text-pretty">
              Genau deshalb arbeite ich nicht mit Baukasten-Systemen oder
              vorgefertigten Themes. Jedes Projekt verdient eine Lösung, die zu
              ihm passt – nicht eine, die irgendwer für irgendwen vorgefertigt
              hat. Das dauert länger im Aufbau, aber es zahlt sich für den
              Kunden über Jahre aus.
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
              className="bg-deep-2 border border-line p-8 rounded-sm hover:border-signal-2/40 transition-colors"
            >
              <div className="font-mono text-xs text-paper-dim mb-3">
                0{idx + 1}
              </div>
              <h3 className="font-serif text-2xl text-paper mb-3">
                {wert.title}
              </h3>
              <p className="text-paper-mute leading-relaxed">
                {wert.description}
              </p>
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
            Über zehn Jahre, in sechs Stationen.
          </h2>
        </div>
        <ol className="relative max-w-3xl">
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
              <h3 className="font-serif text-2xl text-paper mb-2">
                {station.title}
              </h3>
              <p className="text-paper-mute leading-relaxed">
                {station.description}
              </p>
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
          <p className="font-serif italic text-2xl md:text-3xl text-paper text-balance leading-snug mb-8">
            Ich lebe und arbeite im 22. Wiener Bezirk. Mit meiner Lebensgefährtin
            und unserem Sohn. Nebenbei fotografiere ich – das hilft, wenn Kunden
            für ihre Website auch echte Bilder brauchen.
          </p>
          <p className="text-paper-mute leading-relaxed text-pretty mb-4">
            Familie ist für mich der Anker, der alles in Perspektive setzt. Wenn
            mein Sohn am Abend vom Kindergarten erzählt, ist mir egal, wie viele
            Tabs gerade offen sind. Diese Trennung tut auch der Arbeit gut –
            ich komme klarer wieder rein, wenn ich auch wirklich abschalte.
          </p>
          <p className="text-paper-mute leading-relaxed text-pretty">
            Geschäftssitz: {SITE.address.street}, {SITE.address.postalCode}{' '}
            {SITE.address.city}. Termine vor Ort sind möglich – meist reichen
            aber Telefonate oder Videocalls. Effizienter für alle Seiten.
          </p>
        </div>
      </section>

      <CtaBand
        title="Lust auf ein erstes Gespräch?"
        subtitle="15 Minuten reichen meistens, um einzuschätzen, ob wir zusammenpassen. Kostenlos, ohne Verkaufsdruck."
      />
      <RelatedPages pages={RELATED_FOR.uebermich} />

    </>
  )
}
