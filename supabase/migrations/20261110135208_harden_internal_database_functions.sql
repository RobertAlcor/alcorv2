-- Harden internal trigger and event-trigger functions.
-- Applied to production through Supabase on 2026-11-10.

alter function public.set_updated_at()
  set search_path = pg_catalog;

revoke execute on function public.set_updated_at() from public, anon, authenticated;
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
