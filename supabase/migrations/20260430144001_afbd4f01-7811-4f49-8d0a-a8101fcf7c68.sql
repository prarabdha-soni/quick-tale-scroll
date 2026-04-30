-- 1. Roles enum + table
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- 2. Security-definer role check (avoid RLS recursion)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- 3. RLS for user_roles
create policy "Users can view their own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Admins can view all roles"
  on public.user_roles for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- 4. Auto-assign admin role to the designated email on signup
create or replace function public.handle_new_user_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email = 'prarabdha21@gmail.com' then
    insert into public.user_roles (user_id, role)
    values (new.id, 'admin')
    on conflict (user_id, role) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_admin on auth.users;
create trigger on_auth_user_created_admin
  after insert on auth.users
  for each row execute function public.handle_new_user_admin();

-- Backfill if the admin user already exists
insert into public.user_roles (user_id, role)
select id, 'admin'::public.app_role from auth.users where email = 'prarabdha21@gmail.com'
on conflict (user_id, role) do nothing;

-- 5. Admin policies on story_submissions
create policy "Admins can view all submissions"
  on public.story_submissions for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update submissions"
  on public.story_submissions for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));