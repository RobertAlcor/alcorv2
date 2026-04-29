-- ============================================================
-- MIGRATION: Approval-Workflow für Bookings
-- ============================================================
-- In Supabase → SQL Editor → New query → einfügen → Run
-- ============================================================

-- 1. Status-Constraint erweitern um 'pending'
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE bookings
  ADD CONSTRAINT bookings_status_check
  CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'declined'));

-- 2. Default-Status auf 'pending' für neue Buchungen
ALTER TABLE bookings ALTER COLUMN status SET DEFAULT 'pending';

-- 3. Approval-Token (für direkten Approve/Decline-Link aus E-Mail)
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS approval_token text UNIQUE,
  ADD COLUMN IF NOT EXISTS decline_reason text,
  ADD COLUMN IF NOT EXISTS approved_at timestamptz,
  ADD COLUMN IF NOT EXISTS declined_at timestamptz;

-- 4. Index auf approval_token für schnellen Lookup
CREATE INDEX IF NOT EXISTS bookings_approval_token_idx ON bookings(approval_token);

-- 5. Bestehende 'confirmed' Bookings bleiben confirmed (kein Update nötig)

-- ============================================================
-- LEADS: source-Erweiterung für Kopie-Wunsch (kein Schema-Change nötig)
-- Die Logik wird im Code abgehandelt - keine DB-Änderung
-- ============================================================
