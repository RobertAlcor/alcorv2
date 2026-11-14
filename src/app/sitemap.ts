import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { getAllPosts, slugifyTag } from '@/lib/blog'
import { getPublishedBezirke } from '@/lib/bezirke'
import { CASES } from '@/lib/cases'

const STATIC_ROUTE_LAST_MODIFIED: Record<string, string> = {
  '': '2026-11-14',
  '/bewerbung': '2026-11-13',
  '/leistungen': '2026-11-14',
  '/leistungen/website-erstellung': '2026-11-13',
  '/leistungen/relaunch': '2026-11-02',
  '/leistungen/seo-wien': '2026-11-02',
  '/it-service-wien': '2026-11-14',
  '/referenzen': '2026-11-02',
  '/preise': '2026-11-14',
  '/termin': '2026-11-02',
  '/kontakt': '2026-11-14',
}

const PROJECT_LAST_MODIFIED: Record<string, string> = {
  'massagewelt-wien': '2026-11-02',
  cleankos: '2026-11-02',
  etikettendruck24: '2026-11-02',
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '',
    '/bewerbung',
    '/leistungen',
    '/leistungen/website-erstellung',
    '/leistungen/relaunch',
    '/leistungen/seo-wien',
    '/it-service-wien',
    '/website-service',
    '/website-soforthilfe',
    '/website-betreuung',
    '/referenzen',
    '/ueber-mich',
    '/preise',
    '/blog',
    '/termin',
    '/kontakt',
    '/webdesign',
    '/impressum',
    '/datenschutz',
  ]
  const posts = await getAllPosts()
  const tagCounts = new Map<string, number>()
  const tagLastModified = new Map<string, Date>()

  for (const post of posts) {
    const modified = new Date(post.dateModified || post.date)
    for (const tag of new Set(post.tags.map(slugifyTag))) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      const current = tagLastModified.get(tag)
      if (!current || modified > current) tagLastModified.set(tag, modified)
    }
  }

  const indexableTags = [...tagCounts]
    .filter(([, count]) => count >= 2)
    .map(([tag]) => tag)

  const latestPostModified = posts.reduce<Date | undefined>(
    (latest, post) => {
      const modified = new Date(post.dateModified || post.date)
      return !latest || modified > latest ? modified : latest
    },
    undefined,
  )

  const entries: MetadataRoute.Sitemap = [
    ...routes.map((path) => ({
      url: `${SITE.url}${path}`,
      lastModified:
        path === '/blog'
          ? latestPostModified
          : STATIC_ROUTE_LAST_MODIFIED[path]
            ? new Date(STATIC_ROUTE_LAST_MODIFIED[path])
            : undefined,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
    })),
    ...CASES.map((project) => {
      const projectModified = PROJECT_LAST_MODIFIED[project.slug]
      return {
        url: `${SITE.url}${project.url}`,
        lastModified: projectModified
          ? new Date(projectModified)
          : undefined,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    }),
    ...posts.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: new Date(post.dateModified || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    ...indexableTags.map((tag) => ({
      url: `${SITE.url}/blog/tag/${tag}`,
      lastModified: tagLastModified.get(tag),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    })),
    ...getPublishedBezirke().map((district) => ({
      url: `${SITE.url}/webdesign/${district.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [...new Map(entries.map((entry) => [entry.url, entry])).values()]
}
