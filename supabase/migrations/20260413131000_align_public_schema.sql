begin;

create extension if not exists pgcrypto;

alter table public.users add column if not exists username text;
alter table public.users add column if not exists role text not null default 'user';
alter table public.users add column if not exists is_banned boolean default false;
update public.users set role = 'user' where role is null;

alter table public.users drop constraint if exists users_role_check;
alter table public.users
  add constraint users_role_check check (role in ('user', 'admin'));

alter table public.posts add column if not exists is_public boolean default true;
alter table public.posts add column if not exists view_count integer default 0;
alter table public.posts drop constraint if exists posts_board_type_check;
alter table public.posts
  add constraint posts_board_type_check check (board_type in (
    'emotion', 'cheer',
    'pet_loss', 'human_loss', 'depression', 'recovery',
    'love', 'career', 'marriage', 'family', 'relationship', 'workplace', 'study', 'parenting',
    'healing_food', 'healing_place', 'healing_book', 'healing_movie', 'healing_quote', 'healing_etc',
    'community_free', 'tips'
  ));

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null,
  message text not null,
  post_id uuid not null references public.posts(id) on delete cascade,
  is_read boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  category text not null,
  title text not null,
  content text not null,
  reply text,
  status text not null default 'pending',
  created_at timestamptz default now(),
  replied_at timestamptz
);

alter table public.notifications add column if not exists is_read boolean not null default false;
alter table public.inquiries add column if not exists reply text;
alter table public.inquiries add column if not exists status text not null default 'pending';
alter table public.inquiries add column if not exists replied_at timestamptz;

alter table public.notifications drop constraint if exists notifications_type_check;
alter table public.notifications
  add constraint notifications_type_check check (type in ('comment', 'empathy'));

alter table public.inquiries drop constraint if exists inquiries_status_check;
alter table public.inquiries
  add constraint inquiries_status_check check (status in ('pending', 'answered'));

create unique index if not exists users_username_key on public.users(username);
create index if not exists idx_posts_board_type on public.posts(board_type);
create index if not exists idx_posts_created_at on public.posts(created_at desc);
create index if not exists idx_posts_user_id on public.posts(user_id);
create index if not exists idx_comments_post_id on public.comments(post_id);
create index if not exists idx_comments_parent_id on public.comments(parent_id);
create index if not exists idx_empathies_post_id on public.empathies(post_id);
create index if not exists idx_empathies_comment_id on public.empathies(comment_id);
create index if not exists idx_reports_target on public.reports(target_type, target_id);
create index if not exists idx_notifications_user_read on public.notifications(user_id, is_read, created_at desc);
create index if not exists idx_inquiries_user_created_at on public.inquiries(user_id, created_at desc);
create index if not exists idx_inquiries_status on public.inquiries(status, created_at desc);

create or replace function public.increment_view_count(post_id uuid)
returns void as $$
begin
  update public.posts
  set view_count = view_count + 1
  where id = post_id;
end;
$$ language plpgsql;

create or replace function public.is_admin(check_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where id = check_user_id
      and role = 'admin'
  );
$$;

grant execute on function public.is_admin(uuid) to anon, authenticated, service_role;

alter table public.users enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.empathies enable row level security;
alter table public.reports enable row level security;
alter table public.notifications enable row level security;
alter table public.inquiries enable row level security;

drop policy if exists "Anyone can view user nicknames" on public.users;
drop policy if exists "Users can update own profile" on public.users;
drop policy if exists "Users can insert own profile" on public.users;
drop policy if exists "Admins can update users" on public.users;
create policy "Anyone can view user nicknames" on public.users for select using (true);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.users for insert with check (auth.uid() = id);
create policy "Admins can update users" on public.users for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public posts visible to all" on public.posts;
drop policy if exists "Private posts visible to authenticated" on public.posts;
drop policy if exists "Authenticated users can create posts" on public.posts;
drop policy if exists "Users can update own posts" on public.posts;
drop policy if exists "Users can delete own posts" on public.posts;
drop policy if exists "Admins can delete posts" on public.posts;
create policy "Public posts visible to all" on public.posts for select using (is_public = true);
create policy "Private posts visible to authenticated" on public.posts for select using (is_public = false and auth.uid() is not null);
create policy "Authenticated users can create posts" on public.posts for insert with check (auth.uid() = user_id);
create policy "Users can update own posts" on public.posts for update using (auth.uid() = user_id);
create policy "Users can delete own posts" on public.posts for delete using (auth.uid() = user_id);
create policy "Admins can delete posts" on public.posts for delete using (public.is_admin());

drop policy if exists "Anyone can view comments" on public.comments;
drop policy if exists "Authenticated users can create comments" on public.comments;
drop policy if exists "Users can delete own comments" on public.comments;
create policy "Anyone can view comments" on public.comments for select using (true);
create policy "Authenticated users can create comments" on public.comments for insert with check (auth.uid() = user_id);
create policy "Users can delete own comments" on public.comments for delete using (auth.uid() = user_id);

drop policy if exists "Anyone can view empathies" on public.empathies;
drop policy if exists "Authenticated users can add empathy" on public.empathies;
drop policy if exists "Users can remove own empathy" on public.empathies;
create policy "Anyone can view empathies" on public.empathies for select using (true);
create policy "Authenticated users can add empathy" on public.empathies for insert with check (auth.uid() = user_id);
create policy "Users can remove own empathy" on public.empathies for delete using (auth.uid() = user_id);

drop policy if exists "Authenticated users can create reports" on public.reports;
drop policy if exists "Admins can view reports" on public.reports;
drop policy if exists "Admins can update reports" on public.reports;
create policy "Authenticated users can create reports" on public.reports for insert with check (auth.uid() = reporter_id);
create policy "Admins can view reports" on public.reports for select using (public.is_admin());
create policy "Admins can update reports" on public.reports for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Users can view own notifications" on public.notifications;
drop policy if exists "Users can update own notifications" on public.notifications;
drop policy if exists "Authenticated users can create notifications" on public.notifications;
create policy "Users can view own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on public.notifications for update using (auth.uid() = user_id);
create policy "Authenticated users can create notifications" on public.notifications for insert with check (auth.role() = 'authenticated');

drop policy if exists "Users can insert own inquiries" on public.inquiries;
drop policy if exists "Users can view own inquiries" on public.inquiries;
drop policy if exists "Admins can view inquiries" on public.inquiries;
drop policy if exists "Admins can update inquiries" on public.inquiries;
create policy "Users can insert own inquiries" on public.inquiries for insert with check (auth.uid() = user_id);
create policy "Users can view own inquiries" on public.inquiries for select using (auth.uid() = user_id);
create policy "Admins can view inquiries" on public.inquiries for select using (public.is_admin());
create policy "Admins can update inquiries" on public.inquiries for update using (public.is_admin()) with check (public.is_admin());

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, nickname, email, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nickname', 'User'),
    new.email,
    nullif(new.raw_user_meta_data->>'username', '')
  )
  on conflict (id) do update set
    nickname = coalesce(excluded.nickname, public.users.nickname),
    email = coalesce(excluded.email, public.users.email),
    username = coalesce(excluded.username, public.users.username);

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

commit;
