import { NextRequest, NextResponse } from 'next/server';

const HOST = 'in-mind.dev';
const KEY = '213dcc7aedb728062f2c7a90ae51574b';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://searchadvisor.naver.com/indexnow',
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const urlList: string[] = Array.isArray(body?.urls) ? body.urls : [];

    // 안전장치: in-mind.dev 도메인만 허용
    const filtered = urlList.filter((u) => typeof u === 'string' && u.startsWith(`https://${HOST}/`));
    if (filtered.length === 0) {
      return NextResponse.json({ ok: false, error: 'no valid urls' }, { status: 400 });
    }

    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: filtered,
    };

    const results = await Promise.all(
      ENDPOINTS.map(async (endpoint) => {
        try {
          const r = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(payload),
          });
          return { endpoint, status: r.status, ok: r.ok };
        } catch (e) {
          return { endpoint, error: (e as Error).message };
        }
      }),
    );

    return NextResponse.json({ ok: true, submitted: filtered.length, results });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
