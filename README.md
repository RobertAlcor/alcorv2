# v23b — Admin-CRM Bonus: Paket + Website anzeigen

## Was sich ändert

In der Lead-Liste im Admin-Bereich werden jetzt **2 zusätzliche Infos** angezeigt — sofern der Kunde sie ausgefüllt hat:

1. **Paket-Badge** neben dem Topic, z.B. `[Tag] Paket: Business` mit Akzent-Farbe
2. **Website-Link** bei den Kontakt-Links (Email, Phone, WhatsApp, **Website**)

Beides wird **nur eingeblendet wenn vorhanden** — bei Anfragen ohne Paket-Wahl bleibt die Anzeige unverändert.

## Vorbedingung

v23 muss installiert sein (SQL-Migration ausgeführt, Form erweitert). Sonst gibt es keine Daten zum Anzeigen.

## Schritt 1 — Files entpacken

ZIP entpacken und über Projekt-Root ziehen, beide Files überschreiben:

- `src/lib/lead-status.ts` (Type erweitert + LEAD_PACKAGE_LABEL)
- `src/components/admin/lead-row.tsx` (Anzeige erweitert)

## Schritt 2 — DB-Query prüfen

Wichtig: Schau dass dein DB-Query der die Leads lädt **die neuen Spalten mitlädt**.

Falls du `select('*')` verwendest, ist alles automatisch dabei — fertig.

Falls du explizit Spalten aufzählst (irgendwo in `src/app/admin/page.tsx` oder einer Server Action), musst du dort `package_interest` und `existing_website` ergänzen:

```typescript
.from('leads')
.select('id, ref_number, name, email, phone, company, topic, message, source, status, admin_notes, last_contact_at, created_at, updated_at, package_interest, existing_website')
```

## Schritt 3 — Test lokal

```powershell
npm run type-check
npm run dev
```

1. Im Admin-Panel → Tab "Anfragen"
2. Bestehende Anfragen sollten unverändert aussehen (kein Paket, keine Website-URL)
3. Neue Test-Anfrage über `/preise → Starter anfragen` einreichen → in der Anfragen-Liste sollte das Paket-Badge erscheinen
4. Anfrage über `/kontakt` mit ausgefüllter Website-URL einreichen → Website-Link sollte bei den Kontakt-Links auftauchen, klickbar in neuem Tab

## Schritt 4 — Deploy

```powershell
git add .
git commit -m "feat: admin CRM shows package interest and existing website"
git push
```

## Vorher / Nachher

**Vorher:**
```
Robert Alchimowicz · Webdesign Alcor
Allgemeine Anfrage
✉ robert@example.at  ☎ +43 …  💬 WhatsApp
```

**Nachher (Anfrage aus Preise-Seite mit ausgefüllter Website):**
```
Robert Alchimowicz · Webdesign Alcor
Preisinformation  [🏷 Paket: Business]
✉ robert@example.at  ☎ +43 …  💬 WhatsApp  🌐 alte-site.at
```
