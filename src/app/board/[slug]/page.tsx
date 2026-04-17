import { notFound, redirect } from 'next/navigation';
import { BOARD_CONFIG, CATEGORIES, type BoardType } from '@/types/database';
import { createClient } from '@/lib/supabase-server';
import BoardClient from './BoardClient';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; view?: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const config = BOARD_CONFIG[slug as BoardType];
  if (!config) return {};
  return {
    title: config.label,
    description: config.description,
    openGraph: {
      title: config.label,
      description: config.description,
    },
  };
}

export default async function BoardPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page, view } = await searchParams;
  const boardType = slug as BoardType;
  const config = BOARD_CONFIG[boardType];

  if (!config) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-mind.dev';
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: userData } = await supabase.from('users').select('role').eq('id', user.id).single();
    isAdmin = userData?.role === 'admin';
  }

  // 익명 게시판은 로그인 필수
  if (config.requireAuth && !user) {
    redirect('/auth/login');
  }

  const isAllView = view === 'all';
  const category = CATEGORIES.find((cat) => cat.boards.includes(boardType));
  const categoryBoards = category?.boards || [boardType];

  const currentPage = Number(page) || 1;
  const perPage = 20;
  const from = (currentPage - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from('posts')
    .select('*, user:users(nickname), comment_count:comments(count), empathy_count:empathies(count)', { count: 'exact' });

  if (isAllView) {
    query = query.in('board_type', categoryBoards).eq('is_notice', false);
  } else {
    query = query.eq('board_type', boardType).eq('is_notice', false);
  }

  const { data: posts, count } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count || 0) / perPage);

  // 공지글은 별도 조회 (첫 페이지에서만)
  let notices: typeof posts = [];
  if (currentPage === 1 && !isAllView) {
    const { data } = await supabase
      .from('posts')
      .select('*, user:users(nickname), comment_count:comments(count), empathy_count:empathies(count)')
      .eq('board_type', boardType)
      .eq('is_notice', true)
      .order('created_at', { ascending: false });
    notices = data || [];
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: config.category, item: `${siteUrl}/board/${boardType}` },
      { '@type': 'ListItem', position: 3, name: config.label },
    ],
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
    />
    <BoardClient
      boardType={boardType}
      config={config}
      notices={notices}
      posts={posts || []}
      currentPage={currentPage}
      totalPages={totalPages}
      isLoggedIn={!!user}
      isAdmin={isAdmin}
      isAllView={isAllView}
    />
    </>
  );
}
