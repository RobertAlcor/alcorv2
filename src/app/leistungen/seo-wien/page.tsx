import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/services'
import { ServiceDetailLayout } from '@/components/sections/service-detail-layout'
import { PAGE_META } from '@/lib/seo-metadata'

const service = getServiceBySlug('seo-wien')



export const metadata = PAGE_META.seoWien

export default function SeoWienPage() {
  const service = getServiceBySlug('seo-wien')
  if (!service) notFound()
  return <ServiceDetailLayout service={service} />
}
