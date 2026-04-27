import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'
import { formatPostDate } from '@/lib/blog'

export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article
      className={`group bg-deep-2 border border-line rounded-sm transition-all duration-300 hover:border-signal-2/40 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block p-7 md:p-8 h-full">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="font-mono text-[0.7rem] text-signal-2 uppercase tracking-wider">
            {post.category}
          </span>
          <span className="font-mono text-[0.7rem] text-paper-dim">
            {post.readingTimeMinutes} min
          </span>
        </div>

        <h2
          className={`font-serif text-paper text-balance leading-tight mb-3 transition-colors group-hover:text-signal-2 ${
            featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-2xl'
          }`}
        >
          {post.title}
        </h2>

        <p className="text-paper-mute leading-relaxed text-pretty mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-line">
          <time
            dateTime={post.date}
            className="text-xs text-paper-dim"
          >
            {formatPostDate(post.date)}
          </time>
          <span className="inline-flex items-center gap-1.5 text-xs text-paper-mute group-hover:text-signal-2 group-hover:translate-x-0.5 transition-all">
            Lesen
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
}
