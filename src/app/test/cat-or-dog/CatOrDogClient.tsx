'use client';

import { Cat } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '친구한테 연락 올 때 너는?', options: [
    { label: '바로 답장한다', weights: { dog: 1 } },
    { label: '봤는데 나중에 답', weights: { cat: 1 } },
  ]},
  { text: '새로운 사람 만날 때?', options: [
    { label: '일단 반갑게 다가간다', weights: { dog: 1 } },
    { label: '일단 관찰부터', weights: { cat: 1 } },
  ]},
  { text: '감정 표현은?', options: [
    { label: '좋으면 티난다', weights: { dog: 1 } },
    { label: '속마음은 잘 안 보임', weights: { cat: 1 } },
  ]},
  { text: '주말에 더 끌리는 건?', options: [
    { label: '친구랑 맛집 투어', weights: { dog: 1 } },
    { label: '혼자 집에서 뒹굴', weights: { cat: 1 } },
  ]},
  { text: '혼자 있을 때?', options: [
    { label: '금방 외로워짐', weights: { dog: 1 } },
    { label: '세상 편안함', weights: { cat: 1 } },
  ]},
  { text: '칭찬받을 때?', options: [
    { label: '꼬리 흔들듯 좋아함', weights: { dog: 1 } },
    { label: '쿨하게 고맙다고 함', weights: { cat: 1 } },
  ]},
  { text: '너의 연애는?', options: [
    { label: '사랑 티를 많이 냄', weights: { dog: 1 } },
    { label: '적당한 거리 유지', weights: { cat: 1 } },
  ]},
  { text: '스트레스 받으면?', options: [
    { label: '친구한테 연락해서 수다', weights: { dog: 1 } },
    { label: '이불 속에서 잠수', weights: { cat: 1 } },
  ]},
];

const R: CategoryResult[] = [
  {
    key: 'dog', title: '🐶 댕댕이형',
    subtitle: '사람이 좋고 표현도 많은',
    tagline: '보고 있으면 꼬리 흔드는 게 보임',
    desc: '감정을 숨길 줄 모르고 사람을 정말 좋아하는 타입. 기분 좋으면 바로 티나고, 상처받아도 티나는 솔직파. 연락 안 하면 너가 더 초조해짐.',
    emoji: '🐶',
    strengths: ['친화력 최상', '솔직한 감정 표현', '충성심 끝판왕'],
    weaknesses: ['외로움 잘 탐', '관심 못 받으면 시무룩', '감정 기복이 티남'],
    match: '🐱 고양이형 — 너가 다가가면 마음 열어주는 사람',
    avoid: '정서적으로 차가운 사람 — 너만 상처받음',
    tip: '너의 표현이 부담스러운 사람도 있어요. 가끔은 한발 물러서는 것도 매력이에요.',
    quote: '사랑을 많이 주는 사람에게 사랑은 돌아옵니다.',
  },
  {
    key: 'cat', title: '🐱 냥냥이형',
    subtitle: '도도함 + 숨겨진 다정함',
    tagline: '먼저 안 다가가지만 진심은 깊은',
    desc: '겉으로는 무심해 보여도 속으로는 사람 엄청 좋아함. 단지 표현을 안 하는 것뿐. 한번 마음 열면 가장 오래 가는 타입.',
    emoji: '🐱',
    strengths: ['독립적이고 쿨함', '관계에 여유 있음', '감정 소비가 적음'],
    weaknesses: ['표현이 너무 적음', '다가가는 데 오래 걸림', '오해받기 쉬움'],
    match: '🐶 댕댕이형 — 너의 벽을 자연스레 녹여주는 사람',
    avoid: '관심과 연락을 끊임없이 요구하는 사람',
    tip: '좋아하는 사람 앞에서 한마디만 더 해보세요. 그 한마디가 관계를 바꿔요.',
    quote: '조용히 오래 곁에 있는 사람이 진짜다.',
  },
];

export default function CatOrDogClient() {
  return (
    <CategoryTestRunner
      testId="cat-or-dog"
      title="강아지상 vs 고양이상 (성격편)"
      introDesc="8문항으로 알아보는 나의 성격 동물. 친구랑 해보면 더 꿀잼."
      icon={<Cat size={28} />}
      questions={Q}
      results={R}
    />
  );
}
