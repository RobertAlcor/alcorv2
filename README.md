# v17 — Cookie-Banner DSGVO-konform

## Schritt 1 — Files entpacken

ZIP entpacken, Inhalt über Projekt-Ordner ziehen, bestehende überschreiben.

Geänderte / neue Files:
- `src/lib/consent.ts` (neu)
- `src/components/consent/*` (neu, 5 Dateien)
- `src/components/analytics/google-analytics.tsx` (überschreibt aktuelle, jetzt mit Consent-Mode)

## Schritt 2 — `src/app/layout.tsx` anpassen

**Import oben ergänzen:**
```tsx
import { ConsentMount } from '@/components/consent/consent-mount'
```

**Im `<body>`-Block:** den bestehenden `<GoogleAnalytics />` Aufruf **innerhalb** von `<ConsentMount>` packen, plus alle weiteren Inhalte. Beispiel:

```tsx
<body className="...">
  <ConsentMount>
    <GoogleAnalytics />
    {/* alles andere wie Header, children, Footer */}
    {children}
  </ConsentMount>
</body>
```

Wichtig: `<ConsentMount>` muss um `<GoogleAnalytics />` UND um die Page-Inhalte herum sein, weil GA den `useConsent`-Hook braucht.

## Schritt 3 — Test lokal

```powershell
npm run type-check
npm run dev
```

http://localhost:3000 öffnen:
- Banner taucht unten auf
- "Alle akzeptieren" / "Nur notwendige" / "Einstellungen" testen
- Nach Wahl: Banner verschwindet, Cookie-Button unten links erscheint
- Klick auf Cookie-Button → Modal mit Toggles
- Wahl ändern → speichert in localStorage

In DevTools → Application → Local Storage:
- Key `alcor-consent-v1` zeigt deine Wahl

GA tracked nur wenn:
1. Production-Build (`npm run build && npm start`)
2. UND `statistics: true` im Consent

## Schritt 4 — Deploy

```powershell
git add .
git commit -m "feat: GDPR cookie consent with Google Consent Mode v2"
git push
```

## Hinweise

- **Datenschutzerklärung muss noch überarbeitet werden** mit Hinweis auf Cookie-Banner (Paket 4).
- Der Banner taucht 1 Jahr nach Wahl wieder auf (auto-Renewal-Reminder).
- Wenn du das Schema änderst (z.B. neue Kategorie "Marketing" tatsächlich aktiv): in `consent.ts` `CONSENT_VERSION` erhöhen → alle User bekommen Banner nochmal.
