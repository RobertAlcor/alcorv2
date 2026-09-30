import { WebsiteServiceOverview } from '@/components/sections/website-services'
import { pageMetadata } from '@/lib/seo-metadata'

export const metadata = pageMetadata({
  title: 'Website-Service: Soforthilfe & Betreuung | ALCOR Wien',
  description: 'Hilfe für bestehende Websites: kleine Korrekturen ab 59 € und laufende Betreuung ab 59 € pro Monat. Klarer Leistungsumfang, unverbindliche Anfrage.',
  path: '/website-service',
})

export default function WebsiteServicePage() {
  return <WebsiteServiceOverview />
}
