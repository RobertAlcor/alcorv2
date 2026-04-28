'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string // ISO
  tags: readonly string[]
  readingMinutes: number
}

const POSTS_PER_PAGE = 9

export function BlogFilter({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  // Alle einzigartigen Tags
  const allTags = useMemo(() => {
    const set = new Set<string>()
    for (const p of posts) for (const t of p.tags) set.add(t)
    return Array.from(set).sort()
  }, [posts])

  // Gefilterte Posts
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return posts.filter((p) => {
      if (activeTag && !p.tags.includes(activeTag)) return false
      if (!term) return true
      return (
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
      )
    })
  }, [posts, search, activeTag])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * POSTS_PER_PAGE
  const visiblePosts = filtered.slice(start, start + POSTS_PER_PAGE)

  const hasFilter = search.length > 0 || activeTag !== null
  const reset = () => {
    setSearch('')
    setActiveTag(null)
    setPage(1)
  }

  // Reset to page 1 when filter changes
  function updateSearch(value: string) {
    setSearch(value)
    setPage(1)
  }
  function updateTag(tag: string | null) {
    setActiveTag(tag)
    setPage(1)
  }

  return (
    <div>
      {/* Filter Bar */}
      <div className="mb-10 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper-dim"
            strokeWidth={1.75}
            aria-hidden
          />
          <label htmlFor="blog-search" className="sr-only">
            Beiträge durchsuchen
          </label>
          <input
            id="blog-search"
            type="search"
            placeholder="Beiträge durchsuchen …"
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
            className="w-full min-h-[44px] pl-11 pr-4 py-3 bg-deep-2 border border-line rounded-sm text-paper placeholder:text-paper-dim focus:border-signal-2 focus:outline-none transition-colors"
          />
        </div>

        {/* Tag-Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[0.7rem] font-mono uppercase tracking-wider text-paper-dim mr-2">
            Tags:
          </span>
          <button
            type="button"
            onClick={() => updateTag(null)}
            className={`min-h-[36px] px-3 py-1.5 text-xs rounded-sm border transition-colors ${
              activeTag === null
                ? 'bg-signal text-deep border-signal'
                : 'bg-deep-2 text-paper-mute border-line hover:border-paper-mute'
            }`}
          >
            Alle ({posts.length})
          </button>
          {allTags.map((tag) => {
            const count = posts.filter((p) => p.tags.includes(tag)).length
            const isActive = activeTag === tag
            return (
              <button
                key={tag}
                type="button"
                onClick={() => updateTag(isActive ? null : tag)}
                className={`min-h-[36px] px-3 py-1.5 text-xs rounded-sm border transition-colors ${
                  isActive
                    ? 'bg-signal text-deep border-signal'
                    : 'bg-deep-2 text-paper-mute border-line hover:border-paper-mute'
                }`}
              >
                {tag} <span className="opacity-60">({count})</span>
              </button>
            )
          })}
          {hasFilter && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 text-xs text-paper-dim hover:text-paper transition-colors"
              aria-label="Filter zurücksetzen"
            >
              <X className="w-3 h-3" strokeWidth={2} />
              Filter zurücksetzen
            </button>
          )}
        </div>

        {/* Result count */}
        <p className="text-sm text-paper-dim">
          {filtered.length === 0
            ? 'Keine Beiträge gefunden'
            : filtered.length === 1
              ? '1 Beitrag gefunden'
              : `${filtered.length} Beiträge gefunden`}
        </p>
      </div>

      {/* Posts Grid */}
      {visiblePosts.length === 0 ? (
        <div className="text-center py-16 bg-deep-2 border border-line rounded-sm">
          <p className="text-paper-mute mb-4">
            Keine Beiträge passen zu Ihrer Suche.
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-signal-2 text-sm hover:underline"
          >
            Filter zurücksetzen
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visiblePosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="mt-12 flex items-center justify-center gap-2"
          aria-label="Seitennavigation"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="min-h-[44px] min-w-[44px] px-4 py-2 text-sm bg-deep-2 border border-line rounded-sm text-paper-mute hover:text-paper hover:border-paper-mute disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Zurück
          </button>
          <span className="px-4 text-sm text-paper-mute font-mono">
            Seite {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="min-h-[44px] min-w-[44px] px-4 py-2 text-sm bg-deep-2 border border-line rounded-sm text-paper-mute hover:text-paper hover:border-paper-mute disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Weiter →
          </button>
        </nav>
      )}
    </div>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col bg-deep-2 border border-line rounded-sm overflow-hidden hover:border-signal-2/40 transition-all">
      <Link href={`/blog/${post.slug}`} className="flex-1 flex flex-col p-7">
        <div className="flex items-center gap-3 mb-4 text-[0.7rem] font-mono uppercase tracking-wider text-paper-dim">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('de-AT', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>·</span>
          <span>{post.readingMinutes} Min</span>
        </div>
        <h3 className="font-serif text-xl md:text-2xl text-paper mb-3 leading-tight group-hover:text-signal-2 transition-colors">
          {post.title}
        </h3>
        <p className="text-paper-mute text-sm leading-relaxed line-clamp-3 mb-5">
          {post.description}
        </p>
        <div className="mt-auto pt-4 border-t border-line flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[0.65rem] font-mono uppercase tracking-wider text-paper-mute bg-deep border border-line rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  )
}
