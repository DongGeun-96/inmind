// 테스트용 유저 40명을 Supabase Admin API로 생성
// 실행: node scripts/seed-users.mjs

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const envPath = resolve(process.cwd(), '.env.local');
const envText = readFileSync(envPath, 'utf8');
const env = Object.fromEntries(
  envText
    .split('\n')
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('env missing');
  process.exit(1);
}

const COUNT = 40;
const PASSWORD = 'Test1234!';

const results = [];

for (let i = 1; i <= COUNT; i++) {
  const n = String(i).padStart(2, '0');
  const body = {
    email: `test${n}@in-mind.dev`,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: {
      nickname: `테스트${n}`,
      username: `test_${n}`,
    },
  };

  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => ({}));
  const status = res.status;
  const ok = res.ok;
  results.push({ i, email: body.email, status, ok, err: ok ? null : json });
  console.log(`[${i}/${COUNT}] ${body.email} -> ${status} ${ok ? 'OK' : JSON.stringify(json)}`);

  // rate limit 방지 간격
  await new Promise((r) => setTimeout(r, 150));
}

const okCount = results.filter((r) => r.ok).length;
const failCount = results.length - okCount;
console.log('---');
console.log(`성공: ${okCount} / 실패: ${failCount}`);
if (failCount) {
  console.log('실패 상세:');
  for (const r of results.filter((x) => !x.ok)) {
    console.log(`- ${r.email}: ${JSON.stringify(r.err)}`);
  }
}
