-- =============================================
-- 방문자 추적 테이블
-- =============================================

-- visitor_sessions: 고유 방문자 세션
create table if not exists public.visitor_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_token text not null unique,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- page_visits: 개별 페이지 방문 기록
create table if not exists public.page_visits (
  id uuid primary key default gen_random_uuid(),
  visitor_token text not null,
  path text not null,
  referrer text,
  user_agent text,
  visited_at timestamptz not null default now(),
  visit_date date not null default (now() at time zone 'Asia/Seoul')::date
);

-- 인덱스
create index if not exists idx_page_visits_visit_date on public.page_visits (visit_date);
create index if not exists idx_page_visits_path on public.page_visits (path);
create index if not exists idx_page_visits_visitor_token_date on public.page_visits (visitor_token, visit_date);

-- RLS 활성화
alter table public.visitor_sessions enable row level security;
alter table public.page_visits enable row level security;

-- service role만 접근 가능 (anon/authenticated 차단)
-- service_role은 RLS를 우회하므로 별도 정책 불필요
-- 일반 사용자의 직접 접근을 차단하기 위해 정책 없이 RLS만 활성화
