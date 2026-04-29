# v15 — Admin-CRM + Google Analytics

## Schritt 1 — Files entpacken

ZIP entpacken, Inhalt über deinen Projekt-Ordner ziehen. Bestehende Dateien überschreiben (`booking-row.tsx`, `admin/page.tsx`).

## Schritt 2 — DB-Migration

Supabase → SQL Editor → New query → Inhalt von `sql/04-crm-migration.sql` einfügen → Run.

## Schritt 3 — Google Analytics in Layout einbauen

Datei `src/app/layout.tsx` öffnen.

**Import oben ergänzen:**
```tsx
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
```

**In den `<body>`-Block** (am Ende, nach `<Footer />` oder `{children}`):
```tsx
<GoogleAnalytics />
```

## Schritt 4 — Test lokal

```powershell
npm run type-check
npm run dev
```

http://localhost:3000/admin/login → einloggen → 4 Tabs sehen:
- Übersicht
- Termine
- Anfragen
- Kunden

## Schritt 5 — Deployen

```powershell
git add .
git commit -m "feat: admin CRM panel + Google Analytics"
git push
```

Vercel deployt automatisch.

GA tracked **nur in Production** (nicht lokal) — auf Live-Site nach 24h erste Daten in Google Analytics.
