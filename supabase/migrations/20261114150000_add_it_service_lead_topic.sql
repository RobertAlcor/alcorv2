-- Allow the new IT-Service / PC-Hilfe contact topic.
-- Apply before publishing the IT service landing page.

alter table public.leads
  drop constraint if exists leads_topic_check;

alter table public.leads
  add constraint leads_topic_check
  check (
    topic in (
      'general',
      'pricing',
      'new-website',
      'relaunch',
      'seo',
      'it-service',
      'other'
    )
  );
