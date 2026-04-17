import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import DiaryClient from './DiaryClient';

export default async function DiaryPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  if (!user) redirect('/auth/login');

  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });

  const [{ data: todayEntry }, { data: entries }] = await Promise.all([
    supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', user.id)
      .eq('entry_date', today)
      .single(),
    supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('entry_date', { ascending: false })
      .limit(30),
  ]);

  return <DiaryClient todayEntry={todayEntry} entries={entries || []} />;
}
