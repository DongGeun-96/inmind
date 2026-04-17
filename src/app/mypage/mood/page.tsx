import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import MoodClient from './MoodClient';

export default async function MoodPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  if (!user) redirect('/auth/login');

  // Fetch last 30 days of mood entries
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const since = thirtyDaysAgo.toISOString().split('T')[0];

  const { data: entries } = await supabase
    .from('mood_entries')
    .select('*')
    .eq('user_id', user.id)
    .gte('entry_date', since)
    .order('entry_date', { ascending: false });

  return <MoodClient entries={entries || []} />;
}
