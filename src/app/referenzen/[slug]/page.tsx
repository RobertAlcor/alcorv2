import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowUpRight, LockKeyhole } from 'lucide-react'
import { CASES, getCaseBySlug } from '@/lib/cases'
import { projectAccessHref } from '@/lib/project-access'
import { pageMetadata } from '@/lib/seo-metadata'
import { CaseMockup } from '@/components/sections/case-mockup'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CtaBand } from '@/components/sections/cta-band'

export function generateStaticParams() {
  return CASES.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getCaseBySlug(slug)
  return project
    ? pageMetadata({
        title: project.metaTitle,
        description: project.metaDescription,
        path: project.url,
      })
    : {}
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getCaseBySlug(slug)
  if (!project) notFound()
  const privateProject = project.access === 'on-request'

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Projekte', href: '/referenzen' },
          { label: project.client, href: project.url },
        ]}
      />
      <section className="container-fluid alcor-section">
        <div className="alcor-section-head">
          <div>
            <p className="alcor-eyebrow">{project.industry}</p>
            <h1 className="alcor-page-title">{project.client}</h1>
          </div>
          <p>{project.shortDescription}</p>
        </div>
        <div className="mb-10 flex flex-wrap gap-4">
          {privateProject ? (
            <Link href={projectAccessHref(project.slug)} className="alcor-button">
              Zugang bei Robert anfragen <LockKeyhole size={20} aria-hidden="true" />
            </Link>
          ) : (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="alcor-button"
            >
              Live-Projekt öffnen <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          )}
          <Link href="/bewerbung" className="alcor-button alcor-button-outline">
            Eigenes Projekt bewerben
          </Link>
        </div>
        {privateProject && (
          <p className="alcor-note mb-8 max-w-4xl">
            Die Anwendung ist nicht öffentlich zugänglich. Für eine persönliche
            Demonstration oder den freigegebenen Pilotzugang wenden Sie sich an Robert
            Alchimowicz. Die Anfrage allein schaltet keinen Zugang frei.
          </p>
        )}
        <figure className="max-w-6xl">
          <CaseMockup caseData={project} large />
          {project.screenshotCaption && (
            <figcaption className="text-paper-mute mt-4 text-sm leading-relaxed">
              {project.screenshotCaption}
            </figcaption>
          )}
        </figure>
        {project.businessNote && (
          <p className="alcor-note mt-8 max-w-4xl">{project.businessNote}</p>
        )}
      </section>
      {project.slug === 'umzugsmeister' && <section className="container-fluid alcor-section border-t border-line">
      <div className="alcor-section-head">
        <div><p className="alcor-eyebrow">Neue Website · November 2026</p><h2>Vom ersten Überblick<br />zur konkreten Anfrage.</h2></div>
        <p>Die Aufnahme oben zeigt die neue Startseite. Hier folgt der aktuelle Anfrage-Assistent mit Leistungswahl und den sechs Anfrageschritten. Beide Originalaufnahmen stammen vom 24. November 2026.</p>
      </div>
      <figure className="max-w-6xl">
        <Image src="/media/umzugsmeister-assistent-2026-11.webp" alt="Original-Screenshot des aktuellen Umzugsmeister-Anfrage-Assistenten: erster Schritt mit Leistungswahl, Angaben zum Umfang und Anfrageübersicht" width={1348} height={926} sizes="(min-width:1200px) 1100px,95vw" className="h-auto w-full rounded-lg border border-line" />
        <figcaption className="mt-4 text-sm leading-relaxed text-paper-mute">Originalaufnahme des öffentlichen Formulars ohne eingegebene Kundendaten. Es wurde keine Anfrage abgesendet.</figcaption>
      </figure>
    </section>}
    <section className="alcor-surface">
        <div className="container-fluid alcor-section">
          <div className="alcor-notes-grid">
            <div>
              <p className="alcor-eyebrow">Die Aufgabe</p>
              <h2>Worum es ging.</h2>
              <p className="mt-6">{project.challenge}</p>
            </div>
            <div>
              <p className="alcor-eyebrow">Der Ansatz</p>
              <h2>Wie ich vorgegangen bin.</h2>
              <ol className="mt-6 space-y-5">
                {project.approach.map((text, index) => (
                  <li key={text} className="text-paper-mute flex gap-4 text-base">
                    <span className="text-signal-2 shrink-0 font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {text}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid alcor-section">
        <div className="alcor-section-head">
          <div>
            <p className="alcor-eyebrow">Projektmerkmale</p>
            <h2>
              Die Details machen
              <br />
              den Unterschied.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 auto-rows-fr">
          {project.highlights.map((highlight) => (
            <div
              key={highlight.label}
              className="border-line bg-deep-2 min-w-0 rounded-lg border p-5 sm:p-7 [overflow-wrap:anywhere]"
            >
              <h3 className="mb-4 text-2xl font-semibold">{highlight.label}</h3>
              <p className="text-paper-mute text-base leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 auto-rows-fr xl:grid-cols-4">
          {project.results.map((result) => (
            <div key={result.label} className="border-line min-w-0 border-t pt-6 [overflow-wrap:anywhere]">
              <p className="text-paper-mute text-sm">{result.label}</p>
              <p className="text-signal-2 my-3 text-3xl font-semibold">{result.value}</p>
              {result.hint && <p className="text-paper-mute text-sm">{result.hint}</p>}
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {project.techStack.map((technology) => (
            <span
              key={technology}
              className="border-line text-paper-mute rounded border px-3 py-2 text-sm"
            >
              {technology}
            </span>
          ))}
        </div>
        {privateProject && (
          <div className="border-line bg-deep-2 mt-12 rounded-lg border p-7">
            <h2 className="text-2xl font-semibold">
              Sie möchten die Anwendung kennenlernen?
            </h2>
            <p className="text-paper-mute mt-4 max-w-3xl">
              Beschreiben Sie Robert kurz Ihren Einsatzbereich. Er prüft persönlich,
              welcher Einblick für Ihr Vorhaben passt.
            </p>
            <Link href={projectAccessHref(project.slug)} className="alcor-button mt-6">
              Demonstration anfragen
            </Link>
          </div>
        )}
      </section>
      <CtaBand />
    </>
  )
}
