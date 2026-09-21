# Update webdesign-alcor.at (Next.js bleibt, Supabase/Resend/Vercel bleiben)

Stand: 21.09.2026 · geprüft mit `tsc --noEmit` und `next build` (Next 15.5) – beides fehlerfrei; alle neuen Seiten, Bilder, Weiterleitungen und die Sitemap im Produktionsmodus getestet.

## So spielst du es ein

1. Den Inhalt dieses Ordners in deinen lokalen Repo-Ordner `alcorv2` kopieren und **vorhandene Dateien ersetzen** (die Ordnerstruktur ist identisch). Diese Datei `AENDERUNGEN.md` musst du nicht mitkopieren.
2. Im Repo-Ordner:

```
git add -A
git commit -m "Neue Referenzen, 4 Blogartikel, SEO- und Rechtskorrekturen"
git push
```

3. Vercel baut automatisch. Danach kurz prüfen: `/referenzen`, `/blog`, `/sitemap.xml`.
4. Search Console: Sitemap neu einreichen, die 3 neuen Referenzen und 4 neuen Artikel zur Indexierung anmelden.

An Supabase, Resend, Vercel, Umgebungsvariablen und `package.json` wurde nichts geändert.

## Was geändert wurde

**Referenzen** (`src/lib/cases.ts`, `public/referenzen/`, `case-mockup.tsx`, `referenzen/page.tsx`)
- Neu: Psychotherapie Hrdlicka, Umzugsmeister, AlcorLeads. Reihenfolge: Kundenprojekte zuerst.
- „Büro-Reinigung“ beschreibt jetzt Takt, so wie es auf reinigung.webdesign-alcor.at steht (QR-Code statt GPS). URL unverändert.
- Echte Screenshots statt Farbflächen. Für Umzugsmeister fehlt noch einer: Datei `public/referenzen/umzugsmeister.webp` (1200×750) ablegen und in `cases.ts` beim Eintrag `umzugsmeister` die Zeile `"screenshot": "/referenzen/umzugsmeister.webp",` ergänzen. Ohne Datei bleibt das Farb-Mockup.
- Unbelegte Kennzahlen (+340 %, −65 %, 2→8 Mitarbeiter, Lighthouse 100) durch nachprüfbare Eckdaten ersetzt. Das Bestereimer-Zitat ist unverändert geblieben.
- `sitemap.ts` liest die Referenzen jetzt automatisch aus `cases.ts` (vorher fest verdrahtet – neue Cases hätten gefehlt).

**Blog** (`src/content/blog/`)
- Neu: `homepage-erstellen-lassen-wien`, `website-relaunch-2026` (beides alte Adressen, die bisher ins Leere weiterleiteten), `google-unternehmensprofil-wien`, `website-fuer-handwerker-wien`.
- Kosten-Artikel: Abschnitt „Reale Beispiele“ nennt Richtwerte statt identifizierbarer Kundenpreise.
- Neuen Artikel anlegen = neue `.mdx`-Datei mit demselben Kopf (title, description, date, author, category, tags). Sitemap, Feed und Tag-Seiten entstehen automatisch.

**SEO**
- Startseiten-H1 enthält „Webdesign Wien · handgeschrieben seit 2014“.
- Leistungsseiten: H1 mit Suchbegriff, je 5–6 Fragen mit FAQ-Schema (`services.ts`, `service-detail-layout.tsx`).
- `next.config.ts`: drei Weiterleitungen zeigten auf Seiten, die es nie gab (404) – repariert, auch für die bereits gecrawlten Zwischenadressen.
- Einheitlich „seit 2014 / über zehn Jahre“ statt teils „2002 / 24 Jahre“.
- `llms.txt`: Referenzen ergänzt, Adressen ohne www (wie Canonical).

**Keine Links mehr zu website-erstellen.wien und webdesign-liesing.wien** (`site.ts`, `bezirke.ts`): Footer, Bezirksseite Liesing, Meta-Description.

**Recht**
- Impressum: Offenlegung nach § 25 MedienG ergänzt, Link zur eingestellten EU-OS-Plattform entfernt.
- Datenschutz: TKG 2021 statt TKG 2003, Stand-Datum.
- Preise: „keine USt.“ statt „netto“ (Kleinunternehmer).
- FAQ: „Erfolgsquote 99 Prozent“ entfernt. Tools: alter „Lead-Generator“ entfernt (AlcorLeads ist jetzt Referenz).
