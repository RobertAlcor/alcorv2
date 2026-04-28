-- ============================================================
-- BUSY SLOTS — Termine manuell blockieren (Urlaub, Pause, etc.)
-- ============================================================
-- Diese Snippets in Supabase → SQL Editor → New query → einfügen → Run
-- Zeitzone: +02 = Sommerzeit, +01 = Winterzeit (Wien)
-- ============================================================


-- EINZELNER ZEITSLOT BLOCKIEREN
INSERT INTO busy_slots (slot_start, slot_end, reason) VALUES
  ('2026-05-15 10:00+02', '2026-05-15 11:00+02', 'Externer Termin Steuerberater');


-- HALBER TAG BLOCKIEREN (z.B. Nachmittag voll)
INSERT INTO busy_slots (slot_start, slot_end, reason) VALUES
  ('2026-05-20 13:00+02', '2026-05-20 18:00+02', 'Workshop Nachmittag');


-- GANZER TAG BLOCKIEREN (z.B. Feiertag)
INSERT INTO busy_slots (slot_start, slot_end, reason) VALUES
  ('2026-05-01 09:00+02', '2026-05-01 18:00+02', 'Tag der Arbeit');


-- URLAUB MEHRERE TAGE
INSERT INTO busy_slots (slot_start, slot_end, reason) VALUES
  ('2026-08-03 09:00+02', '2026-08-03 18:00+02', 'Urlaub'),
  ('2026-08-04 09:00+02', '2026-08-04 18:00+02', 'Urlaub'),
  ('2026-08-05 09:00+02', '2026-08-05 18:00+02', 'Urlaub'),
  ('2026-08-06 09:00+02', '2026-08-06 18:00+02', 'Urlaub'),
  ('2026-08-07 09:00+02', '2026-08-07 18:00+02', 'Urlaub');


-- ALLE BLOCKIERTEN SLOTS ANSEHEN (zukünftige)
SELECT
  to_char(slot_start AT TIME ZONE 'Europe/Vienna', 'DD.MM.YYYY HH24:MI') AS start_wien,
  to_char(slot_end   AT TIME ZONE 'Europe/Vienna', 'DD.MM.YYYY HH24:MI') AS ende_wien,
  reason,
  id
FROM busy_slots
WHERE slot_start >= now()
ORDER BY slot_start;


-- BLOCKIERUNG WIEDER ENTFERNEN
-- Erst IDs anschauen mit Query oben, dann mit ID löschen:
-- DELETE FROM busy_slots WHERE id = 'PASTE-ID-HIER';

-- Oder alle mit gleichem Grund löschen:
-- DELETE FROM busy_slots WHERE reason = 'Urlaub';

-- Oder alles ab einem Datum:
-- DELETE FROM busy_slots WHERE slot_start >= '2026-08-01';


-- ============================================================
-- BOOKINGS — Buchungen verwalten
-- ============================================================

-- Alle aktiven Buchungen (zukünftige)
SELECT
  ref_number,
  to_char(slot_start AT TIME ZONE 'Europe/Vienna', 'DD.MM.YYYY HH24:MI') AS termin,
  name,
  email,
  phone,
  topic,
  channel,
  status,
  external_address
FROM bookings
WHERE slot_start >= now()
  AND status != 'cancelled'
ORDER BY slot_start;


-- Buchung stornieren (z.B. Kunde sagt ab)
-- Erst Ref-Number suchen:
SELECT ref_number, name, slot_start FROM bookings WHERE email = 'kunde@example.com';

-- Dann stornieren:
-- UPDATE bookings SET status = 'cancelled' WHERE ref_number = '260428-FBC6';


-- ============================================================
-- LEADS — Kontaktformular-Anfragen
-- ============================================================

SELECT
  to_char(created_at AT TIME ZONE 'Europe/Vienna', 'DD.MM.YYYY HH24:MI') AS eingang,
  ref_number,
  name,
  email,
  phone,
  topic,
  source
FROM leads
ORDER BY created_at DESC
LIMIT 20;


-- ============================================================
-- ZEITZONEN-REFERENZ
-- ============================================================
-- 2026-05-15 10:00+02     → 15. Mai 2026, 10:00 Wien-Sommerzeit
-- 2026-12-15 10:00+01     → 15. Dezember 2026, 10:00 Wien-Winterzeit
-- 
-- Sommerzeit endet:  letzten Sonntag im Oktober → +01
-- Sommerzeit beginnt: letzten Sonntag im März  → +02
