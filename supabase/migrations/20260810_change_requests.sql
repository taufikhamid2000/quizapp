-- Player-submitted content corrections. Table is prefixed quizapp_ since
-- this Supabase project is shared across multiple apps.
create table if not exists public.quizapp_change_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  subject_slug text not null,
  subject_name text not null,
  topic_slug text not null,
  topic_name text not null,
  question_id text,
  question_text text,
  issue text not null,
  suggested_fix text,
  reporter_contact text,
  status text not null default 'pending' check (status in ('pending', 'resolved')),
  resolved_at timestamptz
);

alter table public.quizapp_change_requests enable row level security;

-- Anyone (anonymous players included) can submit a change request.
create policy "Anyone can submit change requests"
  on public.quizapp_change_requests for insert
  to anon, authenticated
  with check (true);

-- Reviewing happens via the Supabase Table Editor for now, so only
-- signed-in access is needed here — no in-app review page yet.
create policy "Authenticated users can view change requests"
  on public.quizapp_change_requests for select
  to authenticated
  using (true);

create policy "Authenticated users can update change requests"
  on public.quizapp_change_requests for update
  to authenticated
  using (true)
  with check (true);
