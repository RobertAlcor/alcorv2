# Sprint 3 – Blog-System komplett

## Was du manuell machst

### 1. ZIP entpacken
Im Projektordner `C:\Projekte\webdesign-alcor\v2-nextjs\` entpacken.

**Wird ÜBERSCHRIEBEN:**
- `src/app/blog/page.tsx` (alter Coming-Soon-Stub → echter Blog-Index)
- `src/app/globals.css` (mit prose-blog Klassen für Artikel-Content)
- `src/app/sitemap.ts` (mit dynamischen Blog-URLs)

**Wird NEU angelegt:**
- `src/app/blog/[slug]/page.tsx` – Artikel-Seite
- `src/app/blog/tag/[tag]/page.tsx` – Tag-Filter
- `src/app/feed.xml/route.ts` – RSS-Feed
- `src/components/blog/post-card.tsx`
- `src/components/blog/author-box.tsx`
- `src/components/blog/reading-progress.tsx`
- `src/lib/blog.ts` – MDX-Parser
- `src/lib/markdown.ts` – Markdown→HTML Renderer
- `src/content/blog/wordpress-oder-handcodiert-2026.mdx`
- `src/content/blog/website-kosten-wien-2026.mdx`
- `src/content/blog/handgeschriebener-code-erklaert.mdx`

### 2. Dev-Server neustarten

```powershell
# Strg+C im Terminal, dann
npm run dev
```

**Kein neues npm install nötig** – server-only ist bereits in Next.js drin, kein extra Package.

### 3. Browser-Tests

| URL | Was zu sehen |
|-----|--------------|
| `/blog` | 3 Artikel, oberster ist Featured |
| `/blog/wordpress-oder-handcodiert-2026` | Vollständiger Artikel |
| `/blog/website-kosten-wien-2026` | Vollständiger Artikel |
| `/blog/handgeschriebener-code-erklaert` | Vollständiger Artikel |
| `/blog/tag/performance` | Filtert nach Tag |
| `/feed.xml` | RSS-Feed im XML-Format |
| `/sitemap.xml` | Enthält jetzt alle Blog-URLs |

### 4. Beim Lesen testen
- **Reading Progress Bar** oben am Bildschirm wird beim Scrollen blau
- **Anchor-Links auf Headings**: Maus auf eine H2 → vor der Überschrift erscheint ein `#`
- **Related Posts** unter jedem Artikel
- **Author-Box** am Ende
- **Tag-Klicks** im Artikel führen zur Tag-Seite

### 5. Git commit

```powershell
git add .
git commit -m "feat: sprint 3 - blog system with MDX, 3 articles, RSS, tags"
git push
```

## Was die Architektur kann

### MDX-Files schreiben

Neuer Artikel = neue `.mdx` Datei in `src/content/blog/`. Pflicht-Frontmatter:

```yaml
---
title: Mein Artikel-Titel
description: Kurzer SEO-Description-Text
date: 2026-05-01
author: Robert Alchimowicz
category: Strategie
tags: [WordPress, Performance]
---

# H2 Überschrift

Normaler Text mit **bold** und *italic*.

[Link-Text](https://example.com)

> Ein normales Zitat.

> [!TIP] Mein Rat
> Ein Hinweis-Box mit Tipp-Variante.

> [!NOTE] Hinweis  
> Ein Hinweis-Box mit Note-Variante.

> [!WARN] Vorsicht
> Ein Warnung mit Warn-Variante.

- Liste Punkt 1
- Liste Punkt 2

1. Nummerierte Liste
2. Funktioniert auch

```code
function example() {}
```
```

Speichern → automatisch im Blog sichtbar (kein Re-Build nötig im Dev-Modus).

### Markdown-Features die unterstützt werden

- Überschriften: `## H2`, `### H3`, `#### H4` mit automatischen Anchor-Links
- Bold: `**text**`
- Italic: `*text*`
- Inline Code: `` `code` ``
- Code-Blöcke mit `~~~lang ... ~~~` (3 Backticks)
- Links: `[text](url)` (externe automatisch mit `target="_blank"`)
- Listen: `- item` oder `1. item`
- Zitate: `> text`
- Callouts: `> [!NOTE]`, `> [!WARN]`, `> [!TIP]`
- Horizontaler Trenner: `---`

### Was bewusst nicht drin ist

- **Bilder im Artikel**: kommt in einem späteren Sprint mit `next/image`-Integration
- **Syntax-Highlighting** für Code: kommt mit Shiki, falls du das brauchst
- **Kommentare**: bewusst nicht (Spam-Magnet, DSGVO-Komplexität)
- **Newsletter-Anmeldung**: kommt im Launch-Sprint

### Schema.org

Jeder Artikel hat:
- `BlogPosting` Schema (Author, Datum, Wortanzahl, Tags)
- `BreadcrumbList` Schema
- Open Graph + Twitter Cards Metadata

Das ist optimal für SEO und GEO (ChatGPT, Perplexity, Google AI Overviews).

## Was als nächstes ansteht (Sprint 4)

- Migration der 5 alten Blog-Artikel von webdesign-alcor.at
- Echte Fotos für About-Seite
- 2 weitere neue Artikel
- Lighthouse-Optimierung auf 100/100/100/100
- Final Polish vor Launch
