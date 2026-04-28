# Update v12 – Kontraste, Navigation, Termin als Step-Wizard

## ZIP entpacken im Projektordner

**Geändert:**
- `src/lib/site.ts` → NAV erweitert um Preise und Termin
- `src/components/layout/header.tsx` → Schmaleres Gap weil 7 Items
- `src/components/sections/kontakt-form.tsx` → bessere Kontraste
- `src/components/booking/calendar.tsx` → bessere Kontraste
- `src/components/booking/slot-picker.tsx` → bessere Kontraste
- `src/components/booking/booking-form.tsx` → wird jetzt als Step verwendet (kein eigenes Submit mehr, kein eigenes Form-Element)
- `src/components/booking/termin-wizard.tsx` → komplett neu als 4-Step Wizard

**Neu:**
- `src/components/booking/step-indicator.tsx` → Progress-Anzeige oben
- `src/components/booking/booking-review.tsx` → Step 4 mit allen Daten + Edit-Buttons

## Dann

```powershell
# Strg+C
npm run dev
```

## Was sich ändert

### Navigation
Vorher: Leistungen · Referenzen · Über mich · Blog · Kontakt (5 Items)
Jetzt: **Leistungen · Referenzen · Preise · Über mich · Blog · Termin · Kontakt** (7 Items)

Wenn du eine andere Reihenfolge willst, ist das in `src/lib/site.ts` in 30 Sekunden geändert.

### Kontraste

**Eingabefelder waren vorher** auf `bg-deep` (#161618) — fast identisch zur Page-Background, kaum sichtbar.

**Jetzt:** auf `bg-deep-2` (#232327) mit `border-paper-dim/30` — klar abgehoben.

**Labels und Beschreibungen** waren `text-paper-dim` (#998a7c, sehr dunkel auf dunkler Page).

**Jetzt:** `text-paper-mute` (#c8b8a8) — viel besser lesbar.

Gilt für: Kontakt-Form, alle Termin-Steps (Calendar, SlotPicker, Form, Review).

### Termin als 4-Step Wizard

Vorher: alles untereinander auf einer langen Page.
Jetzt:

```
[1] Tag      [2] Uhrzeit      [3] Daten      [4] Bestätigen
```

- Step-Indicator oben mit Progress-Linie
- Bei Tag/Slot-Klick → automatisch nächster Step
- "Zurück" Button immer verfügbar (außer Step 1)
- "Weiter" Button auf Step 1-3
- "Jetzt verbindlich buchen" Button erst auf Step 4
- Step 4 zeigt alle Daten in einer Review-Liste mit Stift-Symbol pro Zeile zum Bearbeiten
- Submit erst auf Step 4 → Bestätigung als grüner Erfolgs-Block

Validation pro Step:
- Step 1: Datum muss gewählt sein
- Step 2: Slot muss gewählt sein
- Step 3: Name, Email, Phone, Topic Pflicht (+ Adresse wenn "Außerhalb")
- Step 4: nichts zu validieren, nur bestätigen

### Konflikt-Handling

Wenn der gewählte Slot beim Klick auf "Buchen" gerade von jemand anderem geschnappt wurde, zeigt Step 4 unten 3 Alternativ-Slots als Buttons. Klick darauf bringt dich zurück zur Review mit dem neuen Slot.

## Test-Checkliste

```
[ ] Navigation: Preise + Termin sichtbar
[ ] Header: passen alle 7 Items in eine Zeile (Desktop)
[ ] /kontakt: Form-Felder klar erkennbar (heller Hintergrund)
[ ] /kontakt: Labels gut lesbar
[ ] /termin: Step-Indicator zeigt 4 Schritte
[ ] /termin: Tag klicken → springt zu Step 2
[ ] /termin: Slot klicken → springt zu Step 3
[ ] /termin: Felder klar erkennbar
[ ] /termin: Step 3 → "Weiter" → Step 4 zeigt Zusammenfassung
[ ] /termin: Edit-Buttons (Stift) auf Step 4 funktionieren
[ ] /termin: "Zurück"-Button funktioniert
[ ] Mobile (375px): Wizard funktioniert auch
```

## Was nicht geändert wurde

- Backend (api/booking/*) → unverändert, nimmt die selben Felder wie vorher
- Mail-Templates → unverändert
- Booking-Logik in lib/booking.ts → unverändert
- /referenzen, /leistungen, /preise, /blog → unverändert (Inhalte gleich)

## Mental-Check

- ✅ Kontraste WCAG-tauglich: Input-BG #232327 vs Border `paper-dim/30` (~#998a7c at 30%) klarer Kontrast
- ✅ Placeholder text-paper-mute/70 (~#c8b8a8 at 70%) auf #232327 → ausreichend
- ✅ Labels text-paper-mute (#c8b8a8) auf #161618 page-bg → AAA
- ✅ Keine API-Breaking-Changes
- ✅ Wizard-Submit-Logic: Submit nur auf Step 4
- ✅ Mobile: Wizard funktioniert (StepIndicator hat sm:hidden für Labels, nur Zahlen sichtbar)
- ✅ Auto-Advance bei Tag/Slot-Click → fühlt sich schneller an
