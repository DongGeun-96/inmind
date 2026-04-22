// 새 글이 올라온 직후 클라이언트가 fire-and-forget으로 호출.
// 가상 유저 1~2명의 공감 댓글 + 공감 2~6개를 즉시 삽입.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { scheduleAutoEngagement } from '@/lib/auto-comment';

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();
    if (!postId || typeof postId !== 'string') {
      return NextResponse.json({ error: 'postId required' }, { status: 400 });
    }

    // 해당 글이 실제로 존재하고 공개 글인지 확인
    const supabase = await createClient();
    const { data: post } = await supabase
      .from('posts')
      .select('id, board_type, content, user_id, is_public')
      .eq('id', postId)
      .single();

    if (!post || !post.is_public) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    scheduleAutoEngagement({
      postId: post.id,
      boardType: post.board_type,
      content: post.content || '',
      authorUserId: post.user_id,
    });

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
