-- Webdesign Alcor – Leads Migration
-- Erstellt: 2026-04-27

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  company text,
  topic text not null check (topic in ('new-website', 'relaunch', 'seo', 'other')),
  message text not null,
  source text,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost', 'spam')),
  notes text
);

-- Indexes
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_idx on public.leads (email);

-- RLS aktivieren
alter table public.leads enable row level security;

-- Policy: Nur Service Role darf einfügen (über API)
-- Nichts public lesbar
drop policy if exists "service role full access" on public.leads;
create policy "service role full access"
  on public.leads
  for all
  to service_role
  using (true)
  with check (true);

-- Kommentar
comment on table public.leads is 'Kontaktformular-Anfragen von webdesign-alcor.at';
