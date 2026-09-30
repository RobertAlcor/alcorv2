import { WebsiteServiceDetail } from '@/components/sections/website-services'
import { pageMetadata } from '@/lib/seo-metadata'

export const metadata = pageMetadata({
  title: 'Website-Betreuung ab 59 € pro Monat | ALCOR Wien',
  description: 'Laufende Betreuung für Ihre bestehende Website: vereinbarte Prüfungen und kleine Änderungen ab 59 € pro Monat. Klar begrenztes Zeitbudget, persönlicher Kontakt.',
  path: '/website-betreuung',
})

export default function Page() {
  return <WebsiteServiceDetail serviceKey="betreuung" />
}
