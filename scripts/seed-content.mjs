// 테스트 더미 게시글 50개 + 댓글 다수 생성
// 실행: node scripts/seed-content.mjs

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

// 1) 사용자 목록 확보 (test01~test40)
async function listTestUsers() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/users?select=id,nickname,email&email=like.test*@in-mind.dev&order=email.asc`,
    { headers: hdr }
  );
  if (!res.ok) throw new Error(`users list failed ${res.status} ${await res.text()}`);
  return res.json();
}

const BOARDS = [
  'emotion',
  'letter',
  'pet_loss',
  'depression',
  'anxiety',
  'recovery',
  'love',
  'career',
  'marriage',
  'family',
  'relationship',
  'workplace',
  'study',
  'parenting',
  'healing_food',
  'healing_place',
  'healing_book',
  'healing_movie',
  'healing_quote',
  'healing_etc',
  'daily',
  'community_free',
  'tips',
];

const POST_TEMPLATES = [
  {
    board: 'emotion',
    title: '오늘 하루가 너무 길게 느껴지네요',
    content:
      '별다른 일이 있었던 건 아닌데 마음이 무거워요. 이런 날은 다들 어떻게 보내시나요? 따뜻한 차 한 잔 마시면서 조금 가라앉히는 중입니다.',
  },
  {
    board: 'emotion',
    title: '요즘 자주 울컥해요',
    content:
      '예전엔 잘 안 그랬는데 요즘은 사소한 말에도 눈물이 나요. 나이가 들수록 약해지는 건지, 아니면 그만큼 피곤한 건지 잘 모르겠습니다.',
  },
  {
    board: 'letter',
    title: '과거의 나에게',
    content:
      '그때 그 선택을 후회하지 않기를 바랐지만, 지금 보니 그때가 가장 애썼던 시간이었어요. 잘 버텨줘서 고마워. 앞으로도 우리 너무 몰아세우지 말자.',
  },
  {
    board: 'pet_loss',
    title: '강아지를 떠나보냈어요',
    content:
      '15년을 함께했던 우리 아이가 어제 하늘나라로 갔어요. 집에 돌아왔는데 현관에 마중나오는 소리가 없어서 자꾸 귀가 먹먹해져요.',
  },
  {
    board: 'pet_loss',
    title: '아직도 발소리가 들리는 것 같아요',
    content:
      '떠나보낸 지 두 달이 되었는데 아직도 부엌에서 뭔가 할 때면 뒤에서 소리가 나는 것 같아요. 잊는 게 맞는 건지 붙잡고 있는 게 맞는 건지 모르겠습니다.',
  },
  {
    board: 'depression',
    title: '이불 밖으로 나오기가 너무 힘들어요',
    content:
      '요즘 아침이 너무 무서워요. 일어나야 하는 걸 아는데 몸이 천근만근이네요. 비슷한 경험 있으신 분들은 어떻게 견디셨나요?',
  },
  {
    board: 'depression',
    title: '약을 먹기 시작했어요',
    content:
      '용기내서 병원을 다녀왔어요. 처음엔 거부감이 있었는데 지금은 잘한 선택 같아요. 혼자 버티지 않아도 된다는 말을 늦게나마 들어서 다행입니다.',
  },
  {
    board: 'anxiety',
    title: '가슴이 자주 답답해요',
    content:
      '특별한 이유 없이 가슴이 조이는 느낌이 자꾸 와요. 이게 공황인지 그냥 스트레스인지 헷갈립니다. 병원을 가봐야 할까요?',
  },
  {
    board: 'anxiety',
    title: '잠들기 전이 제일 무서워요',
    content:
      '낮엔 그래도 버티는데 불 끄고 누우면 온갖 생각이 쏟아져요. 유튜브 ASMR 틀고 겨우 잠드는 편인데 다들 어떻게 하시나요?',
  },
  {
    board: 'recovery',
    title: '한 달만에 바깥 산책을 했어요',
    content:
      '오랜만에 집 근처 공원을 30분 걸었어요. 햇살이 이렇게 따뜻했었나 싶었어요. 작은 걸음인데도 스스로 대견합니다.',
  },
  {
    board: 'recovery',
    title: '다시 책을 읽을 수 있게 됐어요',
    content:
      '몇 달 동안은 글자가 눈에 안 들어왔는데 요즘엔 조금씩 읽히기 시작했어요. 회복은 정말 느리게 오네요.',
  },
  {
    board: 'love',
    title: '연애가 어려워요',
    content:
      '좋아하는 사람한테 다가가는 게 늘 어색해요. 먼저 연락하는 것도 부담스럽고. 다들 어떻게 시작하시나요?',
  },
  {
    board: 'love',
    title: '썸의 끝은 어디일까요',
    content:
      '두 달째 같은 패턴이에요. 만나면 좋은데 관계는 제자리. 마음을 정리해야 하는 건지 조금 더 기다려야 하는 건지.',
  },
  {
    board: 'career',
    title: '이직을 고민 중이에요',
    content:
      '지금 회사에 남으면 안정은 있는데 성장이 안 느껴져요. 반대로 이직은 변수 투성이고. 다들 결정 기준 어떻게 잡으셨어요?',
  },
  {
    board: 'career',
    title: '서른 중반, 커리어가 흐릿해요',
    content:
      '10년을 한 업계에서 보냈는데 내가 뭘 잘하는지 점점 모르겠어요. 이런 감정 느껴보신 분 있나요?',
  },
  {
    board: 'marriage',
    title: '결혼 준비가 힘드네요',
    content:
      '상견례부터 예단까지 하나하나가 마찰 포인트네요. 다투는 게 늘어나서 괜히 지쳐요. 미리 정해두면 좋은 것들 공유 부탁드려요.',
  },
  {
    board: 'family',
    title: '엄마랑 대화가 안 돼요',
    content:
      '말만 꺼내면 결론이 잔소리로 끝나요. 사랑하는 거 아는데 지치네요. 거리두는 게 답일까요.',
  },
  {
    board: 'family',
    title: '아빠가 편찮으세요',
    content:
      '갑작스레 검사 결과가 나왔어요. 마음이 너무 복잡한데 가족 앞에선 괜찮은 척을 해야 해서 더 힘드네요.',
  },
  {
    board: 'relationship',
    title: '친구를 잃는 중인 것 같아요',
    content:
      '10년지기인데 요즘 대화가 줄었어요. 먼저 연락하기도 지쳐서 그냥 두고 있는 중인데 이게 맞나 싶네요.',
  },
  {
    board: 'workplace',
    title: '팀장이 자꾸 말을 바꿔요',
    content:
      '어제 오케이 했던 걸 오늘 다시 처음부터 하라고 해요. 기록을 남겨도 바뀌는 속도가 더 빠릅니다. 스트레스 관리 팁 부탁드려요.',
  },
  {
    board: 'workplace',
    title: '퇴근 후에도 일 생각이 떠나질 않아요',
    content:
      '침대에 누워도 내일 할 일이 머릿속에서 돌아요. 주말까지 이러니 쉰 것 같지가 않네요.',
  },
  {
    board: 'study',
    title: '자격증 시험 두 달 남았어요',
    content:
      '플랜은 세웠는데 실천이 안 돼요. 다들 집중 안 될 때 어떻게 끌어올리시나요?',
  },
  {
    board: 'parenting',
    title: '첫째가 동생 질투를 해요',
    content:
      '둘째가 태어난 뒤로 퇴행 행동이 많아졌어요. 혼내기도 미안하고 달래기도 조심스럽습니다.',
  },
  {
    board: 'healing_food',
    title: '추운 날엔 고깃국이 진리네요',
    content:
      '어릴 때 엄마가 해주던 소고기 뭇국을 드디어 비슷하게 재현했어요. 별 거 아닌데 마음이 따뜻해집니다.',
  },
  {
    board: 'healing_food',
    title: '혼자 해 먹는 오므라이스',
    content:
      '계란을 말다가 찢어져도 맛은 있습니다. 오늘의 나에게 주는 작은 보상이에요.',
  },
  {
    board: 'healing_place',
    title: '속초 바다 추천합니다',
    content:
      '비수기에 다녀왔는데 사람도 적고 파도 소리만 가득했어요. 머리 복잡할 때 가기 좋더라구요.',
  },
  {
    board: 'healing_place',
    title: '동네 도서관이 힐링이에요',
    content:
      '멀리 안 가도 되는 쉼터가 있어서 다행입니다. 햇살 드는 창가 자리가 최고예요.',
  },
  {
    board: 'healing_book',
    title: '"아몬드" 다시 읽고 있어요',
    content:
      '감정을 잘 모르는 주인공 이야기인데 읽을수록 내가 위로받는 기분이에요. 추천드립니다.',
  },
  {
    board: 'healing_book',
    title: '한강 "작별하지 않는다"',
    content:
      '쉽게 읽히진 않지만 마음에 오래 남아요. 슬픔을 다루는 방식이 인상적이었습니다.',
  },
  {
    board: 'healing_movie',
    title: '"리틀 포레스트"가 최고에요',
    content:
      '볼 때마다 위로받아요. 조용한 장면이 많은데 그게 오히려 좋더라구요.',
  },
  {
    board: 'healing_movie',
    title: '지브리 영화 밤새 보기',
    content:
      '컨디션 안 좋을 때 지브리 틀면 마음이 내려앉아요. 추천 순위 알려주시면 다 볼 예정입니다.',
  },
  {
    board: 'healing_quote',
    title: '"괜찮아, 오늘은 여기까지"',
    content:
      '요즘 제일 자주 되뇌는 말이에요. 스스로한테 허락해주는 말이 필요하더라구요.',
  },
  {
    board: 'healing_quote',
    title: '"애쓰지 말고, 다만 흐르자"',
    content:
      '힘줘서 살지 말자는 다짐입니다. 오늘도 조금은 흘러가보려 해요.',
  },
  {
    board: 'healing_etc',
    title: '10분 명상 앱 추천 받을 수 있을까요',
    content:
      '무료 위주로 써보고 있는데 뭔가 다 비슷해서요. 여러분의 인생 앱 있으신가요?',
  },
  {
    board: 'daily',
    title: '퇴근길 노을이 너무 예뻤어요',
    content:
      '사진으로 다 안 담기던데 오늘은 진짜 장관이었어요. 이런 날은 하루가 좀 덜 피곤한 것 같습니다.',
  },
  {
    board: 'daily',
    title: '커피 한 잔의 여유',
    content:
      '바쁜 오전 일 처리하고 10분 쉬는 중입니다. 따뜻한 아메리카노 한 잔이 오늘의 동력이에요.',
  },
  {
    board: 'daily',
    title: '세탁소 아저씨가 덤 주셨어요',
    content:
      '매주 드리던 와이셔츠 한 벌을 서비스로 해주셨어요. 별 거 아닌데 하루가 따뜻해졌네요.',
  },
  {
    board: 'community_free',
    title: '비 오는 날 좋아하시는 분?',
    content:
      '저는 창문 열고 빗소리 듣는 게 제일 좋아요. 동료들은 다 싫어하는데 이 마음 알아주실 분 계실까요.',
  },
  {
    board: 'community_free',
    title: '회사에서 다들 점심 혼자 드시나요?',
    content:
      '요즘은 혼자가 편해서 샌드위치 들고 공원 벤치에 앉아요. 다들 어떻게 보내세요?',
  },
  {
    board: 'community_free',
    title: '주말인데 뭐하고 계세요',
    content:
      '침대랑 한 몸이 된 지 3시간째입니다. 다들 뭐하세요.',
  },
  {
    board: 'tips',
    title: '잠 잘 오는 루틴 공유합니다',
    content:
      '자기 두 시간 전에 핸드폰 멀리 두고 따뜻한 물 한 잔 마시기. 단순한데 이게 제일 효과 좋더라구요.',
  },
  {
    board: 'tips',
    title: '불안할 때 4-7-8 호흡 해보세요',
    content:
      '숨을 4초 들이마시고 7초 참고 8초 내쉬는 방법입니다. 급할 때 덜 흔들리게 도와줘요.',
  },
  {
    board: 'tips',
    title: '감정일기 앱 후기',
    content:
      '3주 정도 쓰니까 내가 어떤 상황에 예민해지는지 패턴이 보이더라구요. 상담 전 자료로도 유용합니다.',
  },
  {
    board: 'emotion',
    title: '혼자 있는 시간이 편해요',
    content:
      '예전엔 외로움이 싫었는데 요즘은 혼자 있는 게 좋아요. 이게 성장인지 회피인지는 잘 모르겠지만요.',
  },
  {
    board: 'daily',
    title: '오늘의 작은 성공',
    content:
      '미루던 은행 업무를 해치웠습니다. 별 거 아닌데 저한테는 큰 일이었어요.',
  },
  {
    board: 'healing_etc',
    title: '따뜻한 목욕은 만능이에요',
    content:
      '반신욕 20분이면 웬만한 피곤이 풀리네요. 입욕제는 무향이 제일 좋습니다.',
  },
  {
    board: 'community_free',
    title: '새벽에 깨면 뭐 하세요?',
    content:
      '3시쯤 깨서 다시 잠이 안 올 때가 있어요. 그런 시간 다들 뭐 하시는지 궁금합니다.',
  },
  {
    board: 'letter',
    title: '10년 뒤의 나에게',
    content:
      '너무 많은 걸 이루려고 애쓰지 않았으면 좋겠어. 지금의 나도 충분히 잘하고 있다는 걸 기억해줘.',
  },
  {
    board: 'recovery',
    title: '아침에 커튼을 여는 것부터',
    content:
      '거창한 변화는 없어요. 다만 커튼 여는 일을 거르지 않기로 했어요. 그거면 충분합니다.',
  },
  {
    board: 'healing_quote',
    title: '"지금 이 순간도 지나갑니다"',
    content:
      '힘든 감정도 영원하지 않다는 걸 요즘 많이 되뇝니다. 여러분도 지나가게 될 거예요.',
  },
];

const COMMENT_POOL = [
  '저도 비슷한 마음이에요. 오늘 하루 잘 보내셨으면 좋겠어요.',
  '위로가 됐습니다. 감사해요.',
  '응원합니다. 무리하지 마세요.',
  '저도 그런 날 있어요. 혼자가 아니에요.',
  '읽으면서 괜히 울컥했어요. 힘내세요.',
  '토닥토닥. 오늘 하루 고생하셨어요.',
  '글 잘 읽었어요. 저도 도전해볼게요.',
  '댓글로만 닿아도 조금 덜 외롭더라구요.',
  '푹 쉬세요. 잠이 약이에요.',
  '공감해요. 저는 요즘 산책으로 버티는 중이에요.',
  '좋은 팁 감사합니다. 오늘부터 해볼게요.',
  '따뜻한 말 한 줄이 필요했는데 덕분에 찾았어요.',
  '저도 그 책 읽어볼게요. 추천 감사해요.',
  '댓글 달고 싶은 글이었어요.',
  '잘 버텨온 나를 칭찬해주세요. 충분해요.',
  '도움 많이 됐습니다.',
  '저랑 비슷하네요. 커피 한 잔 드세요!',
  '너무 애쓰지 마세요. 지금도 충분합니다.',
  '조금씩 천천히, 같이 가요.',
  '힘든 마음 나눠주셔서 고맙습니다.',
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

async function insertPost(userId, board_type, title, content) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
    method: 'POST',
    headers: { ...hdr, Prefer: 'return=representation' },
    body: JSON.stringify({
      user_id: userId,
      board_type,
      title,
      content,
      is_anonymous: Math.random() < 0.2,
      is_public: true,
    }),
  });
  if (!res.ok) {
    return { ok: false, status: res.status, err: await res.text() };
  }
  const rows = await res.json();
  return { ok: true, id: rows[0].id };
}

async function insertComment(postId, userId, content, parentId = null) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
    method: 'POST',
    headers: { ...hdr, Prefer: 'return=representation' },
    body: JSON.stringify({
      post_id: postId,
      user_id: userId,
      parent_id: parentId,
      content,
      is_anonymous: Math.random() < 0.15,
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

const users = await listTestUsers();
if (users.length < 5) {
  console.error('test 유저가 부족합니다:', users.length);
  process.exit(1);
}
console.log(`test 유저 ${users.length}명 확인`);

// 50개 만들기 (템플릿 길이가 모자라면 랜덤 반복)
const postsToCreate = [];
for (let i = 0; i < 50; i++) {
  const tpl = POST_TEMPLATES[i % POST_TEMPLATES.length];
  postsToCreate.push(tpl);
}

const createdPosts = [];
let postFail = 0;

for (let i = 0; i < postsToCreate.length; i++) {
  const p = postsToCreate[i];
  const author = pick(users);
  const r = await insertPost(author.id, p.board, p.title, p.content);
  if (r.ok) {
    createdPosts.push({ id: r.id, author });
    console.log(`[POST ${i + 1}/50] OK (${p.board}) ${p.title.slice(0, 20)}`);
  } else {
    postFail++;
    console.log(`[POST ${i + 1}/50] FAIL ${r.status} ${r.err}`);
  }
  await new Promise((r) => setTimeout(r, 80));
}

console.log(`---\n게시글 성공: ${createdPosts.length} / 실패: ${postFail}\n---`);

// 댓글: 각 글에 1~5개, 30% 확률로 대댓글
let commentOk = 0;
let commentFail = 0;
let empathyOk = 0;

for (const post of createdPosts) {
  const commenters = pickN(
    users.filter((u) => u.id !== post.author.id),
    1 + Math.floor(Math.random() * 5)
  );
  const createdCommentIds = [];
  for (const c of commenters) {
    const text = pick(COMMENT_POOL);
    const r = await insertComment(post.id, c.id, text);
    if (r.ok) {
      commentOk++;
      createdCommentIds.push({ id: r.id, author: c });
      // 대댓글 확률
      if (Math.random() < 0.3) {
        const replyAuthor = pick(users);
        const rr = await insertComment(post.id, replyAuthor.id, pick(COMMENT_POOL), r.id);
        if (rr.ok) commentOk++;
        else commentFail++;
        await new Promise((r) => setTimeout(r, 50));
      }
    } else {
      commentFail++;
      console.log('comment fail', r.status, r.err);
    }
    await new Promise((r) => setTimeout(r, 60));
  }

  // 공감도 3~10명
  const empathizers = pickN(users, 3 + Math.floor(Math.random() * 8));
  for (const e of empathizers) {
    const ok = await insertEmpathy(post.id, e.id);
    if (ok) empathyOk++;
    await new Promise((r) => setTimeout(r, 30));
  }
}

console.log('---');
console.log(`댓글/대댓글 성공: ${commentOk} / 실패: ${commentFail}`);
console.log(`공감 성공: ${empathyOk}`);
