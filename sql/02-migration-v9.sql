-- ============================================================
-- MIGRATION v9: Booking-Erweiterungen
-- ============================================================
-- Falls v8-Schema schon installiert ist, diese Migration laufen lassen.
-- Falls noch nicht: Komplettes 01-schema-v9.sql nutzen (siehe unten).
-- ============================================================

-- 1. Channel-Constraint erweitern (kein 'video' mehr, dafür on-site-office/external)
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_channel_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_channel_check
  CHECK (channel IN ('phone', 'on-site-office', 'on-site-external'));

-- 2. Neue Spalten
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS external_address text,
  ADD COLUMN IF NOT EXISTS duration_minutes integer NOT NULL DEFAULT 30
    CHECK (duration_minutes IN (15, 30, 45, 60));

-- ============================================================
-- KOMPLETTES SCHEMA (bei frischem Setup, alternativ zu 01-schema.sql)
-- ============================================================

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

CREATE TABLE IF NOT EXISTS bookings (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_number        text UNIQUE NOT NULL,
  name              text NOT NULL,
  email             text NOT NULL,
  phone             text NOT NULL,
  topic             text NOT NULL,
  message           text,
  channel           text NOT NULL CHECK (channel IN ('phone', 'on-site-office', 'on-site-external')),
  external_address  text,
  duration_minutes  integer NOT NULL DEFAULT 30 CHECK (duration_minutes IN (15, 30, 45, 60)),
  slot_start        timestamptz NOT NULL,
  slot_end          timestamptz NOT NULL,
  status            text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  source            text,
  created_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT slot_start_end_check CHECK (slot_end > slot_start)
);

-- Verhindert exakte Slot-Doppelbuchung (außer storniert)
CREATE UNIQUE INDEX IF NOT EXISTS bookings_slot_unique
  ON bookings(slot_start)
  WHERE status != 'cancelled';

CREATE INDEX IF NOT EXISTS bookings_slot_start_idx ON bookings(slot_start);
CREATE INDEX IF NOT EXISTS bookings_slot_range_idx ON bookings(slot_start, slot_end);
CREATE INDEX IF NOT EXISTS bookings_ref_number_idx ON bookings(ref_number);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
CREATE INDEX IF NOT EXISTS bookings_email_idx ON bookings(email);

CREATE TABLE IF NOT EXISTS busy_slots (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_start  timestamptz NOT NULL,
  slot_end    timestamptz NOT NULL,
  reason      text,
  created_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT busy_slot_check CHECK (slot_end > slot_start)
);

CREATE INDEX IF NOT EXISTS busy_slots_start_idx ON busy_slots(slot_start);

-- RLS: explizit verbieten - Service-Role-Key umgeht RLS in API
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE busy_slots ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- DONE
-- ============================================================
