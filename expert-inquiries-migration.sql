-- 전문가 등록 문의 테이블
-- Supabase SQL Editor에서 실행

create table if not exists public.expert_inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  expert_type text not null check (expert_type in ('hospital', 'counselor')),
  name text not null,
  phone text not null,
  email text,
  affiliation text,
  content text not null,
  reply text,
  status text not null default 'pending' check (status in ('pending', 'answered')),
  created_at timestamptz default now(),
  replied_at timestamptz
);

-- 인덱스
create index if not exists idx_expert_inquiries_status on public.expert_inquiries(status, created_at desc);
create index if not exists idx_expert_inquiries_created_at on public.expert_inquiries(created_at desc);
create index if not exists idx_expert_inquiries_user_id on public.expert_inquiries(user_id, created_at desc);

-- RLS 활성화
alter table public.expert_inquiries enable row level security;

-- 로그인 사용자만 문의 등록 가능
create policy "Authenticated users can insert expert inquiries"
  on public.expert_inquiries for insert
  with check (auth.uid() = user_id);

-- 본인 문의 조회 가능
create policy "Users can view own expert inquiries"
  on public.expert_inquiries for select
  using (auth.uid() = user_id);

-- 관리자만 조회 가능
create policy "Admins can view expert inquiries"
  on public.expert_inquiries for select
  using (public.is_admin());

-- 관리자만 수정 가능 (답변)
create policy "Admins can update expert inquiries"
  on public.expert_inquiries for update
  using (public.is_admin())
  with check (public.is_admin());
