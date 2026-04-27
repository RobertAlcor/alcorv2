# Webdesign Alcor – v2.0

Next.js 15 Relaunch von webdesign-alcor.at.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind v4 · Supabase · Resend · Vercel

---

## Setup (lokal, einmalig)

```bash
# 1. Dependencies installieren
npm install

# 2. Environment Variables
cp .env.example .env.local
# Werte eintragen (siehe unten)

# 3. Dev-Server
npm run dev
# läuft auf http://localhost:3000
```

### Environment Variables besorgen

**Supabase** (das schmerzfrei.wien-Projekt NICHT wiederverwenden – neues Projekt anlegen):

1. Auf https://supabase.com → New Project
2. Name: `webdesign-alcor`, Region: `Central EU (Frankfurt)`
3. Settings → API → kopieren:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` (geheim!) → `SUPABASE_SERVICE_ROLE_KEY`
4. SQL Editor → Inhalt von `supabase/migrations/20260427000001_create_leads.sql` ausführen

**Resend:**
1. https://resend.com → API Keys → Create
2. Domain `webdesign-alcor.at` verifizieren (DNS-Records bei Cloudflare einfügen)
3. `RESEND_API_KEY` und `RESEND_FROM_EMAIL` setzen

---

## Verfügbare Scripts

```bash
npm run dev          # Dev-Server mit Turbopack
npm run build        # Production-Build
npm run start        # Production-Server lokal
npm run lint         # ESLint
npm run type-check   # TypeScript-Check ohne Emit
npm run format       # Prettier formatiert alles
```

---

## Deployment (Vercel + Cloudflare)

### Erstmaliges Deployment auf Subdomain

```bash
# 1. Vercel CLI installieren (einmalig)
npm i -g vercel

# 2. Im Projekt-Root
vercel

# 3. Folgen: Link zu neuem Projekt "webdesign-alcor"
```

Im Vercel-Dashboard:
1. Settings → Environment Variables → alle aus `.env.example` setzen (Production + Preview)
2. Settings → Domains → `v2.webdesign-alcor.at` hinzufügen
3. Cloudflare DNS: CNAME `v2` → `cname.vercel-dns.com`

### Production-Cutover (Tag X)

Wenn die Seite fertig ist und du live gehen willst:

1. In Vercel: Production-Domain auf `webdesign-alcor.at` und `www.webdesign-alcor.at` umlegen
2. Cloudflare DNS aktualisieren (A-Record / CNAME auf Vercel)
3. Aktuellen Coming-Soon-Hosting-Vertrag kündigen (oder Files löschen)
4. Google Search Console: Property neu validieren, Sitemap einreichen
5. Backlink-Stichprobe: Funktionieren alte URLs via 301?

---

## Projekt-Struktur

```
src/
├── app/                    Next.js App Router
│   ├── api/lead/          Lead-Submission Endpoint
│   ├── kontakt/           Kontakt-Seite
│   ├── leistungen/        (Sprint 2)
│   ├── referenzen/        (Sprint 2)
│   ├── blog/              (Sprint 3)
│   ├── layout.tsx         Root Layout
│   ├── page.tsx           Home
│   ├── globals.css        Tailwind + Design Tokens
│   ├── sitemap.ts         XML Sitemap
│   └── robots.ts          Robots.txt
│
├── components/
│   ├── layout/            Header, Footer
│   ├── sections/          Page-spezifische Sektionen (Hero, etc.)
│   └── ui/                Reusable Primitives (Sprint 2)
│
├── lib/
│   ├── site.ts            Brand-Konstanten (Single Source of Truth)
│   ├── schema.ts          Schema.org JSON-LD Builder
│   ├── supabase.ts        DB Client
│   ├── mail.ts            Resend Templates
│   ├── validation.ts      Zod Schemas
│   └── utils.ts           cn-Helper
│
└── content/
    └── blog/              MDX-Files (Sprint 3)

public/
├── llms.txt               AI-Crawler-Hinweise
├── favicon.svg            Brand-Mark
└── og-default.jpg         Default Social-Card (TODO: Foto)

supabase/
└── migrations/            DB-Schema

```

---

## Sprint-Status

- ✅ **Sprint 1** – Foundation, Hero, Kontakt-Form, Backend
- ⏳ **Sprint 2** – Leistungen, Referenzen, Über mich, Preise
- ⏳ **Sprint 3** – Blog mit MDX, Migration alter Artikel
- ⏳ **Sprint 4** – Polish, Lighthouse 100, Launch

---

## Wichtige Konventionen

- **Server Components** sind Default. `'use client'` nur wenn State/Effects/Handler nötig.
- **Brand-Konstanten** kommen aus `src/lib/site.ts` – nicht hardcoden.
- **Schema.org** für jede neue Seite via `src/lib/schema.ts` ergänzen.
- **Bilder** immer via `next/image` mit `width` und `height`.
- **Links intern** immer mit `next/link`.

---

## Troubleshooting

**Build schlägt fehl mit "Missing env vars":**
→ `.env.local` prüfen oder Vercel Env Vars setzen.

**Tailwind-Klassen fehlen / werden nicht angewendet:**
→ Tailwind v4 ist CSS-First. Tokens stehen in `globals.css` unter `@theme`. Server neu starten.

**Mails kommen nicht an:**
→ Resend Dashboard → Logs prüfen. Domain verifiziert? DNS-Records richtig?

---

© 2002–2026 Alcor Group · Robert Alchimowicz
