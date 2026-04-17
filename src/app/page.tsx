import { createClient } from '@/lib/supabase-server';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const supabase = await createClient();

  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });

  const [{ data: allPosts }, { data: popularPostsRaw }, { data: quotes }] = await Promise.all([
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
    supabase
      .from('daily_quotes')
      .select('*'),
  ]);

  // Sort popular posts by empathy count
  const popularPosts = (popularPostsRaw || [])
    .sort((a, b) => {
      const aCount = Array.isArray(a.empathy_count) ? a.empathy_count[0]?.count || 0 : (a.empathy_count || 0);
      const bCount = Array.isArray(b.empathy_count) ? b.empathy_count[0]?.count || 0 : (b.empathy_count || 0);
      return bCount - aCount;
    })
    .slice(0, 20);

  // Pick today's quote using date-based modulo
  const allQuotes = quotes || [];
  let todayQuote = null;
  if (allQuotes.length > 0) {
    const dateNum = parseInt(today.replace(/-/g, ''), 10);
    const index = dateNum % allQuotes.length;
    todayQuote = allQuotes[index];
  }

  return (
    <HomeClient
      allPosts={allPosts || []}
      popularPosts={popularPosts}
      todayQuote={todayQuote}
    />
  );
}
