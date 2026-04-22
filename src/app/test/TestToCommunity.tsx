'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import styles from './testToCommunity.module.css';

// 각 테스트 결과 → 추천 게시판
const TEST_TO_BOARDS: Record<string, { boards: string[]; label: string }> = {
  phq9: { boards: ['depression', 'emotion', 'recovery'], label: '우울을 이야기하는 공간' },
  gad7: { boards: ['anxiety', 'emotion'], label: '불안을 나누는 공간' },
  stress: { boards: ['workplace', 'daily', 'healing_etc'], label: '스트레스 풀이방' },
  insomnia: { boards: ['anxiety', 'healing_etc', 'tips'], label: '잠 못 드는 밤의 공간' },
  'self-esteem': { boards: ['emotion', 'recovery'], label: '나를 알아가는 공간' },
  burnout: { boards: ['workplace', 'career', 'healing_etc'], label: '지친 마음의 공간' },
  'mbti-lite': { boards: ['daily', 'community_free'], label: '같은 유형 수다방' },
  enneagram: { boards: ['daily', 'community_free'], label: '같은 유형 수다방' },
  big5: { boards: ['daily', 'community_free'], label: '성향 이야기' },
  introvert: { boards: ['community_free', 'daily'], label: '조용한 사람들' },
  attachment: { boards: ['love', 'relationship'], label: '관계 이야기' },
  'love-languages': { boards: ['love', 'marriage'], label: '연애 이야기' },
  'love-style': { boards: ['love', 'relationship'], label: '연애 이야기' },
  'breakup-recovery': { boards: ['breakup', 'recovery'], label: '이별을 지나는 사람들' },
  hsp: { boards: ['emotion', 'healing_etc'], label: '섬세한 사람들의 방' },
  perfectionism: { boards: ['workplace', 'emotion'], label: '완벽주의자 수다방' },
  'self-care': { boards: ['healing_etc', 'tips', 'daily'], label: '나를 돌보는 이야기' },
  'mind-color': { boards: ['emotion', 'letter'], label: '마음 털어놓는 공간' },
  'healing-style': { boards: ['healing_place', 'healing_etc'], label: '힐링 공간' },
  'comfort-style': { boards: ['emotion', 'community_free'], label: '위로 주고 받는 곳' },
  'animal-face': { boards: ['community_free', 'daily'], label: '동물상 이야기' },
  'food-type': { boards: ['healing_food', 'community_free'], label: '먹는 이야기' },
  beverage: { boards: ['healing_food', 'daily'], label: '일상 한 잔' },
  'drama-character': { boards: ['healing_movie', 'community_free'], label: '드라마 수다방' },
  'past-life': { boards: ['community_free', 'daily'], label: 'MZ 잡담방' },
  'cat-or-dog': { boards: ['pet_loss', 'community_free'], label: '반려동물 이야기' },
};

interface Post {
  id: string;
  title: string;
  board_type: string;
  content: string;
  created_at: string;
}

export default function TestToCommunity({ testId }: { testId: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const config = TEST_TO_BOARDS[testId];

  useEffect(() => {
    if (!config) return;
    const supabase = createClient();
    supabase
      .from('posts')
      .select('id, title, board_type, content, created_at')
      .in('board_type', config.boards)
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setPosts(data as Post[]);
      });
  }, [testId, config]);

  if (!config || posts.length === 0) return null;

  return (
    <div className={styles.box}>
      <div className={styles.head}>
        <Sparkles size={16} className={styles.sparkle} />
        <span className={styles.title}>{config.label}에서 진짜 이야기들</span>
      </div>
      <ul className={styles.list}>
        {posts.map((p) => {
          const plain = p.content.replace(/<[^>]*>/g, '').slice(0, 60);
          return (
            <li key={p.id}>
              <Link href={`/post/${p.id}`} className={styles.item}>
                <span className={styles.itemTitle}>{p.title}</span>
                <span className={styles.itemDesc}>{plain}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href={`/board/${config.boards[0]}`} className={styles.more}>
        <MessageCircle size={14} />
        같이 이야기 나눠볼래요?
      </Link>
    </div>
  );
}
