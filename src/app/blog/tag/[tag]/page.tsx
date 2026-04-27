import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CtaBand } from '@/components/sections/cta-band'
import { PostCard } from '@/components/blog/post-card'
import { getAllTags, getPostsByTag, slugifyTag } from '@/lib/blog'

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({ tag: slugifyTag(tag) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const posts = await getPostsByTag(tag)
  const displayTag = posts[0]?.tags.find((t) => slugifyTag(t) === tag) ?? tag

  return {
    title: `Beiträge zum Thema ${displayTag}`,
    description: `Alle Blog-Artikel zum Thema ${displayTag}. Aus 24 Jahren Webentwicklung in Wien.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  }
}

export const revalidate = 3600

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const posts = await getPostsByTag(tag)
  if (posts.length === 0) notFound()

  const displayTag = posts[0]?.tags.find((t) => slugifyTag(t) === tag) ?? tag

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: displayTag, href: `/blog/tag/${tag}` },
        ]}
      />

      <section className="container-fluid pt-12 md:pt-16 pb-12">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Thema
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-8">
            {displayTag}
          </h1>
          <p className="text-paper-mute leading-relaxed max-w-2xl">
            {posts.length} {posts.length === 1 ? 'Artikel' : 'Artikel'} zum Thema {displayTag}.{' '}
            <Link href="/blog" className="text-signal-2 hover:underline">
              Alle Beiträge ansehen
            </Link>
          </p>
        </div>
      </section>

      <section className="container-fluid pb-24">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
