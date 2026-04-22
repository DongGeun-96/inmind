// 더미 게시글 40개 추가 (기존과 중복 없음, 시간 분산 + 자연스러운 댓글/공감)
// 실행: node scripts/seed-content-batch2.mjs

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

const hdr = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
};

async function listVirtualUsers() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/users?select=id,nickname&is_virtual=eq.true&order=created_at.asc`,
    { headers: hdr }
  );
  if (!res.ok) throw new Error(`users list failed ${res.status} ${await res.text()}`);
  return res.json();
}

const POSTS = [
  // 마음의공간 - emotion
  { board: 'emotion', title: '비 오는 날이면 괜히 차분해져요',
    content: '누가 그러는데 빗소리는 뇌파를 안정시켜준대요. 근데 그게 아니어도 오늘 같은 날은 마음이 정돈되는 기분이에요. 여러분은 어떤 날씨에 마음이 가라앉으시나요?' },
  { board: 'emotion', title: '오늘 회사에서 혼나서 속상한 하루였어요',
    content: '팀장님이 다른 사람 앞에서 크게 지적하셔서 얼굴이 화끈거렸어요. 잘못한 건 인정하는데 방법은 따로 있었으면 좋겠어요. 집에 와서 한참 멍해 있었네요.' },
  { board: 'emotion', title: '아무한테도 말하지 못한 이야기',
    content: '여기다 털어놓을게요. 사실 몇 년째 스스로가 싫어요. 남들이 보는 내 모습이 자꾸 연기처럼 느껴져요. 진짜 나는 어딘가에 숨어 있는 것 같아요.' },

  // 마음의공간 - letter
  { board: 'letter', title: '20살의 나에게',
    content: '그때 니 선택 하나하나가 지금 나를 만들었어. 부끄러울 때도 있었지만 후회는 없어. 너무 자책하지 마. 내가 잘 버텨줄게.' },
  { board: 'letter', title: '첫사랑이었던 너에게',
    content: '너를 좋아했던 스물의 나를 조금 부끄러워했었어. 근데 이제 보니 그만큼 순수했더라. 지금 어디서든 잘 지내고 있기를.' },

  // 이야기나눔 - pet_loss
  { board: 'pet_loss', title: '고양이 유골함을 책상에 두고 있어요',
    content: '주변에선 이제 치우라고 하는데 도저히 안 되네요. 아직 혼잣말로 이름을 부르고 있어요. 제가 이상한 건 아니죠?' },
  { board: 'pet_loss', title: '산책 시간이 되면 여전히 손이 목줄로 가요',
    content: '떠난 지 넉 달째인데 오후 5시만 되면 몸이 먼저 반응해요. 일상에 새겨진 시간이라는 게 이렇게 무거운 줄 몰랐어요.' },

  // 이야기나눔 - depression
  { board: 'depression', title: '오늘도 회사는 갔어요',
    content: '거창한 일 한 건 없지만 출근해서 자리에 앉은 것만으로도 오늘은 이긴 거라 생각하려고요. 이런 날이 쌓이길 바라요.' },
  { board: 'depression', title: '상담 두 번째 회기 다녀왔어요',
    content: '첫 회기보다 조금 편해졌어요. 선생님이 "느리게 가도 돼요"라고 하셨는데 그 말이 하루 종일 남네요.' },

  // 이야기나눔 - anxiety
  { board: 'anxiety', title: '발표 있는 날이 너무 무서워요',
    content: '며칠 전부터 심장이 미리 뛰어요. 시뮬레이션도 수십 번 돌려도 실전에선 머리가 하얘져요. 불안 잘 다루시는 분 계시면 팁 공유 부탁드려요.' },
  { board: 'anxiety', title: '전화 받는 것도 힘들 때가 있어요',
    content: '카카오톡은 되는데 전화는 부담이 커요. 모르는 번호면 진동만 울려도 긴장돼요. 저만 이런 건 아니죠?' },

  // 이야기나눔 - recovery
  { board: 'recovery', title: '한 달째 운동 중이에요',
    content: '상담 선생님이 추천해주셔서 홈트 10분으로 시작했어요. 한 달 지나니 20분이 되었고 몸이 조금씩 가벼워져요.' },
  { board: 'recovery', title: '오늘 처음으로 웃으며 퇴근했어요',
    content: '진심으로 웃은 게 언제인지 기억도 안 났는데 오늘 동료가 던진 농담에 빵 터졌어요. 작은 일인데 오래 기억될 것 같아요.' },

  // 고민상담소 - love
  { board: 'love', title: '저만 좋아하는 것 같아요',
    content: '연락 빈도도 만남 횟수도 항상 제가 먼저예요. 상대가 싫어하진 않는데 적극적이지도 않아요. 이게 맞는 관계일까요?' },
  { board: 'love', title: '장거리 연애 3개월차',
    content: '주말에만 보는데 평일이 길게 느껴져요. 화상통화로는 채워지지 않는 게 있더라구요. 다들 장거리 어떻게 이겨내세요?' },

  // 고민상담소 - breakup
  { board: 'breakup', title: '이별 후 SNS 끊는 중이에요',
    content: '자꾸 보이는 게 제일 힘들어서 모든 계정을 잠시 닫았어요. 도움이 될지는 모르겠지만 일단 해보려고요.' },
  { board: 'breakup', title: '3년 연애 끝, 어떻게 정리해야 할까요',
    content: '짐이며 사진이며 뭐부터 치워야 할지 막막해요. 한꺼번에 하면 더 무너질 것 같고. 경험자분들 조언 부탁드립니다.' },

  // 고민상담소 - career
  { board: 'career', title: '스타트업 대기업 뭐가 나을까요',
    content: '둘 다 합격했는데 결정이 안 서네요. 조건은 대기업이 좋고, 재미는 스타트업 쪽 같아요. 비슷한 고민 하신 분 조언 부탁드려요.' },
  { board: 'career', title: '퇴사 후 한 달, 불안해요',
    content: '쉬려고 나왔는데 3주째 되니 조급해지네요. 비슷한 시간 보내신 분들 어떻게 버티셨나요?' },

  // 고민상담소 - family
  { board: 'family', title: '명절이 부담스러워요',
    content: '결혼 얘기, 연봉 얘기가 당연하게 나오는 자리가 싫어요. 부모님께 죄송하지만 올해는 빠지고 싶어요.' },

  // 고민상담소 - relationship
  { board: 'relationship', title: '친구 결혼식 축의금 얼마 할까요',
    content: '결혼식 한두 번 간 사이인데 최근에 우리 경조사엔 안 와줬어요. 감정 빼고 객관적으로 조언 부탁드려요.' },

  // 고민상담소 - workplace
  { board: 'workplace', title: '퇴근 5분 전에 일 던지는 분 있어요',
    content: '업무 분배가 매번 이래서 이제는 표정 관리가 안 되네요. 이런 동료 어떻게 대응하시나요?' },
  { board: 'workplace', title: '새로 온 팀원과 텃세 없이 지내는 법',
    content: '제가 신입 때 당했던 텃세는 안 물려주고 싶어요. 다들 어떤 배려 해주셨는지 알려주시면 좋겠어요.' },

  // 고민상담소 - study
  { board: 'study', title: '공부하려고 카페 가면 잠 와요',
    content: '집에선 잘 되는데 카페만 가면 10분만에 꾸벅꾸벅. 저만 그런 거 아니죠? 환경 팁 있으면 알려주세요.' },

  // 고민상담소 - parenting
  { board: 'parenting', title: '아이 스마트폰 언제 사주셨어요',
    content: '친구들 다 있다고 해서 고민 중이에요. 초등 고학년인데 아직 이르다고 느껴서요.' },

  // 힐링플레이스 - healing_food
  { board: 'healing_food', title: '혼밥할 때 제일 좋아하는 메뉴는?',
    content: '저는 김치찌개에 계란프라이예요. 간단한데 마음이 꽉 차요. 여러분의 혼밥 메뉴 궁금해요.' },
  { board: 'healing_food', title: '겨울 붕어빵 노점 찾는 재미',
    content: '동네마다 숨은 맛집이 있더라구요. 오늘은 팥 세 개, 슈크림 두 개 사 왔어요. 평생 좋아할 맛이에요.' },

  // 힐링플레이스 - healing_place
  { board: 'healing_place', title: '서울숲 조용한 코스 추천합니다',
    content: '사슴 있는 공간 반대쪽, 은행나무길이 덜 붐벼서 좋아요. 벤치도 여유로워서 책 읽기 좋습니다.' },
  { board: 'healing_place', title: '양평 북한강 자전거 길',
    content: '평일에 다녀왔는데 사람이 거의 없었어요. 바람 맞으며 달리니 머리가 텅 비는 느낌이었어요.' },

  // 힐링플레이스 - healing_book
  { board: 'healing_book', title: '"나는 나로 살기로 했다" 다시 꺼냈어요',
    content: '몇 년 전에 읽을 땐 와닿지 않았는데 지금 다시 보니 문장 하나하나가 다가와요. 책도 타이밍인가 봐요.' },
  { board: 'healing_book', title: '미움받을 용기 - 두 번째 완독',
    content: '한 번은 이론이 낯설었는데 두 번째는 적용해볼 수 있는 문장이 많았어요. 재독 추천합니다.' },

  // 힐링플레이스 - healing_movie
  { board: 'healing_movie', title: '\"인사이드 아웃 2\" 보고 펑펑 울었어요',
    content: '불안이 캐릭터로 등장하는데 너무 현실적이라 놀랐어요. 요즘의 내 감정이 저렇게 다 있다는 걸 알게 됐어요.' },
  { board: 'healing_movie', title: '겨울에 보는 \"러브 액츄얼리\"',
    content: '매년 이맘때 꺼내 보는 영화에요. 따뜻해지는 장면들 덕에 피곤한 하루가 녹아요.' },

  // 힐링플레이스 - healing_quote
  { board: 'healing_quote', title: '"무리하지 않아도 당신은 충분합니다"',
    content: '어느 책 첫 장에 있던 문장인데 하루 종일 머리에 맴돌아서 여기에 적어둡니다.' },

  // 힐링플레이스 - healing_etc
  { board: 'healing_etc', title: '라벤더 향이 좋아서 공유합니다',
    content: '디퓨저를 바꾸고 나서 잠이 좋아졌어요. 자극 없는 향이 필요하신 분께 추천드려요.' },
  { board: 'healing_etc', title: '필사가 의외로 좋아요',
    content: '좋아하는 문장을 노트에 한 줄씩 적기만 해도 마음이 정돈되더라구요. 10분이면 충분해요.' },

  // 커뮤니티 - daily
  { board: 'daily', title: '오늘의 작은 기쁨',
    content: '출근길 편의점에서 좋아하는 음료가 1+1이었어요. 별거 아닌데 괜히 하루가 잘 풀릴 것 같아요.' },
  { board: 'daily', title: '퇴근하고 집 정리하고 끝',
    content: '30분만에 거실 정돈하고 이불빨래 돌렸어요. 저녁은 라면 하나. 대만족이에요.' },

  // 커뮤니티 - community_free
  { board: 'community_free', title: '요즘 다들 뭐 보세요?',
    content: '넷플릭스 리스트가 텅텅 비었네요. 최근에 재밌게 보신 드라마나 예능 추천 부탁드려요!' },

  // 커뮤니티 - tips
  { board: 'tips', title: '아침 루틴 3가지만 추천해주세요',
    content: '하루가 엉망이라 아침을 바꿔보려 해요. 부담 적은 것 위주로 추천 받고 싶습니다.' },
];

if (POSTS.length !== 40) {
  console.error('POSTS count mismatch:', POSTS.length);
  process.exit(1);
}

const COMMENT_POOL = [
  '공감해요. 저도 오늘 비슷한 기분이었어요.',
  '읽는데 울컥했어요. 토닥토닥.',
  '좋은 글 감사합니다.',
  '저도 해볼게요. 팁 공유 감사합니다.',
  '마음 잘 챙기세요. 응원할게요.',
  '혼자가 아니에요. 같이 가요.',
  '저도 같은 마음이라 댓글 남겨요.',
  '도움 됐어요. 덕분에 한 줄이라도 적어봅니다.',
  '이 글 덕에 오늘 하루가 조금 따뜻해졌어요.',
  '무리하지 마세요. 잘하고 계세요.',
  '별 거 아닌 하루도 이렇게 기록하니 반짝여 보이네요.',
  '저도 그 책/영화 봐야겠어요. 추천 고마워요.',
  '저도 그 장소 가본 적 있어요. 진짜 좋았어요.',
  '공감글이라 오래 머물렀어요. 감사합니다.',
  '천천히 가도 괜찮아요. 저도 지금 그렇게 지내요.',
  '읽는 동안 마음이 차분해졌어요.',
  '저는 이럴 때 산책해요. 바깥 공기가 도움돼요.',
  '조금 쉬어도 돼요. 누가 뭐라 해도요.',
  '이 글 저장해둘게요. 필요할 때 다시 꺼내 보려고요.',
  '저도 오래 고민한 적 있어요. 결국은 천천히 지나가더라구요.',
];

function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function pickN(a, n) { const c = [...a]; const o = []; for (let i = 0; i < n && c.length; i++) o.push(c.splice(Math.floor(Math.random() * c.length), 1)[0]); return o; }

// 최근 6일 사이에 분산된 시간 생성
function randomRecentIso() {
  const now = Date.now();
  const sixDaysAgo = now - 6 * 24 * 3600 * 1000;
  const t = sixDaysAgo + Math.random() * (now - sixDaysAgo);
  return new Date(t).toISOString();
}

async function insertPost(userId, board_type, title, content, created_at) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
    method: 'POST',
    headers: { ...hdr, Prefer: 'return=representation' },
    body: JSON.stringify({
      user_id: userId, board_type, title, content,
      is_anonymous: Math.random() < 0.18,
      is_public: true,
      created_at,
    }),
  });
  if (!res.ok) return { ok: false, status: res.status, err: await res.text() };
  const rows = await res.json();
  return { ok: true, id: rows[0].id };
}

async function insertComment(postId, userId, content, parentId = null, created_at = null) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
    method: 'POST',
    headers: { ...hdr, Prefer: 'return=representation' },
    body: JSON.stringify({
      post_id: postId, user_id: userId, parent_id: parentId, content,
      is_anonymous: Math.random() < 0.12,
      ...(created_at ? { created_at } : {}),
    }),
  });
  if (!res.ok) return { ok: false, status: res.status, err: await res.text() };
  const rows = await res.json();
  return { ok: true, id: rows[0].id };
}

async function insertEmpathy(postId, userId) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/empathies`, {
    method: 'POST',
    headers: { ...hdr, Prefer: 'return=representation,resolution=ignore-duplicates' },
    body: JSON.stringify({ post_id: postId, user_id: userId }),
  });
  return res.ok;
}

