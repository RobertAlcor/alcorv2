-- Align the database constraint with the contact form topics.
-- Applied to production through Supabase on 2026-11-10.

alter table public.leads
  drop constraint if exists leads_topic_check;

alter table public.leads
  add constraint leads_topic_check
  check (topic in ('general', 'pricing', 'new-website', 'relaunch', 'seo', 'other'));
