// test01~test40 유저 닉네임/username 을 자연스러운 값으로 변경
// 실행: node scripts/rename-test-users.mjs

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

const nicknames = [
  ['달빛산책', 'moonwalk_k'],
  ['포근한밤', 'cozynight88'],
  ['햇살한줌', 'sunnylatte'],
  ['고요한숲', 'quietforest'],
  ['마음정원', 'mindgarden'],
  ['차분한바다', 'calm_sea7'],
  ['구름솜사탕', 'cloud_candy'],
  ['조용한비', 'quietrain_02'],
  ['따뜻한차', 'warmtea_1'],
  ['잔잔한호수', 'stilllake'],
  ['별헤는밤', 'nightstar_22'],
  ['새벽공기', 'dawn_air'],
  ['초록이', 'greenie_k'],
  ['푸른하늘', 'bluesky_kr'],
  ['작은행복', 'tiny_joy'],
  ['쉼표하나', 'comma_one'],
  ['토닥토닥', 'pat_pat'],
  ['꿈꾸는고래', 'dreamwhale'],
  ['고양이집사', 'cat_jipsa'],
  ['댕댕러버', 'puppylover_k'],
  ['커피한잔', 'onecupofcoffee'],
  ['빵순이', 'bread_soon'],
  ['책벌레', 'bookworm_99'],
  ['느긋한오후', 'slow_afternoon'],
  ['바람소리', 'windsound'],
  ['노을빛', 'sunsetlight'],
  ['안개숲', 'foggyforest'],
  ['눈사람', 'snowman_kr'],
  ['파랑새', 'bluebird_03'],
  ['산책왕', 'walking_king'],
  ['마들렌', 'madeleine_m'],
  ['우유빛', 'milkwhite'],
  ['포도맛', 'grape_flavor'],
  ['자몽하이', 'grapefruit_hi'],
  ['복숭아탄산', 'peach_soda'],
  ['흐림주의보', 'cloudy_alert'],
  ['햇살조각', 'sunpiece_0'],
  ['작은위로', 'little_comfort'],
  ['하루쉼표', 'day_comma'],
  ['깊은숨', 'deepbreath_kr'],
];

async function listUsers() {
  // page 1 per_page=200 — 40명만 찾으면 충분
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=200`, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`list failed: ${res.status}`);
  const data = await res.json();
  return data.users || [];
}

async function updateAuthUser(id, meta) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${id}`, {
    method: 'PUT',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_metadata: meta }),
  });
  return { ok: res.ok, status: res.status, body: res.ok ? null : await res.json().catch(() => null) };
}

async function updatePublicUser(id, nickname, username) {
  // PostgREST PATCH
  const res = await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ nickname, username }),
  });
  return { ok: res.ok, status: res.status, body: res.ok ? null : await res.text() };
}

const users = await listUsers();
let updated = 0;
let failed = 0;

for (let i = 1; i <= 40; i++) {
  const n = String(i).padStart(2, '0');
  const email = `test${n}@in-mind.dev`;
  const u = users.find((x) => x.email === email);
  if (!u) {
    console.log(`[${i}/40] ${email} -> NOT FOUND`);
    failed++;
    continue;
  }
  const [nickname, username] = nicknames[i - 1];
  const a = await updateAuthUser(u.id, { nickname, username });
  const b = await updatePublicUser(u.id, nickname, username);
  const ok = a.ok && b.ok;
  console.log(
    `[${i}/40] ${email} -> auth:${a.status} public:${b.status} ${ok ? 'OK' : 'FAIL'} (${nickname} / ${username})`
  );
  if (!ok) {
    failed++;
    if (a.body) console.log('  auth err:', JSON.stringify(a.body));
    if (b.body) console.log('  public err:', b.body);
  } else {
    updated++;
  }
  await new Promise((r) => setTimeout(r, 120));
}

console.log('---');
console.log(`성공: ${updated} / 실패: ${failed}`);