const users = await listVirtualUsers();
if (users.length < 5) { console.error('virtual 유저 부족:', users.length); process.exit(1); }
console.log(`virtual 유저 ${users.length}명`);

const created = [];
let fail = 0;

for (let i = 0; i < POSTS.length; i++) {
  const p = POSTS[i];
  const author = pick(users);
  const createdAt = randomRecentIso();
  const r = await insertPost(author.id, p.board, p.title, p.content, createdAt);
  if (r.ok) {
    created.push({ id: r.id, author, createdAt });
    console.log(`[POST ${i + 1}/${POSTS.length}] OK ${p.board} · ${p.title.slice(0, 24)}`);
  } else {
    fail++;
    console.log(`[POST ${i + 1}/${POSTS.length}] FAIL ${r.status} ${r.err.slice(0, 200)}`);
  }
  await new Promise((r) => setTimeout(r, 60));
}

console.log(`\n게시글 성공 ${created.length} / 실패 ${fail}\n`);

let commentOk = 0, commentFail = 0, empathyOk = 0;

for (const post of created) {
  const n = 1 + Math.floor(Math.random() * 5); // 1~5
  const candidates = users.filter((u) => u.id !== post.author.id);
  const commenters = pickN(candidates, n);
  const postTs = new Date(post.createdAt).getTime();
  const nowTs = Date.now();
  for (const c of commenters) {
    // 댓글은 글 작성 시각 ~ 지금 사이 랜덤
    const ct = new Date(postTs + Math.random() * Math.max(1, nowTs - postTs)).toISOString();
    const r = await insertComment(post.id, c.id, pick(COMMENT_POOL), null, ct);
    if (r.ok) {
      commentOk++;
      if (Math.random() < 0.25) {
        const replyAuthor = pick(users);
        const rt = new Date(new Date(ct).getTime() + Math.random() * 3600 * 1000).toISOString();
        const rr = await insertComment(post.id, replyAuthor.id, pick(COMMENT_POOL), r.id, rt);
        if (rr.ok) commentOk++; else commentFail++;
        await new Promise((r) => setTimeout(r, 40));
      }
    } else commentFail++;
    await new Promise((r) => setTimeout(r, 40));
  }
  const empathizers = pickN(users, 2 + Math.floor(Math.random() * 9));
  for (const e of empathizers) {
    const ok = await insertEmpathy(post.id, e.id);
    if (ok) empathyOk++;
    await new Promise((r) => setTimeout(r, 20));
  }
}

console.log(`댓글/대댓글 성공 ${commentOk} / 실패 ${commentFail}`);
console.log(`공감 성공 ${empathyOk}`);
