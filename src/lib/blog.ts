import 'server-only'
import fs from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  dateModified?: string
  author: string
  tags: string[]
  category: string
  readingTimeMinutes: number
  content: string
  excerpt: string
  ogImage?: string
}

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog')

/**
 * Read all .mdx files from blog directory and parse frontmatter.
 * Cached for the duration of a single request.
 */
export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  let entries: string[] = []
  try {
    entries = await fs.readdir(BLOG_DIR)
  } catch {
    return []
  }

  const mdxFiles = entries.filter((f) => f.endsWith('.mdx'))
  const posts = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const fullPath = path.join(BLOG_DIR, filename)
      const raw = await fs.readFile(fullPath, 'utf-8')
      return parsePost(slug, raw)
    })
  )

  // Sort by date descending
  return posts.sort((a, b) => b.date.localeCompare(a.date))
})

export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const safeSlug = slug.replace(/[^a-z0-9-]/gi, '')
    const fullPath = path.join(BLOG_DIR, `${safeSlug}.mdx`)
    try {
      const raw = await fs.readFile(fullPath, 'utf-8')
      return parsePost(safeSlug, raw)
    } catch {
      return null
    }
  }
)

export const getAllTags = cache(async (): Promise<string[]> => {
  const posts = await getAllPosts()
  const tagSet = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort()
})

export const getPostsByTag = cache(
  async (tag: string): Promise<BlogPost[]> => {
    const posts = await getAllPosts()
    return posts.filter((p) =>
      p.tags.some((t) => slugifyTag(t) === slugifyTag(tag))
    )
  }
)

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[äöüß]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' })[c] ?? c)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Lightweight YAML frontmatter parser.
 * Supports strings, arrays, dates. No nested objects.
 */
function parseFrontmatter(raw: string): {
  data: Record<string, unknown>
  content: string
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    return { data: {}, content: raw }
  }

  const [, frontmatterBlock, content] = match
  if (!frontmatterBlock) return { data: {}, content: content ?? raw }

  const data: Record<string, unknown> = {}
  const lines = frontmatterBlock.split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) continue

    const key = trimmed.slice(0, colonIdx).trim()
    let value = trimmed.slice(colonIdx + 1).trim()

    // Array: [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
      continue
    }

    // Strip quotes
    value = value.replace(/^["']|["']$/g, '')

    data[key] = value
  }

  return { data, content: content ?? '' }
}

/**
 * Calculate reading time based on average 220 words per minute.
 * For German + technical content, slightly slower than English avg.
 */
function calcReadingTime(text: string): number {
  const words = text
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

function generateExcerpt(content: string, max = 160): string {
  const plain = content
    .replace(/^#+\s.*$/gm, '') // strip headings
    .replace(/\*\*(.+?)\*\*/g, '$1') // bold
    .replace(/\*(.+?)\*/g, '$1') // italic
    .replace(/`(.+?)`/g, '$1') // inline code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
    .replace(/^\s*[-*+]\s+/gm, '') // bullet markers
    .replace(/\n+/g, ' ')
    .trim()

  if (plain.length <= max) return plain
  const cut = plain.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return cut.slice(0, lastSpace > 0 ? lastSpace : max).trim() + '…'
}

function parsePost(slug: string, raw: string): BlogPost {
  const { data, content } = parseFrontmatter(raw)

  const title = (data.title as string) ?? slug
  const description = (data.description as string) ?? ''
  const date = (data.date as string) ?? new Date().toISOString().slice(0, 10)
  const author = (data.author as string) ?? 'Robert Alchimowicz'
  const category = (data.category as string) ?? 'Allgemein'
  const tags = Array.isArray(data.tags) ? (data.tags as string[]) : []

  return {
    slug,
    title,
    description,
    date,
    dateModified: data.dateModified as string | undefined,
    author,
    category,
    tags,
    content,
    excerpt: description || generateExcerpt(content),
    readingTimeMinutes: calcReadingTime(content),
    ogImage: data.ogImage as string | undefined,
  }
}

export function formatPostDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return new Intl.DateTimeFormat('de-AT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d)
}
