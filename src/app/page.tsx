import { createClient } from '@/lib/supabase-server';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: allPosts }, { data: popularPostsRaw }] = await Promise.all([
    supabase
      .from('posts')
      .select('*, user:users(nickname), empathy_count:empathies(count), comment_count:comments(count)')
      .eq('is_public', true)
      .eq('is_notice', false)
      .order('created_at', { ascending: false })
      .limit(30),
    supabase
      .from('posts')
      .select('*, user:users(nickname), empathy_count:empathies(count), comment_count:comments(count)')
      .eq('is_public', true)
      .eq('is_notice', false)
      .order('created_at', { ascending: false })
      .limit(100),
  ]);

  // Sort popular posts by empathy count
  const popularPosts = (popularPostsRaw || [])
    .sort((a, b) => {
      const aCount = Array.isArray(a.empathy_count) ? a.empathy_count[0]?.count || 0 : (a.empathy_count || 0);
      const bCount = Array.isArray(b.empathy_count) ? b.empathy_count[0]?.count || 0 : (b.empathy_count || 0);
      return bCount - aCount;
    })
    .slice(0, 20);

  return (
    <HomeClient
      allPosts={allPosts || []}
      popularPosts={popularPosts}
    />
  );
}
