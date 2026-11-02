import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CtaBand } from '@/components/sections/cta-band'
import { ReadingProgress } from '@/components/blog/reading-progress'
import { AuthorBox } from '@/components/blog/author-box'
import { PostCard } from '@/components/blog/post-card'
import { getAllPosts, getPostBySlug, formatPostDate, slugifyTag } from '@/lib/blog'
import { getBlogSearchCopy, getBlogService } from '@/lib/blog-seo'
import { blogCover, blogCoverAlt } from '@/lib/blog-cover'
import { renderMarkdown } from '@/lib/markdown'
import { SITE } from '@/lib/site'

export const revalidate = 3600
export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ slug: post.slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()
  const copy = getBlogSearchCopy(post)
  const image = { url: `${SITE.url}${blogCover(post)}`, width: 1200, height: 720, alt: blogCoverAlt(post) }
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author, url: `${SITE.url}/ueber-mich` }],
    openGraph: { type: 'article', title: copy.title, description: copy.description, url: `${SITE.url}/blog/${post.slug}`, publishedTime: post.date, modifiedTime: post.dateModified, authors: [post.author], tags: post.tags, images: [image] },
    twitter: { card: 'summary_large_image', title: copy.title, description: copy.description, images: [image] },
  }
}
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()
  const copy = getBlogSearchCopy(post)
  const service = getBlogService(post)
  const all = await getAllPosts()
  const related = all.filter((item) => item.slug !== post.slug).sort((a, b) => Number(b.tags.some((tag) => post.tags.includes(tag))) - Number(a.tags.some((tag) => post.tags.includes(tag)))).slice(0, 2)
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    '@id': `${SITE.url}/blog/${post.slug}#article`,
    isPartOf: { '@id': `${SITE.url}/#website` },
    headline: copy.heading, description: copy.description,
    image: `${SITE.url}${blogCover(post)}`, datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: { '@type': 'Person', name: post.author, ...(post.author === SITE.founder.name ? { '@id': `${SITE.url}/#robert`, url: `${SITE.url}/ueber-mich` } : {}) },
    publisher: { '@type': 'Organization', '@id': `${SITE.url}/#organization`, name: SITE.name, logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.svg` } },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`, inLanguage: 'de-AT',
  }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <ReadingProgress />
    <Breadcrumbs items={[{ label: 'Start', href: '/' }, { label: 'Journal', href: '/blog' }, { label: copy.heading, href: `/blog/${post.slug}` }]} />
    <article className="container-fluid alcor-section">
      <header className="max-w-5xl">
        <p className="alcor-eyebrow">{post.category} · <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingTimeMinutes} Min.</p>
        <h1 className="alcor-page-title">{copy.heading}</h1>
        <p className="alcor-intro">{post.description || post.excerpt}</p>
        {post.dateModified && post.dateModified !== post.date && <p className="mt-4 text-sm text-paper-mute">Aktualisiert am <time dateTime={post.dateModified}>{formatPostDate(post.dateModified)}</time></p>}
        <div className="mt-6 flex flex-wrap gap-3">{post.tags.map((tag) => <Link key={tag} href={`/blog/tag/${slugifyTag(tag)}`} className="rounded border border-line px-3 py-2 text-sm text-paper-mute hover:text-signal-2">{tag}</Link>)}</div>
      </header>
      <figure className="alcor-article-image"><Image src={blogCover(post)} alt={blogCoverAlt(post)} fill sizes="(min-width:1200px) 1100px,92vw" priority unoptimized /></figure>
      <aside aria-label="Passende Leistungen zum Ratgeber" className="mb-10 max-w-4xl rounded-lg border border-line p-6 md:p-8">
        <p className="text-lg font-semibold text-paper">Sie möchten das für Ihr Unternehmen umsetzen?</p>
        <p className="mt-3 text-paper-mute">Hier finden Sie die passenden Leistungen und einen direkten Weg zum persönlichen Gespräch.</p>
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-4">
          <Link href={service.href} className="alcor-text-link">{service.label} →</Link>
          <Link href="/preise" className="alcor-text-link">Pakete und Preise vergleichen →</Link>
          <Link href="/termin" className="alcor-text-link">Kostenloses Erstgespräch →</Link>
        </div>
      </aside>
      <div className="prose-blog max-w-4xl" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      <div className="max-w-4xl"><AuthorBox /></div>
    </article>
    {related.length > 0 && <section className="container-fluid alcor-section border-t border-line"><div className="alcor-section-head"><h2>Mehr aus dem Journal.</h2><Link href="/blog" className="alcor-text-link">Alle Beiträge →</Link></div><div className="grid gap-7 md:grid-cols-2">{related.map((item) => <PostCard key={item.slug} post={item} />)}</div></section>}
    <CtaBand />
  </>
}
