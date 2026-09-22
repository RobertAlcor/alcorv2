import type { MetadataRoute } from 'next'
import { CASES } from '@/lib/cases'
import { SITE } from '@/lib/site'
import { getAllPosts, getAllTags, slugifyTag } from '@/lib/blog'
import { getPublishedBezirke } from '@/lib/bezirke'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE.url}/leistungen`, changeFrequency: 'monthly', priority: 0.9 },
    {
      url: `${SITE.url}/leistungen/website-erstellung`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE.url}/leistungen/relaunch`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE.url}/leistungen/seo-wien`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    { url: `${SITE.url}/referenzen`, changeFrequency: 'monthly', priority: 0.9 },
    ...CASES.map((c) => ({
      url: `${SITE.url}${c.url}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${SITE.url}/ueber-mich`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/preise`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE.url}/termin`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/kontakt`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE.url}/webdesign`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/impressum`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE.url}/datenschutz`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const bezirkRoutes: MetadataRoute.Sitemap = getPublishedBezirke().map((b) => ({
    url: `${SITE.url}/webdesign/${b.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const posts = await getAllPosts()
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const tags = await getAllTags()
  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${SITE.url}/blog/tag/${slugifyTag(tag)}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...bezirkRoutes, ...postRoutes, ...tagRoutes]
}
