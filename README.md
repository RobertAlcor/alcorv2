# v23 — Paket-Vorauswahl + erweitertes Kontaktformular

## Überblick

3 neue Features im Kontaktformular:

1. **Paket-Vorauswahl aus /preise**: Klickt der Kunde auf der Preise-Seite z.B. „Starter anfragen", landet er im Kontaktformular mit vorausgewähltem Paket und „Preisinformation" als Thema.
2. **Themen-Dropdown** „Worum geht es?" mit 6 Optionen statt bisher 4.
3. **Bestehende Website** als optionales URL-Feld.

## Schritt 1 — Supabase-Migration ausführen

**Wichtig zuerst:** Im Supabase-Dashboard die SQL-Migration ausführen:

1. Supabase öffnen → SQL Editor → New Query
2. Inhalt von `sql/07-package-interest-migration.sql` einfügen
3. **Run**

Das fügt 2 neue Spalten zur `leads`-Tabelle hinzu (`package_interest`, `existing_website`) und einen Index.

## Schritt 2 — Files entpacken

ZIP ins Projekt-Root entpacken, alles überschreiben.

Geänderte Files:
- `src/lib/validation.ts` (Topic-Enum erweitert, neue Felder)
- `src/lib/supabase.ts` (Lead-Type erweitert)
- `src/lib/mail.ts` (TOPIC_LABEL erweitert, Templates zeigen Paket + Website)
- `src/app/api/lead/route.ts` (DB-Insert mit neuen Feldern)
- `src/components/sections/pricing-card.tsx` (Buttons mit ?paket-Links)
- `src/components/sections/kontakt-form.tsx` (URL-Param-Vorauswahl, neue Felder)

## Schritt 3 — Test lokal

```powershell
npm run type-check
npm run dev
```

**Test-Szenarien:**

1. **Direkter Aufruf**: http://localhost:3000/kontakt
   - Topic-Dropdown steht auf „Allgemeine Anfrage"
   - Paket-Dropdown ist leer
   - Kein Info-Banner

2. **Aus Preise-Seite (Starter)**: http://localhost:3000/preise → Klick auf „Starter anfragen"
   - Landet auf `/kontakt?paket=starter&thema=pricing`
   - Info-Banner oben: „Sie interessieren sich für das Paket Starter."
   - Topic vorausgewählt: „Preisinformation"
   - Paket vorausgewählt: „Starter"

3. **URL-Validation**: Bei „Bestehende Website" eine ungültige URL eingeben (z.B. „abc") → Fehlermeldung beim Absenden. Mit `https://example.com` → OK.

4. **Mail-Test**: Form ausfüllen + absenden → in der Bestätigungsmail (an dich) sollten Paket und Website-URL erscheinen.

## Schritt 4 — Deploy

```powershell
git add .
git commit -m "feat: package preselect from /preise, topic dropdown, existing website field"
git push
```

## Verhalten der URL-Parameter

| URL | Topic vorausgewählt | Paket vorausgewählt |
|-----|---------------------|---------------------|
| `/kontakt` | Allgemeine Anfrage | — |
| `/kontakt?thema=pricing` | Preisinformation | — |
| `/kontakt?paket=starter` | Preisinformation | Starter |
| `/kontakt?paket=business` | Preisinformation | Business |
| `/kontakt?paket=premium` | Preisinformation | Premium |
| `/kontakt?paket=unsure` | Preisinformation | Weiß noch nicht |
| `/kontakt?thema=relaunch` | Bestehende Website überarbeiten | — |
| `/kontakt?thema=new-website` | Neue Website | — |
| `/kontakt?thema=seo` | SEO / Sichtbarkeit | — |

Die Werte sind weiterhin änderbar — User kann z.B. die Paket-Auswahl wieder rausnehmen oder das Thema umstellen.

## Spam-Schutz unverändert

Der Honeypot `website` (versteckt) bleibt unverändert. Das neue Feld heißt `existing_website` damit es nicht kollidiert.

## CRM / Admin-Panel

Falls du im Admin-CRM die neuen Felder anzeigen willst (Paket-Interesse pro Lead), kannst du in deinem Lead-Detail-View einfach `lead.package_interest` und `lead.existing_website` ausgeben. Brauchst du Hilfe damit, schick mir die Admin-Lead-Detail-Component, dann erweitere ich die.
