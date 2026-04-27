import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CtaBand } from '@/components/sections/cta-band'
import { ReadingProgress } from '@/components/blog/reading-progress'
import { AuthorBox } from '@/components/blog/author-box'
import { PostCard } from '@/components/blog/post-card'
import {
  getAllPosts,
  getPostBySlug,
  formatPostDate,
  slugifyTag,
} from '@/lib/blog'
import { renderMarkdown } from '@/lib/markdown'
import { SITE } from '@/lib/site'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description || post.excerpt,
      url: `${SITE.url}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.dateModified,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || post.excerpt,
    },
  }
}

export const revalidate = 3600

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = await getAllPosts()
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2)

  // Fallback: if no related by tag, take latest 2 other posts
  const relatedFinal =
    related.length > 0
      ? related
      : allPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  const html = renderMarkdown(post.content)

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || post.excerpt,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${SITE.url}/ueber-mich`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    inLanguage: 'de-AT',
    wordCount: post.content.split(/\s+/).filter(Boolean).length,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <ReadingProgress />

      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <article className="container-fluid pt-12 md:pt-16 pb-16">
        {/* Article Header */}
        <header className="max-w-3xl mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-wider">
            <span className="text-signal-2">{post.category}</span>
            <span className="text-paper-dim">·</span>
            <time dateTime={post.date} className="text-paper-dim">
              {formatPostDate(post.date)}
            </time>
            <span className="text-paper-dim">·</span>
            <span className="text-paper-dim">{post.readingTimeMinutes} min Lesezeit</span>
          </div>

          <h1 className="font-serif text-[clamp(2rem,5.5vw,4.5rem)] leading-[1] tracking-[-0.02em] text-balance mb-6">
            {post.title}
          </h1>

          {post.description && (
            <p className="font-serif italic text-xl md:text-2xl text-paper-mute leading-snug max-w-2xl">
              {post.description}
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${slugifyTag(tag)}`}
                  className="px-2.5 py-1 text-[0.7rem] font-medium text-paper-mute bg-deep-2 border border-line rounded-sm hover:border-signal-2 hover:text-paper transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div
          className="max-w-3xl prose-blog"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Author Box */}
        <div className="max-w-3xl">
          <AuthorBox />
        </div>
      </article>

      {/* Related Posts */}
      {relatedFinal.length > 0 && (
        <section className="container-fluid py-16 md:py-20 border-t border-line">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-4">
                <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
                Weiter lesen
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance">
                Mehr aus dem Blog.
              </h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm text-paper-mute hover:text-signal-2 transition-colors"
            >
              Alle Artikel
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {relatedFinal.map((rel) => (
              <PostCard key={rel.slug} post={rel} />
            ))}
          </div>
        </section>
      )}

      <CtaBand
        title="Frage zum Artikel?"
        subtitle="Wenn etwas unklar ist oder Sie tiefer einsteigen wollen, schreiben Sie mir kurz."
      />
    </>
  )
}
