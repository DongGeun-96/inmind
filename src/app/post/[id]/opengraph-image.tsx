import { ImageResponse } from 'next/og';
import { createClient } from '@/lib/supabase-server';
import { BOARD_CONFIG, type BoardType } from '@/types/database';

export const runtime = 'edge';
export const alt = '인마인드 게시글';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('title, board_type')
    .eq('id', id)
    .single();

  const title = post?.title || '인마인드';
  const boardLabel = post ? BOARD_CONFIG[post.board_type as BoardType]?.label || '' : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f7f8fa 0%, #e8eaff 100%)',
          padding: 60,
        }}
      >
        {boardLabel && (
          <div
            style={{
              fontSize: 24,
              color: '#5470FF',
              fontWeight: 600,
              marginBottom: 20,
              padding: '6px 20px',
              background: 'rgba(84, 112, 255, 0.1)',
              borderRadius: 20,
            }}
          >
            {boardLabel}
          </div>
        )}
        <div
          style={{
            fontSize: title.length > 30 ? 40 : 52,
            fontWeight: 700,
            color: '#333333',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#999',
            marginTop: 40,
          }}
        >
          인마인드 - 힐링 커뮤니티
        </div>
      </div>
    ),
    { ...size }
  );
}
