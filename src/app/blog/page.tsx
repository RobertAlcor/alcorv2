import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CtaBand } from '@/components/sections/cta-band'
import { BlogFilter, type BlogPost } from '@/components/blog/blog-filter'
import { getAllPosts } from '@/lib/blog'
import { RelatedPages } from '@/components/sections/related-pages'
import { RELATED_FOR } from '@/lib/related-pages'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artikel zu Webentwicklung, SEO, Performance und der Werkstatt-Realität als Solo-Webdesigner in Wien. Durchsuchbar, nach Tags filterbar.',
  alternates: { canonical: '/blog' },
}

export const revalidate = 3600 // 1h ISR

export default async function BlogPage() {
  const posts = await getAllPosts()

  // Map to BlogPost type for client component
  const clientPosts: BlogPost[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    tags: p.tags,
    readingMinutes: p.readingTimeMinutes,
  }))

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Blog', href: '/blog' },
        ]}
      />

      <section className="container-fluid pt-12 pb-12 md:pt-16">
        <div className="max-w-4xl">
          <p className="text-signal-2 mb-6 text-xs font-semibold tracking-[0.18em] uppercase">
            <span className="bg-signal-2 mr-3 inline-block h-px w-8 align-middle" />
            Blog
          </p>
          <h1 className="mb-8 font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance">
            Werkstatt. <em className="text-signal-2 italic">Notizen.</em>
          </h1>
          <p className="text-paper-mute max-w-3xl font-serif text-xl leading-snug italic md:text-2xl">
            Artikel zu Webentwicklung, SEO und der Realität als Solo-Werkstatt. Praktisch,
            ehrlich, nicht für Klicks optimiert.
          </p>
        </div>
      </section>

      <section className="container-fluid pb-24">
        <BlogFilter posts={clientPosts} />
      </section>

      <CtaBand
        title="Etwas konkret besprechen?"
        subtitle="Theorie ist gut – aber das eigentliche Gespräch über Ihr Projekt findet zwischen uns statt. 15 Minuten reichen meist."
      />
      <RelatedPages pages={RELATED_FOR.blog} />

    </>
  )
}
