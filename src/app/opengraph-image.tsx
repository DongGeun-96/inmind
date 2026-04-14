import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '인마인드 - 힐링 커뮤니티';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
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
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#333333',
            marginBottom: 16,
          }}
        >
          인마인드
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#5470FF',
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          힐링 커뮤니티
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#666666',
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          공감과 위로를 나눌 수 있는 따뜻한 공간
        </div>
      </div>
    ),
    { ...size }
  );
}
