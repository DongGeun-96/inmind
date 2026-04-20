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
  {
    range: '0–14점', level: '스스로에게 가혹한 나', emoji: '🥂',
    tagline: '잘하고 있어도 일단 부족하게 느껴져요',
    desc: '자존감이 낮은 편이에요. 내 잘못이 아니에요. 특정 경험이 어떤 이야기를 머릿속에 심어놓은 거예요.',
    min: 0, max: 14, warning: true,
    tips: ['하루에 한 가지 사소한 성공 기록', '스스로에게 친구에게 하듯 말해보기', '비교가 심해지는 SNS 잠시 정리', '상담이나 심리서 한 권 추천'],
    quote: '나는 아직 나의 가치를 발견하는 중이다.',
  },
  {
    range: '15–24점', level: '흔들리지만 해야 할 일은 하는 나', emoji: '🌱',
    tagline: '상황에 따라 자존감이 오르락입락해요',
    desc: '평균 수준의 자존감이에요. 다만 특정 영역에서는 아직 자책이 심할 수 있어요.',
    min: 15, max: 24,
    tips: ['내가 잘하는 것 3가지를 대답 없이 적어보기', '"그럴 수 있지" 라는 문장 입버릇하기', '모르는 사람 압박에 거리두기'],
    quote: '왔다갔다하는 자존감도 자존감입니다.',
  },
  {
    range: '25–30점', level: '나를 담담히 믿는 나', emoji: '🌟',
    tagline: '내 가치를 내 기준으로 정해요',
    desc: '눈치보다 내 기준이 더 중요한 상태에요. 이게 얼마나 든든한 건지 아시죠?',
    min: 25, max: 30,
    tips: ['이 감각을 잘 지키도록 자축하기', '주변 사람에게도 가벼운 칭찬 아끼지 않기'],
    quote: '내 가치는 성적으로 정해지지 않는다.',
  },
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
