-- ============================================================
-- SUPABASE SCHEMA für webdesign-alcor.at v2
-- ============================================================
-- In Supabase Dashboard → SQL Editor → "New query" → diese Datei einfügen → Run
-- ============================================================

-- === LEADS (Kontaktformular-Anfragen) ===
CREATE TABLE IF NOT EXISTS leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_number  text UNIQUE,
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  company     text,
  topic       text NOT NULL CHECK (topic IN ('new-website', 'relaunch', 'seo', 'other')),
  message     text NOT NULL,
  source      text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_ref_number_idx ON leads(ref_number);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);


-- === BOOKINGS (Erstgespräch-Buchungen) ===
CREATE TABLE IF NOT EXISTS bookings (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_number   text UNIQUE NOT NULL,
  name         text NOT NULL,
  email        text NOT NULL,
  phone        text,
  topic        text NOT NULL,
  message      text,
  channel      text NOT NULL CHECK (channel IN ('phone', 'video', 'on-site')),
  slot_start   timestamptz NOT NULL,
  slot_end     timestamptz NOT NULL,
  status       text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  source       text,
  created_at   timestamptz NOT NULL DEFAULT now(),

  -- Doppelbuchung verhindern (außer storniert)
  CONSTRAINT slot_start_end_check CHECK (slot_end > slot_start)
);

-- Unique-Constraint nur für nicht-stornierte Bookings
-- Verhindert Race-Conditions bei gleichzeitigen Buchungsversuchen
CREATE UNIQUE INDEX IF NOT EXISTS bookings_slot_unique
  ON bookings(slot_start)
  WHERE status != 'cancelled';

CREATE INDEX IF NOT EXISTS bookings_slot_start_idx ON bookings(slot_start);
CREATE INDEX IF NOT EXISTS bookings_ref_number_idx ON bookings(ref_number);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
CREATE INDEX IF NOT EXISTS bookings_email_idx ON bookings(email);


-- === BUSY SLOTS (manuell blockierte Zeiten z.B. für Urlaub, externe Termine) ===
CREATE TABLE IF NOT EXISTS busy_slots (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_start  timestamptz NOT NULL,
  slot_end    timestamptz NOT NULL,
  reason      text,
  created_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT busy_slot_check CHECK (slot_end > slot_start)
);

CREATE INDEX IF NOT EXISTS busy_slots_start_idx ON busy_slots(slot_start);


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
-- Wichtig: Wir nutzen den Service-Role-Key in der API-Route,
-- der RLS umgeht. Aber Standard-Public-Access ist trotzdem
-- explizit verboten – als Defense-in-Depth.

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE busy_slots ENABLE ROW LEVEL SECURITY;

-- Keine Public-Policies → niemand kommt direkt ran außer über Service-Role


-- ============================================================
-- BEISPIEL: Manuell einen Slot blockieren
-- ============================================================
-- Falls Robert z.B. am 5.5.2026 von 10-12 Uhr nicht verfügbar ist:
--
-- INSERT INTO busy_slots (slot_start, slot_end, reason) VALUES
--   ('2026-05-05 10:00+02', '2026-05-05 12:00+02', 'Externer Termin');
--
-- Achtung: Zeitzone +02 (Europe/Vienna im Sommer) beachten!
-- Im Winter ist es +01 (CET).

-- ============================================================
-- DONE
-- ============================================================
