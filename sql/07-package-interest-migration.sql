-- ============================================================
-- 07-package-interest-migration.sql
-- ============================================================
-- Erweitert die leads-Tabelle um 2 Spalten:
-- 1. package_interest: Welches Paket interessiert den Kunden? (von /preise gekommen?)
-- 2. existing_website: Bestehende Website-URL (optional)
--
-- Anwendung: Im Supabase Dashboard → SQL Editor → einfügen → Run
-- ============================================================

-- Paket-Interesse (optional, bei Anfrage über /preise gesetzt)
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS package_interest TEXT;

-- Bestehende Website (optional, vom User eingegeben)
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS existing_website TEXT;

-- Index für CRM-Filter ("zeige alle Anfragen für Starter-Paket")
CREATE INDEX IF NOT EXISTS idx_leads_package_interest
  ON leads (package_interest)
  WHERE package_interest IS NOT NULL;

-- Kommentare zur Dokumentation
COMMENT ON COLUMN leads.package_interest IS
  'Paket-Interesse aus URL-Param (?paket=starter|business|premium|unsure). NULL wenn unbekannt.';

COMMENT ON COLUMN leads.existing_website IS
  'Optionale URL der bestehenden Website (für Audit/Vergleich/Relaunch-Anfragen).';
