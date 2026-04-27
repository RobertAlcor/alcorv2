import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/services'
import { ServiceDetailLayout } from '@/components/sections/service-detail-layout'

const service = getServiceBySlug('website-erstellung')

export const metadata: Metadata = {
  title: service?.metaTitle,
  description: service?.metaDescription,
  alternates: { canonical: '/leistungen/website-erstellung' },
}

export default function WebsiteErstellungPage() {
  const service = getServiceBySlug('website-erstellung')
  if (!service) notFound()
  return <ServiceDetailLayout service={service} />
}
