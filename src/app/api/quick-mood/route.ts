import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { scheduleAutoEngagement } from '@/lib/auto-comment';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const { title, content } = await req.json();
    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'content required' }, { status: 400 });
    }

    const safeTitle = (typeof title === 'string' && title.trim()) || content.slice(0, 40);

    const { data, error } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        board_type: 'emotion',
        title: safeTitle.slice(0, 80),
        content: content.slice(0, 500),
        is_anonymous: true,
        is_public: true,
        view_count: 0,
      })
      .select('id')
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message ?? 'insert failed' }, { status: 500 });
    }

    scheduleAutoEngagement({
      postId: data.id,
      boardType: 'emotion',
      content,
      authorUserId: user.id,
    });

    return NextResponse.json({ id: data.id });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
