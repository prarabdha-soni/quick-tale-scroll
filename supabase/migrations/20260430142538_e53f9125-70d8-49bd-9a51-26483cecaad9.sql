create table public.story_submissions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  approval_token uuid not null default gen_random_uuid(),
  submitter_name text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.story_submissions enable row level security;

-- Anyone (anon) can read approved stories
create policy "Approved stories are public"
on public.story_submissions
for select
using (status = 'approved');

-- Anyone can submit (insert) a new story; status forced to pending via default + trigger
create policy "Anyone can submit a story"
on public.story_submissions
for insert
with check (status = 'pending');

-- Trigger to ensure new inserts can't set status to approved directly
create or replace function public.enforce_pending_on_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.status := 'pending';
  new.approval_token := coalesce(new.approval_token, gen_random_uuid());
  new.reviewed_at := null;
  return new;
end;
$$;

create trigger trg_enforce_pending
before insert on public.story_submissions
for each row execute function public.enforce_pending_on_insert();