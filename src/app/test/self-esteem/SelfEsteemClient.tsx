'use client';

import { Heart } from 'lucide-react';
import TestRunner from '../TestRunner';

// Rosenberg Self-Esteem Scale (RSE) 한국어판, 10문항, 0~3점
// 3,5,8,9,10 문항(0-base 2,4,7,8,9)은 부정 문항 → 역채점
const QUESTIONS = [
  '나는 내가 적어도 다른 사람만큼은 가치 있는 사람이라고 느낀다.',
  '나는 내가 좋은 장점을 많이 가지고 있다고 느낀다.',
  '대체로 나 자신을 실패자라고 느끼는 경향이 있다.',
  '나는 대부분의 다른 사람들만큼 일을 잘 할 수 있다.',
  '나는 자랑할 만한 것이 별로 없다고 느낀다.',
  '나는 나 자신에 대해 긍정적인 태도를 가지고 있다.',
  '대체로 나 자신에 대해 만족한다.',
  '나는 나 자신을 좀 더 존중할 수 있었으면 좋겠다.',
  '가끔 나는 내가 쓸모없다고 느낀다.',
  '때때로 나는 내가 전혀 괜찮지 않다고 생각한다.',
];

const OPTIONS = [
  { value: 0, label: '전혀 그렇지 않다' },
  { value: 1, label: '그렇지 않다' },
  { value: 2, label: '그렇다' },
  { value: 3, label: '매우 그렇다' },
];

const INTERPRETATIONS = [
  { range: '0–14점', level: '낮은 자존감', desc: '자존감이 낮은 편입니다. 스스로를 따뜻하게 바라보는 연습이 필요해요.', min: 0, max: 14, warning: true },
  { range: '15–24점', level: '평균 수준의 자존감', desc: '평균 수준의 자존감을 가지고 있습니다. 지금처럼 유지해 보세요.', min: 15, max: 24 },
  { range: '25–30점', level: '높은 자존감', desc: '자존감이 높은 편입니다. 자신을 잘 인정하고 계시네요.', min: 25, max: 30 },
];

export default function SelfEsteemClient() {
  return (
    <TestRunner
      testId="rse"
      title="자존감 자가진단 (RSE)"
      introDesc="로젠버그 자존감 척도(RSE) 10문항입니다. 평소 자신에 대한 느낌에 가장 가까운 것을 골라 주세요. 약 2분이 소요됩니다."
      icon={<Heart size={28} />}
      questions={QUESTIONS}
      reverseIndices={[2, 4, 7, 8, 9]}
      options={OPTIONS}
      interpretations={INTERPRETATIONS}
      maxScore={30}
    />
  );
}
