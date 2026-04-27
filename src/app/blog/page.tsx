import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CtaBand } from '@/components/sections/cta-band'
import { PostCard } from '@/components/blog/post-card'
import { getAllPosts, getAllTags, slugifyTag } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Fachbeiträge zu Webentwicklung, SEO, GEO und Performance. 24 Jahre Praxis aus Wien, ehrlich aufgeschrieben.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog · Webdesign Alcor',
    description: 'Fachbeiträge aus 24 Jahren Webentwicklung in Wien.',
  },
}

export const revalidate = 3600 // 1h ISR

export default async function BlogPage() {
  const posts = await getAllPosts()
  const tags = await getAllTags()
  const [featured, ...rest] = posts

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Blog', href: '/blog' },
        ]}
      />

      <section className="container-fluid pt-12 md:pt-16 pb-12">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Blog
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-8">
            Fachbeiträge <em className="text-signal-2 italic">aus der Praxis.</em>
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-3xl leading-snug">
            24 Jahre Webentwicklung in Wien. Hier teile ich, was funktioniert
            – und was nicht.
          </p>
        </div>
      </section>

      {/* Tags Filter */}
      {tags.length > 0 && (
        <section className="container-fluid pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-paper-dim uppercase tracking-wider mr-2">
              Themen:
            </span>
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${slugifyTag(tag)}`}
                className="px-3 py-1.5 text-xs font-medium text-paper-mute bg-deep-2 border border-line rounded-full hover:border-signal-2 hover:text-paper transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Posts grid */}
      <section className="container-fluid pb-24">
        {posts.length === 0 ? (
          <p className="text-paper-mute italic">Bald folgen die ersten Artikel.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {featured && <PostCard post={featured} featured />}
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      <CtaBand
        title="Konkrete Frage zu Ihrem Projekt?"
        subtitle="Statt zu warten – im kostenfreien Erstgespräch beantworte ich Ihre Frage in 15 Minuten."
      />
    </>
  )
}
