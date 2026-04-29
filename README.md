# Auto-Update Script: SEO-Metadata anwenden

Updated automatisch alle 11 Page-Files mit der zentralen `PAGE_META`-metadata.

## Vorbedingung

Du musst zuerst v20-ZIP entpackt haben — sonst existiert `src/lib/seo-metadata.ts` nicht.

## Installation

ZIP entpacken, sodass du folgende Datei hast:

```
scripts/apply-seo-metadata.js
```

## Anwendung

Im Projekt-Root in PowerShell:

```powershell
node scripts/apply-seo-metadata.js
```

Output:
```
=== Apply SEO Metadata ===

  ✓ Updated: src/app/page.tsx → PAGE_META.home
  ✓ Updated: src/app/leistungen/page.tsx → PAGE_META.leistungen
  ✓ Updated: src/app/leistungen/website-erstellung/page.tsx → PAGE_META.websiteErstellung
  ...
  
11 updated, 0 skipped, 0 not found.
```

Backups werden als `.bak`-Files neben den Originalen gespeichert.

## Test danach

```powershell
npm run type-check
npm run dev
```

http://localhost:3000 → Tab-Title sollte „Webdesign Wien | Webagentur ohne WordPress | Webdesign Alcor" sein.

## Backup-Files löschen (wenn alles ok)

```powershell
Get-ChildItem -Recurse src/app -Filter *.bak | Remove-Item
```

## Rollback (falls was schiefgeht)

```powershell
node scripts/apply-seo-metadata.js --rollback
```

Stellt alle Original-Files aus den `.bak`-Backups wieder her.

## Was das Script kann

- ✅ Bestehende `export const metadata = {...}` Blöcke erkennen und ersetzen (auch multi-line, auch mit verschachtelten Objekten)
- ✅ Pages OHNE bestehende metadata: einfach Import + Zeile einfügen
- ✅ Pages mit `generateMetadata()` (z.B. dynamische Blog-Posts): **bleiben unverändert**
- ✅ Pages die schon updated sind: werden übersprungen (kann mehrmals laufen)
- ✅ Backup als `.bak` für Rollback
- ✅ Brace-Counting für korrekte Klammer-Erkennung

## Was das Script nicht macht

- Berührt KEINE Pages außerhalb der definierten Liste
- Berührt KEIN `src/app/admin/*` (haben noindex)
- Berührt KEIN `src/app/impressum/page.tsx` oder `datenschutz/page.tsx` (haben eigene v19-metadata)
- Berührt KEIN `[slug]`-Pages (dynamische Routen)
