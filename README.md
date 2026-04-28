# Punkte 5 + 2 — automatisiert

## Was machen

```powershell
cd C:\Projekte\webdesign-alcor\v2-nextjs
powershell -ExecutionPolicy Bypass -File .\add-related-pages.ps1
```

Script baut RelatedPages auf 6 Seiten ein. Idempotent.

Danach:

```powershell
npm run type-check
npm run dev
```

Wenn alles passt:

```powershell
git add .
git commit -m "feat: RelatedPages on all main pages"
git push
```

## SQL-Datei

`sql/busy-slots-snippets.sql` einfach in den Projektordner ziehen.

Wenn du Urlaub blockieren willst: passenden Block aus der SQL-Datei in Supabase SQL Editor einfügen, Daten anpassen, Run.
