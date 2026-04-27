import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE.url}/leistungen`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/referenzen`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/ueber-mich`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/preise`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE.url}/kontakt`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE.url}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE.url}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
