# v16 — Manuelle Termine/Leads + Busy-Slots UI + Working-Hours UI

## Schritt 1 — Files entpacken

ZIP entpacken, Inhalt über Projekt-Ordner ziehen, bestehende überschreiben.

Überschriebene Files:
- `src/lib/booking.ts` (abwärtskompatibel - nur optionale Parameter ergänzt)
- `src/app/api/booking/route.ts` (lädt Working-Hours aus DB)
- `src/components/admin/admin-shell.tsx` (5. Tab: Einstellungen)
- `src/components/admin/bookings-view.tsx` (+ Termin-Button)
- `src/components/admin/leads-view.tsx` (+ Anfrage-Button)

## Schritt 2 — DB-Migration

Supabase → SQL Editor → New query → Inhalt von `sql/05-settings-migration.sql` einfügen → Run.

## Schritt 3 — Test lokal

```powershell
npm run type-check
npm run dev
```

http://localhost:3000/admin → 5. Tab "Einstellungen" testen:
- Arbeitszeiten ändern, speichern
- Blockierung anlegen (Einzeltag oder Zeitraum)
- Blockierung löschen

In Tab "Termine":
- + Termin anlegen → Modal → Termin erstellen → erscheint in "Bestätigt"

In Tab "Anfragen":
- + Anfrage anlegen → Modal → Lead erstellen → erscheint in Liste

## Schritt 4 — Deployen

```powershell
git add .
git commit -m "feat: manual booking/lead, busy-slots UI, working-hours settings"
git push
```
