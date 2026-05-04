import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBezirkBySlug, getPublishedBezirke } from '@/lib/bezirke'
import { BezirkDetailLayout } from '@/components/sections/bezirk-detail'
import { SITE } from '@/lib/site'

/**
 * Statische Generierung aller Bezirks-Seiten zur Build-Zeit.
 * Nur 'full' status Bezirke werden generiert.
 */
export async function generateStaticParams() {
  return getPublishedBezirke().map((b) => ({ bezirk: b.slug }))
}

/**
 * Dynamische Metadata pro Bezirk.
 * Title, Description und Keywords kommen aus bezirke.ts.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ bezirk: string }>
}): Promise<Metadata> {
  const { bezirk: slug } = await params
  const bezirk = getBezirkBySlug(slug)

  if (!bezirk) {
    return {
      title: 'Bezirk nicht gefunden',
      robots: { index: false, follow: false },
    }
  }

  const url = `${SITE.url}/webdesign/${bezirk.slug}`

  return {
    title: bezirk.metaTitle,
    description: bezirk.metaDescription,
    keywords: [...SITE.seo.primaryKeywords, ...bezirk.keywords].join(', '),
    alternates: {
      canonical: `/webdesign/${bezirk.slug}`,
    },
    openGraph: {
      type: 'website',
      locale: 'de_AT',
      url,
      siteName: SITE.name,
      title: bezirk.metaTitle,
      description: bezirk.metaDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: bezirk.metaTitle,
      description: bezirk.metaDescription,
    },
    other: {
      'geo.region': 'AT-9',
      'geo.placename': `Wien ${bezirk.plz} ${bezirk.name}`,
      'geo.position': `${SITE.address.geo.lat};${SITE.address.geo.lng}`,
    },
  }
}

export default async function BezirkPage({
  params,
}: {
  params: Promise<{ bezirk: string }>
}) {
  const { bezirk: slug } = await params
  const bezirk = getBezirkBySlug(slug)

  if (!bezirk) notFound()

  return <BezirkDetailLayout bezirk={bezirk} />
}
