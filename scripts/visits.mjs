import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const env = Object.fromEntries(
  readFileSync('/Users/odong-geun/workspace/인마인드/inmind/.env.local', 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => {
      const idx = l.indexOf('=');
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim().replace(/^["']|["']$/g, '')];
    })
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const now = new Date();
const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
const todayStr = kstNow.toISOString().slice(0, 10);
const sevenAgo = new Date(kstNow);
sevenAgo.setDate(sevenAgo.getDate() - 6);
const sevenStr = sevenAgo.toISOString().slice(0, 10);

console.log(`기준 KST: ${kstNow.toISOString().slice(0, 16).replace('T', ' ')}`);

// 최근 7일
const { data: weekData, error: e1 } = await supabase
  .from('page_visits')
  .select('visitor_token, visit_date, path')
  .gte('visit_date', sevenStr)
  .lte('visit_date', todayStr);
if (e1) { console.error(e1); process.exit(1); }

const dailyMap = new Map();
const pvMap = new Map();
for (let i = 0; i < 7; i++) {
  const d = new Date(sevenAgo);
  d.setDate(d.getDate() + i);
  const ds = d.toISOString().slice(0, 10);
  dailyMap.set(ds, new Set());
  pvMap.set(ds, 0);
}
weekData?.forEach((r) => {
  dailyMap.get(r.visit_date)?.add(r.visitor_token);
  pvMap.set(r.visit_date, (pvMap.get(r.visit_date) || 0) + 1);
});

console.log('\n📊 최근 7일 방문 현황');
console.log('날짜        | 방문자 | 페이지뷰');
console.log('------------|--------|----------');
for (const [d, tokens] of dailyMap) {
  console.log(`${d}  |   ${String(tokens.size).padStart(3)}  |   ${String(pvMap.get(d) || 0).padStart(4)}`);
}
const totalV = [...dailyMap.values()].reduce((a, s) => a + s.size, 0);
const totalPv = [...pvMap.values()].reduce((a, n) => a + n, 0);
console.log(`------------|--------|----------`);
console.log(`7일 합계    |   ${String(totalV).padStart(3)}  |   ${String(totalPv).padStart(4)}`);

// 오늘 인기 페이지
const today = weekData?.filter((r) => r.visit_date === todayStr) ?? [];
const pathCount = new Map();
today.forEach((r) => pathCount.set(r.path, (pathCount.get(r.path) || 0) + 1));
const top = [...pathCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

console.log(`\n🔥 오늘 (${todayStr}) 인기 페이지 Top ${top.length}`);
if (top.length === 0) console.log('  아직 방문 없음');
top.forEach(([p, v], i) => console.log(`  ${i + 1}. ${p}  (${v})`));

// 전체 누적
const { count: totalAll } = await supabase
  .from('page_visits')
  .select('*', { count: 'exact', head: true });
console.log(`\n📈 전체 누적 페이지뷰: ${totalAll ?? 0}`);
