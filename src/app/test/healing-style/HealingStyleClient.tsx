'use client';

import { Sprout } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '지친 하루, 가장 회복되는 활동은?', options: [
    { label: '침대에서 아무것도 안 하기', weights: { rest: 1 } },
    { label: '자연이 있는 곳 걷기', weights: { nature: 1 } },
    { label: '친한 사람과 수다', weights: { people: 1 } },
    { label: '나만의 취미 몰입', weights: { create: 1 } },
    { label: '몸을 움직이는 운동', weights: { active: 1 } },
    { label: '맛있는 음식 먹기', weights: { food: 1 } },
  ]},
  { text: '여행을 간다면?', options: [
    { label: '조용한 숙소에서 아무것도 안 하기', weights: { rest: 1 } },
    { label: '바다, 숲, 산 같은 자연', weights: { nature: 1 } },
    { label: '친구·연인과 함께 와글와글', weights: { people: 1 } },
    { label: '혼자 책·사진·글쓰기', weights: { create: 1 } },
    { label: '액티비티 가득한 일정', weights: { active: 1 } },
    { label: '현지 맛집 탐방', weights: { food: 1 } },
  ]},
  { text: '마음이 제일 편해지는 장면은?', options: [
    { label: '이불 속 낮잠', weights: { rest: 1 } },
    { label: '산책 중 스치는 바람', weights: { nature: 1 } },
    { label: '사랑하는 사람의 웃음', weights: { people: 1 } },
    { label: '좋아하는 걸 완성한 순간', weights: { create: 1 } },
    { label: '운동 후 땀 흘린 뒤', weights: { active: 1 } },
    { label: '따뜻한 국물 한 숟갈', weights: { food: 1 } },
  ]},
  { text: '내 충전기는?', options: [
    { label: '잠', weights: { rest: 1 } },
    { label: '하늘과 풍경', weights: { nature: 1 } },
    { label: '관계', weights: { people: 1 } },
    { label: '몰입', weights: { create: 1 } },
    { label: '움직임', weights: { active: 1 } },
    { label: '미식', weights: { food: 1 } },
  ]},
];

const R: CategoryResult[] = [
  { key: 'rest', title: '쉼형', subtitle: '무엇도 하지 않기가 최고의 돌봄', desc: '충분한 수면과 멍 때리는 시간이 가장 큰 회복이에요.', emoji: '🛏️' },
  { key: 'nature', title: '자연형', subtitle: '초록이 곧 약', desc: '자연과 가까워질수록 안정됩니다. 식물 하나 키우는 것도 도움이 돼요.', emoji: '🌳' },
  { key: 'people', title: '관계형', subtitle: '사람이 약', desc: '깊은 대화나 가벼운 수다에서 충전됩니다. 혼자 너무 쌓아두지 마세요.', emoji: '🧑‍🤝‍🧑' },
  { key: 'create', title: '몰입형', subtitle: '나만의 세계에서 회복', desc: '창작·취미에 몰입할 때 가장 나다워요. 작은 완성을 자주 만들어 보세요.', emoji: '🎨' },
  { key: 'active', title: '활동형', subtitle: '움직여야 풀린다', desc: '걷기, 달리기, 요가 등 몸을 쓰는 활동이 가장 큰 해독제입니다.', emoji: '🏃' },
  { key: 'food', title: '미식형', subtitle: '맛있는 한 끼가 위로', desc: '따뜻하고 맛있는 음식이 감정을 달래주는 타입. 혼자 잘 먹는 루틴도 도움이 돼요.', emoji: '🍲' },
];

export default function HealingStyleClient() {
  return (
    <CategoryTestRunner
      testId="healing-style"
      title="힐링 유형 테스트"
      introDesc="내게 가장 잘 맞는 힐링 방식을 확인해 보세요."
      icon={<Sprout size={28} />}
      questions={Q}
      results={R}
    />
  );
}
