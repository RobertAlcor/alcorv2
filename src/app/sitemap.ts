import type {MetadataRoute} from 'next'
import {SITE} from '@/lib/site'
import {getAllPosts,getAllTags,slugifyTag} from '@/lib/blog'
import {getPublishedBezirke} from '@/lib/bezirke'
import {CASES} from '@/lib/cases'
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const routes=['','/bewerbung','/leistungen','/leistungen/website-erstellung','/leistungen/relaunch','/leistungen/seo-wien','/website-service','/website-soforthilfe','/website-betreuung','/referenzen','/ueber-mich','/preise','/blog','/termin','/kontakt','/webdesign','/impressum','/datenschutz']
 const posts=await getAllPosts(); const tags=await getAllTags()
 return [...routes.map(p=>({url:`${SITE.url}${p}`,changeFrequency:'monthly' as const,priority:p===''?1:.7})),...CASES.map(c=>({url:`${SITE.url}${c.url}`,changeFrequency:'monthly' as const,priority:.7})),...posts.map(p=>({url:`${SITE.url}/blog/${p.slug}`,lastModified:new Date(p.dateModified||p.date),changeFrequency:'monthly' as const,priority:.65})),...tags.map(t=>({url:`${SITE.url}/blog/tag/${slugifyTag(t)}`,changeFrequency:'monthly' as const,priority:.4})),...getPublishedBezirke().map(b=>({url:`${SITE.url}/webdesign/${b.slug}`,changeFrequency:'monthly' as const,priority:.6}))]
}
