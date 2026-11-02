import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { getAllPosts, slugifyTag } from '@/lib/blog'
import { getPublishedBezirke } from '@/lib/bezirke'
import { CASES } from '@/lib/cases'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['', '/bewerbung', '/leistungen', '/leistungen/website-erstellung', '/leistungen/relaunch', '/leistungen/seo-wien', '/website-service', '/website-soforthilfe', '/website-betreuung', '/referenzen', '/ueber-mich', '/preise', '/blog', '/termin', '/kontakt', '/webdesign', '/impressum', '/datenschutz']
  const posts = await getAllPosts()
  const tagCounts = new Map<string, number>()
  for (const post of posts) {
    for (const tag of new Set(post.tags.map(slugifyTag))) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    }
  }
  // Nur Themenarchive aufnehmen, die laut Seiten-Metadaten indexierbar sind.
  const indexableTags = [...tagCounts].filter(([, count]) => count >= 2).map(([tag]) => tag)
  const entries: MetadataRoute.Sitemap = [
    ...routes.map((path) => ({ url: `${SITE.url}${path}`, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 })),
    ...CASES.map((project) => ({ url: `${SITE.url}${project.url}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...posts.map((post) => ({ url: `${SITE.url}/blog/${post.slug}`, lastModified: new Date(post.dateModified || post.date), changeFrequency: 'monthly' as const, priority: 0.65 })),
    ...indexableTags.map((tag) => ({ url: `${SITE.url}/blog/tag/${tag}`, changeFrequency: 'monthly' as const, priority: 0.4 })),
    ...getPublishedBezirke().map((district) => ({ url: `${SITE.url}/webdesign/${district.slug}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
  return [...new Map(entries.map((entry) => [entry.url, entry])).values()]
}
