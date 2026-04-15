import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: '검색',
  description: '인마인드에서 게시글을 검색하세요.',
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() || '';

  let posts: any[] = [];

  if (query) {
    const supabase = await createClient();
    const { data } = await supabase
      .from('posts')
      .select('*, user:users(nickname), empathy_count:empathies(count), comment_count:comments(count)')
      .eq('is_public', true)
      .or(`title.ilike.%${query.replace(/[%_,().]/g, '\\$&')}%,content.ilike.%${query.replace(/[%_,().]/g, '\\$&')}%`)
      .order('created_at', { ascending: false })
      .limit(50);

    posts = data || [];
  }

  return <SearchClient query={query} posts={posts} />;
}
