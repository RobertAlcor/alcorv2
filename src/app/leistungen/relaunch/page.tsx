import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/services'
import { ServiceDetailLayout } from '@/components/sections/service-detail-layout'

const service = getServiceBySlug('relaunch')

export const metadata: Metadata = {
  title: service?.metaTitle,
  description: service?.metaDescription,
  alternates: { canonical: '/leistungen/relaunch' },
}

export default function RelaunchPage() {
  const service = getServiceBySlug('relaunch')
  if (!service) notFound()
  return <ServiceDetailLayout service={service} />
}
