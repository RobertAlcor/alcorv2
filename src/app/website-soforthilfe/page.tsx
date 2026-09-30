import { WebsiteServiceDetail } from '@/components/sections/website-services'
import { pageMetadata } from '@/lib/seo-metadata'

export const metadata = pageMetadata({
  title: 'Website-Soforthilfe: kleine Fehler beheben | ALCOR Wien',
  description: 'Gezielte Hilfe bei Website-Fehlern, mobiler Darstellung, Next.js und Vercel. Kleine Korrekturen ab 59 €. Machbarkeit und Fixpreis werden vorab vereinbart.',
  path: '/website-soforthilfe',
})

export default function Page() {
  return <WebsiteServiceDetail serviceKey="soforthilfe" />
}
