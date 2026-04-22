// 새 글 올라오면 즉시(0~3초) 랜덤 가상 유저가 자연스러운 공감 댓글 + 공감 몇 개를 남기도록 예약.
// Vercel serverless는 응답 후 인스턴스가 꺼질 수 있어서 짧은 지연으로 함.
// 장기적으로는 pg-cron 또는 Vercel Cron 도입 권장.

import { createAdminClient } from './supabase-admin';

type MoodKind =
  | 'sad' | 'happy' | 'angry' | 'anxious' | 'tired' | 'neutral'
  | 'love' | 'pet' | 'healing' | 'career' | 'family';

const RESPONSES: Record<MoodKind, string[]> = {
  sad: [
    '저도 오늘 비슷한 마음이었어요. 같이 버텨요.',
    '읽다가 괜히 울컥했어요. 토닥토닥.',
    '오늘은 그냥 푹 쉬셔도 돼요.',
    '무거운 마음 한 줄이라도 꺼내주셔서 고맙습니다.',
    '혼자가 아니에요. 저도 옆에 있다고 생각해주세요.',
  ],
  happy: [
    '덕분에 저도 기분이 좋아졌어요!',
    '이런 하루가 쌓이길 바라요.',
    '별거 아닌데 반짝이는 순간들이 소중해요.',
    '좋은 기운 받아갑니다 :)',
    '읽는 것만으로도 따뜻해지네요.',
  ],
  angry: [
    '진짜 고생 많으셨어요. 숨 한 번 깊게요.',
    '아오 저도 같이 화나네요.',
    '속 많이 상하셨겠다. 글로라도 풀어주세요.',
    '그 상황 저도 겪어봐서 알아요. 무리하지 마세요.',
  ],
  anxious: [
    '불안할 땐 숨이 제일이에요. 4초 들이쉬고 8초 내쉬기.',
    '저도 같은 마음일 때가 많아요. 혼자 아니에요.',
    '지금 이 순간도 곧 지나가요. 잘 버티고 계세요.',
    '불안은 과거나 미래를 보는 신호라네요. 지금에 머물러봐요.',
  ],
  tired: [
    '오늘은 그냥 쉬셔도 돼요. 진짜로요.',
    '고생 많으셨어요. 따뜻한 물 한 잔 꼭 드세요.',
    '피곤함도 오래 쌓이면 병이래요. 꼭 푹 주무세요.',
    '별 거 아닌데 이런 한 줄이 위로가 돼요.',
  ],
  neutral: [
    '한 줄이라도 남겨주셔서 고마워요.',
    '저도 오늘 비슷한 하루였어요.',
    '읽어보고 갑니다. 편안한 밤 되세요.',
    '여기 다녀가신 것만으로도 충분해요.',
  ],
  love: [
    '저도 연애할 때 그랬어요. 조급해하지 마세요.',
    '마음 가는 방향 따라가시면 돼요.',
    '혼자 고민 많으셨을 것 같아요. 응원할게요.',
  ],
  pet: [
    '마음이 아프네요. 잘 보내드리셨어요.',
    '저도 비슷한 시간을 지나봐서 알아요. 같이 기억해줄게요.',
    '아직 곁에 있는 기분이 드는 거 자연스러워요.',
  ],
  healing: [
    '이 글 저장해둘게요. 저도 꼭 해볼게요.',
    '덕분에 오늘 하루가 조금 가벼워졌어요. 고마워요.',
    '이런 소소한 팁이 제일 큰 위로예요.',
  ],
  career: [
    '고민 많으셨겠네요. 정답은 없지만 본인 직감을 믿어요.',
    '저도 비슷한 분기점에 있어요. 같이 고민해요.',
  ],
  family: [
    '가족 일은 제일 어려워요. 마음 잘 챙기세요.',
    '가까운 사이일수록 더 아프죠. 조심히 지나가길.',
  ],
};

function classify(content: string, board: string): MoodKind {
  const c = content.toLowerCase();
  if (board === 'pet_loss') return 'pet';
  if (board === 'love' || board === 'breakup' || board === 'marriage') return 'love';
  if (board.startsWith('healing_') || board === 'tips') return 'healing';
  if (board === 'career' || board === 'workplace' || board === 'study') return 'career';
  if (board === 'family' || board === 'parenting') return 'family';

  if (/우울|슬프|눈물|울컥|외로|힘들|무너/.test(content)) return 'sad';
  if (/좋아요|기쁘|행복|즐거|반짝|웃/.test(content)) return 'happy';
  if (/화나|짜증|열받|빡쳐|싫어/.test(content)) return 'angry';
  if (/불안|걱정|두려|무서|초조/.test(content)) return 'anxious';
  if (/피곤|지쳐|힘빠|졸려|잠/.test(content)) return 'tired';
  if (c.length < 30) return 'neutral';
  return 'neutral';
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** 새 게시글에 대해 랜덤 지연 후 가상 유저 1~2명의 공감 댓글 + 공감 2~6개 자동 삽입. */
export function scheduleAutoEngagement(opts: {
  postId: string;
  boardType: string;
  content: string;
  authorUserId: string;
}) {
  const { postId, boardType, content, authorUserId } = opts;
  const kind = classify(content, boardType);
  // 첫 댓글: 0~2초 후 (API 응답이 이미 나간 뒤)
  const firstDelay = Math.random() * 2_000;

  const run = async () => {
    try {
      const admin = createAdminClient();

      // 봇 후보(본인 제외, is_virtual=true 랜덤 80명 중)
      const { data: candidates } = await admin
        .from('users')
        .select('id, nickname')
        .eq('is_virtual', true)
        .neq('id', authorUserId)
        .limit(80);
      if (!candidates || candidates.length === 0) return;

      // 첫 공감 댓글
      const commenter = candidates[Math.floor(Math.random() * candidates.length)];
      const commentText = pick(RESPONSES[kind]);
      await admin.from('comments').insert({
        post_id: postId,
        user_id: commenter.id,
        content: commentText,
        is_anonymous: Math.random() < 0.1,
      });

      // 공감 2~6명 (본인 제외 랜덤)
      const empathizerCount = 2 + Math.floor(Math.random() * 5);
      const empathizers: { id: string }[] = [];
      const pool = [...candidates];
      for (let i = 0; i < empathizerCount && pool.length > 0; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        empathizers.push(pool.splice(idx, 1)[0]);
      }
      for (const e of empathizers) {
        try {
          await admin
            .from('empathies')
            .insert({ post_id: postId, user_id: e.id });
        } catch {}
      }

      // 35% 확률로 추가 댓글 1개 더 (1~5초 뒤)
      if (Math.random() < 0.35) {
        await new Promise((r) => setTimeout(r, 1_000 + Math.random() * 4_000));
        const c2 = candidates[Math.floor(Math.random() * candidates.length)];
        if (c2.id !== commenter.id) {
          await admin.from('comments').insert({
            post_id: postId,
            user_id: c2.id,
            content: pick(RESPONSES[kind]),
            is_anonymous: Math.random() < 0.1,
          });
        }
      }
    } catch {
      // 실패해도 무시
    }
  };

  // Vercel 타임아웃 이슈를 피하려고 waitUntil 비슷한 "fire-and-forget" 전략 사용
  // (Edge 가 아닌 기본 Node 런타임에서는 짧은 delay 만 실행됨)
  setTimeout(run, firstDelay);
}
