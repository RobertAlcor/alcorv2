import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/services'
import { ServiceDetailLayout } from '@/components/sections/service-detail-layout'

const service = getServiceBySlug('seo-wien')

export const metadata: Metadata = {
  title: service?.metaTitle,
  description: service?.metaDescription,
  alternates: { canonical: '/leistungen/seo-wien' },
}

export default function SeoWienPage() {
  const service = getServiceBySlug('seo-wien')
  if (!service) notFound()
  return <ServiceDetailLayout service={service} />
}
