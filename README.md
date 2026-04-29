# v19 — Impressum + Datenschutzerklärung

## Schritt 1 — Files entpacken

ZIP entpacken, Inhalt über Projekt-Ordner ziehen, bestehende überschreiben (falls vorhanden).

Neue / geänderte Files:
- `src/app/impressum/page.tsx`
- `src/app/datenschutz/page.tsx`
- `src/components/legal/legal-page-layout.tsx`
- `src/components/legal/legal-typography.tsx`
- `src/components/legal/cookie-settings-link.tsx`

## Schritt 2 — Test lokal

```powershell
npm run type-check
npm run dev
```

Im Browser:
- http://localhost:3000/impressum
- http://localhost:3000/datenschutz
- Auf der Datenschutz-Seite: Klick auf "Cookie-Einstellungen ändern" → Modal öffnet sich

## Schritt 3 — Inhalte prüfen / anpassen

**Im Impressum (`src/app/impressum/page.tsx`)** Platzhalter ersetzen sobald verfügbar:

- **GISA-Zahl**: aktuell "wird ergänzt" — sobald vorhanden ersetzen
- **UID-Nummer**: aktuell "Kleinunternehmer gemäß § 6 Abs. 1 Z 27 UStG" — bleibt so solange du Kleinunternehmer bist; falls du UID bekommst, ersetzen mit "ATU…"
- **WKO-Mitgliedschaft**: noch nicht eingetragen — sobald Mitglied, ergänzen (z.B. "WKO Wien · Fachgruppe UBIT")

Wenn du z.B. UID bekommst, die Datei `src/app/impressum/page.tsx` öffnen, im Bereich `Rechtsform & Register` den `<DefList>` anpassen.

## Schritt 4 — Deploy

```powershell
git add .
git commit -m "feat: GDPR-compliant impressum and privacy policy"
git push
```

## Wichtig — vor Domain-Switch

Sobald `webdesign-alcor.at` auf Vercel zeigt:

1. **GISA + UID müssen drin sein** (sonst Abmahn-Risiko)
2. **WKO-Mitgliedschaft** muss eingetragen sein wenn vorhanden
3. **Stand-Datum** in beiden Pages aktualisieren (aktuell: 29. April 2026)

## Hinweise zu Tools

Die Datenschutzerklärung deckt aktuell ab:
- Vercel (Hosting)
- Supabase (DB Frankfurt EU)
- Resend (Mails Irland EU)
- Bunny Fonts (Schriften, GDPR-konform)
- Google Analytics (mit Consent-Mode)
- Server-Logs (technisch notwendig)

Wenn du später weitere Tools einbaust (z.B. Newsletter, Chat-Widget, SevDesk-Embed), müssen diese ergänzt werden.
