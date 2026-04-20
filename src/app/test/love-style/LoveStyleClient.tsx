'use client';

import { Flower2 } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '첫 만남에서 나는?', options: [
    { label: '먼저 적극적으로 연락한다', weights: { passion: 1 } },
    { label: '차근차근 알아간다', weights: { friendship: 1 } },
    { label: '결혼 가능성부터 생각한다', weights: { practical: 1 } },
    { label: '감정에 따라 자유롭게', weights: { playful: 1 } },
  ]},
  { text: '관계의 속도는?', options: [
    { label: '빠르고 뜨겁게', weights: { passion: 1 } },
    { label: '천천히, 깊이', weights: { friendship: 1 } },
    { label: '조건 맞추며 단계별로', weights: { practical: 1 } },
    { label: '상황따라 자유롭게', weights: { playful: 1 } },
  ]},
  { text: '싸웠을 때 나는?', options: [
    { label: '격해졌다가 금방 풀린다', weights: { passion: 1 } },
    { label: '대화로 조율한다', weights: { friendship: 1 } },
    { label: '현실적인 절충안을 찾는다', weights: { practical: 1 } },
    { label: '시간을 두고 상황을 살핀다', weights: { playful: 1 } },
  ]},
  { text: '이별을 마주했을 때?', options: [
    { label: '크게 아프지만 다음 불꽃을 찾는다', weights: { passion: 1 } },
    { label: '친구로 남기도 한다', weights: { friendship: 1 } },
    { label: '아쉬워도 합리적 결정으로 정리', weights: { practical: 1 } },
    { label: '이미 마음은 옮겨가 있기도', weights: { playful: 1 } },
  ]},
  { text: '사랑에서 가장 중요한 것은?', options: [
    { label: '강렬한 이끌림', weights: { passion: 1 } },
    { label: '신뢰와 우정', weights: { friendship: 1 } },
    { label: '현실적인 궁합', weights: { practical: 1 } },
    { label: '즐거움과 자유', weights: { playful: 1 } },
  ]},
];

const R: CategoryResult[] = [
  { key: 'passion', title: '열정형 (Eros)', subtitle: '강렬하고 로맨틱', desc: '첫눈에 반하거나 깊이 빠지는 스타일. 감정의 진폭이 큽니다.', emoji: '🔥' },
  { key: 'friendship', title: '친밀형 (Storge)', subtitle: '천천히 깊어지는 우정', desc: '친구에서 연인으로 이어지기 쉬운 안정된 스타일이에요.', emoji: '🫶' },
  { key: 'practical', title: '현실형 (Pragma)', subtitle: '조건과 궁합을 중시', desc: '장기적 관점으로 관계를 봅니다. 감정보다 맥락이 먼저예요.', emoji: '📊' },
  { key: 'playful', title: '유희형 (Ludus)', subtitle: '가볍고 자유로운', desc: '재미와 자유를 사랑합니다. 구속에 약하지만 관계를 즐깁니다.', emoji: '🎲' },
];

export default function LoveStyleClient() {
  return (
    <CategoryTestRunner
      testId="love-style"
      title="연애 스타일 테스트"
      introDesc="내가 사랑을 시작하고 유지하는 스타일을 확인해 보세요."
      icon={<Flower2 size={28} />}
      questions={Q}
      results={R}
    />
  );
}
