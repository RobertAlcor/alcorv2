-- ============================================================
-- MIGRATION 05: Settings-Tabelle (Working-Hours, etc.)
-- ============================================================
-- In Supabase → SQL Editor → New query → einfügen → Run
-- ============================================================

CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Trigger für updated_at (set_updated_at function existiert seit Migration 04)
DROP TRIGGER IF EXISTS settings_updated_at ON settings;
CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- RLS aktivieren
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Service-Role Vollzugriff
GRANT ALL ON public.settings TO service_role;

-- Default-Werte für Working-Hours einfügen (falls noch nicht da)
INSERT INTO settings (key, value)
VALUES ('working_hours', '{"start": 9, "end": 18}'::jsonb)
ON CONFLICT (key) DO NOTHING;
