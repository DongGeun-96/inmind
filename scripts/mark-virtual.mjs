import { readFileSync } from 'node:fs';
const envText = readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(
  envText.split('\n').filter(l=>l && l.includes('=') && !l.startsWith('#')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim()];})
);
const U = env.NEXT_PUBLIC_SUPABASE_URL;
const K = env.SUPABASE_SERVICE_ROLE_KEY;
const hdr = { apikey: K, Authorization: `Bearer ${K}`, 'Content-Type': 'application/json' };

// test01~test40 이메일 대상 is_virtual=true 업데이트
const res = await fetch(
  `${U}/rest/v1/users?email=like.test*@in-mind.dev`,
  {
    method: 'PATCH',
    headers: { ...hdr, Prefer: 'return=representation' },
    body: JSON.stringify({ is_virtual: true }),
  }
);
console.log('status', res.status);
const text = await res.text();
try {
  const arr = JSON.parse(text);
  console.log(`업데이트된 유저: ${arr.length}명`);
} catch {
  console.log(text);
}
