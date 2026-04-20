'use client';

import { Users } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '긴 모임 뒤의 나는?', options: [
    { label: '에너지가 충전됐다', weights: { E: 1 } },
    { label: '방전돼서 혼자 있고 싶다', weights: { I: 1 } },
  ]},
  { text: '전화가 울릴 때 나는?', options: [
    { label: '반갑게 받는다', weights: { E: 1 } },
    { label: '문자나 카톡으로 하고 싶다', weights: { I: 1 } },
  ]},
  { text: '낯선 곳에 가면?', options: [
    { label: '먼저 다가가 말을 건다', weights: { E: 1 } },
    { label: '조용히 적응한다', weights: { I: 1 } },
  ]},
  { text: '혼밥은?', options: [
    { label: '좀 심심하다', weights: { E: 1 } },
    { label: '오히려 편하다', weights: { I: 1 } },
  ]},
  { text: '회식은?', options: [
    { label: '2차, 3차도 재미있다', weights: { E: 1 } },
    { label: '끝나고 얼른 집에 가고 싶다', weights: { I: 1 } },
  ]},
  { text: '생각 정리는?', options: [
    { label: '말로 하면서 정리된다', weights: { E: 1 } },
    { label: '혼자 속으로 정리한다', weights: { I: 1 } },
  ]},
  { text: '주말을 혼자 보낼 때?', options: [
    { label: '3일은 외롭다', weights: { E: 1 } },
    { label: '3일도 완전 충만하다', weights: { I: 1 } },
  ]},
  { text: '새 친구 만들기는?', options: [
    { label: '재미있고 쉬운 편', weights: { E: 1 } },
    { label: '에너지가 드는 편', weights: { I: 1 } },
  ]},
];

const R: CategoryResult[] = [
  { key: 'E', title: '외향형 (Extrovert)', subtitle: '사람을 통해 충전되는 타입', desc: '바깥 활동과 관계 속에서 에너지를 얻습니다. 적절한 자극이 있을 때 가장 나다워요.', emoji: '🌞' },
  { key: 'I', title: '내향형 (Introvert)', subtitle: '혼자의 시간이 필요한 타입', desc: '혼자만의 시간으로 에너지를 충전합니다. 조용한 깊이가 매력이에요.', emoji: '🌙' },
];

export default function IntrovertClient() {
  return (
    <CategoryTestRunner
      testId="introvert"
      title="내향·외향 테스트"
      introDesc="8문항으로 가볍게 확인하는 내향·외향 테스트입니다."
      icon={<Users size={28} />}
      questions={Q}
      results={R}
    />
  );
}
