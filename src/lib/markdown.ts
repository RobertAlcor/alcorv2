import 'server-only'
import { cache } from 'react'

/**
 * Light-weight Markdown to HTML renderer.
 * Supports: headings, paragraphs, bold, italic, code (inline + block),
 * links, lists (ordered + unordered), blockquotes, hr, images.
 * Built for German blog content. No external dependencies.
 */

type Block =
  | { type: 'heading'; level: 2 | 3 | 4; text: string; id: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'code'; lang: string; code: string }
  | { type: 'hr' }
  | { type: 'callout'; variant: 'note' | 'warn' | 'tip'; text: string }

export const renderMarkdown = cache((md: string): string => {
  const blocks = tokenize(md)
  return blocks.map(renderBlock).join('\n')
})

function tokenize(md: string): Block[] {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i] ?? ''

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Code block ```
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !(lines[i] ?? '').startsWith('```')) {
        codeLines.push(lines[i] ?? '')
        i++
      }
      i++ // skip closing ```
      blocks.push({ type: 'code', lang, code: codeLines.join('\n') })
      continue
    }

    // Heading
    const headingMatch = line.match(/^(#{2,4})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1]?.length as 2 | 3 | 4
      const text = headingMatch[2] ?? ''
      blocks.push({
        type: 'heading',
        level,
        text,
        id: slugify(text),
      })
      i++
      continue
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: 'hr' })
      i++
      continue
    }

    // Callout: > [!NOTE] / [!WARN] / [!TIP]
    const calloutMatch = line.match(/^>\s*\[!(NOTE|WARN|TIP)\]\s*(.*)$/i)
    if (calloutMatch) {
      const variant = (calloutMatch[1] ?? 'NOTE').toLowerCase() as
        | 'note'
        | 'warn'
        | 'tip'
      const textLines: string[] = [calloutMatch[2] ?? '']
      i++
      while (i < lines.length && (lines[i] ?? '').startsWith('> ')) {
        textLines.push((lines[i] ?? '').replace(/^>\s?/, ''))
        i++
      }
      blocks.push({
        type: 'callout',
        variant,
        text: textLines.join(' ').trim(),
      })
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = []
      while (i < lines.length && (lines[i] ?? '').startsWith('> ')) {
        quoteLines.push((lines[i] ?? '').replace(/^>\s?/, ''))
        i++
      }
      blocks.push({ type: 'quote', text: quoteLines.join(' ') })
      continue
    }

    // Unordered list
    if (/^[-*+]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*+]\s+/.test(lines[i] ?? '')) {
        items.push((lines[i] ?? '').replace(/^[-*+]\s+/, ''))
        i++
      }
      blocks.push({ type: 'list', ordered: false, items })
      continue
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i] ?? '')) {
        items.push((lines[i] ?? '').replace(/^\d+\.\s+/, ''))
        i++
      }
      blocks.push({ type: 'list', ordered: true, items })
      continue
    }

    // Paragraph - collect until empty line or block-level
    const paraLines: string[] = []
    while (i < lines.length) {
      const cur = lines[i] ?? ''
      if (
        cur.trim() === '' ||
        cur.startsWith('#') ||
        cur.startsWith('```') ||
        cur.startsWith('> ') ||
        /^[-*+]\s+/.test(cur) ||
        /^\d+\.\s+/.test(cur) ||
        /^---+$/.test(cur.trim())
      ) {
        break
      }
      paraLines.push(cur)
      i++
    }
    if (paraLines.length > 0) {
      blocks.push({ type: 'paragraph', text: paraLines.join(' ') })
    }
  }

  return blocks
}

function renderBlock(block: Block): string {
  switch (block.type) {
    case 'heading': {
      const cls =
        block.level === 2
          ? 'font-serif text-3xl md:text-4xl text-paper mt-16 mb-6 tracking-tight scroll-mt-24'
          : block.level === 3
            ? 'font-serif text-2xl md:text-3xl text-paper mt-12 mb-4 tracking-tight scroll-mt-24'
            : 'font-sans text-base font-semibold uppercase tracking-[0.12em] text-signal-2 mt-10 mb-3 scroll-mt-24'
      return `<h${block.level} id="${block.id}" class="${cls}"><a href="#${block.id}" class="anchor-link no-underline">${escapeHtml(block.text)}</a></h${block.level}>`
    }

    case 'paragraph':
      return `<p class="text-paper-mute leading-relaxed mb-6 text-pretty">${inline(block.text)}</p>`

    case 'list': {
      const tag = block.ordered ? 'ol' : 'ul'
      const liClass = block.ordered
        ? 'text-paper-mute leading-relaxed pl-2'
        : 'text-paper-mute leading-relaxed flex items-start gap-3'
      const marker = block.ordered
        ? ''
        : '<span class="text-signal-2 mt-2.5 w-1 h-1 rounded-full bg-signal-2 shrink-0" aria-hidden="true"></span>'
      const listClass = block.ordered
        ? 'list-decimal pl-6 mb-6 space-y-2 marker:text-signal-2 marker:font-mono marker:text-sm'
        : 'mb-6 space-y-2.5'
      const items = block.items
        .map((item) => `<li class="${liClass}">${marker}<span>${inline(item)}</span></li>`)
        .join('')
      return `<${tag} class="${listClass}">${items}</${tag}>`
    }

    case 'quote':
      return `<blockquote class="my-8 pl-6 border-l-2 border-signal-2 font-serif italic text-xl md:text-2xl text-paper leading-snug">${inline(block.text)}</blockquote>`

    case 'code':
      return `<pre class="my-6 p-4 md:p-5 bg-deep-2 border border-line rounded-sm overflow-x-auto text-sm"><code class="font-mono text-paper-mute">${escapeHtml(block.code)}</code></pre>`

    case 'hr':
      return `<hr class="my-12 border-line" />`

    case 'callout': {
      const variants = {
        note: { border: 'border-signal-2', label: 'Hinweis' },
        warn: { border: 'border-amber', label: 'Achtung' },
        tip: { border: 'border-success', label: 'Tipp' },
      }
      const v = variants[block.variant]
      return `<aside class="my-8 p-5 bg-deep-2 border-l-2 ${v.border} rounded-sm"><div class="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-2 mb-2">${v.label}</div><div class="text-paper leading-relaxed">${inline(block.text)}</div></aside>`
    }
  }
}

/**
 * Inline formatting: **bold**, *italic*, `code`, [text](url)
 */
function inline(text: string): string {
  let s = escapeHtml(text)

  // Inline code (must be first to protect content)
  s = s.replace(
    /`([^`]+)`/g,
    '<code class="font-mono text-[0.9em] px-1.5 py-0.5 bg-deep-2 border border-line rounded-sm text-paper">$1</code>'
  )

  // Bold
  s = s.replace(
    /\*\*([^*]+)\*\*/g,
    '<strong class="text-paper font-semibold">$1</strong>'
  )

  // Italic (single asterisk, not part of bold)
  s = s.replace(
    /(^|[^*])\*([^*\s][^*]*[^*\s]|\S)\*([^*]|$)/g,
    '$1<em class="italic">$2</em>$3'
  )

  // Links [text](url)
  s = s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, text: string, url: string) => {
      const isExternal = /^https?:\/\//.test(url) && !url.includes('webdesign-alcor.at')
      const attrs = isExternal
        ? ' target="_blank" rel="noopener"'
        : ''
      return `<a href="${url}"${attrs} class="text-signal-2 hover:underline underline-offset-4 decoration-signal-2/40">${text}</a>`
    }
  )

  return s
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[äöüß]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' })[c] ?? c)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
