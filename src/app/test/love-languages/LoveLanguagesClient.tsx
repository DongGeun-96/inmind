'use client';

import { Gift } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

// 5가지 사랑의 언어: words / time / gifts / service / touch
const Q: CategoryQuestion[] = [
  { text: '연인이 한 중 가장 나를 사랑받는다고 느끼게 하는 것은?', options: [
    { label: '“정말 고마워, 사랑해” 같은 말', weights: { words: 1 } },
    { label: '바빠도 같이 있어주는 시간', weights: { time: 1 } },
    { label: '내 취향을 담은 작은 선물', weights: { gifts: 1 } },
    { label: '힘든 일을 대신 해주는 것', weights: { service: 1 } },
    { label: '가벼운 포옹, 손잡기', weights: { touch: 1 } },
  ]},
  { text: '힘든 하루 뒤 가장 위로가 되는 것은?', options: [
    { label: '“오늘 고생 많았어” 한마디', weights: { words: 1 } },
    { label: '옆에 앉아서 같이 있어주는 것', weights: { time: 1 } },
    { label: '좋아하는 디저트 사다 주기', weights: { gifts: 1 } },
    { label: '저녁을 대신 차려주는 것', weights: { service: 1 } },
    { label: '말없이 꼭 안아주는 것', weights: { touch: 1 } },
  ]},
  { text: '내가 상처받는 순간은?', options: [
    { label: '무관심하거나 비난하는 말', weights: { words: 1 } },
    { label: '집중 안 하고 딴짓할 때', weights: { time: 1 } },
    { label: '특별한 날 챙김이 없을 때', weights: { gifts: 1 } },
    { label: '도움이 필요할 때 외면할 때', weights: { service: 1 } },
    { label: '스킨십을 거부당할 때', weights: { touch: 1 } },
  ]},
  { text: '내가 상대에게 가장 자연스럽게 하는 표현은?', options: [
    { label: '따뜻한 말과 칭찬', weights: { words: 1 } },
    { label: '함께 있는 시간 만들기', weights: { time: 1 } },
    { label: '기억하고 챙기는 선물', weights: { gifts: 1 } },
    { label: '불편한 일 먼저 처리해주기', weights: { service: 1 } },
    { label: '가벼운 신체 접촉', weights: { touch: 1 } },
  ]},
  { text: '연인과의 데이트에서 제일 기다리는 장면은?', options: [
    { label: '“오늘 너 진짜 예뻐” 같은 말', weights: { words: 1 } },
    { label: '오랜만에 둘이서 긴 시간 수다', weights: { time: 1 } },
    { label: '깜짝 선물 꺼내는 순간', weights: { gifts: 1 } },
    { label: '피곤할 때 챙겨주는 행동', weights: { service: 1 } },
    { label: '걸으며 손 잡는 순간', weights: { touch: 1 } },
  ]},
  { text: '평생 한 가지 방식만 선택해야 한다면?', options: [
    { label: '말로 전하는 사랑', weights: { words: 1 } },
    { label: '시간으로 전하는 사랑', weights: { time: 1 } },
    { label: '선물로 전하는 사랑', weights: { gifts: 1 } },
    { label: '행동으로 전하는 사랑', weights: { service: 1 } },
    { label: '스킨십으로 전하는 사랑', weights: { touch: 1 } },
  ]},
];

const R: CategoryResult[] = [
  { key: 'words', title: '인정하는 말', subtitle: 'Words of Affirmation', desc: '말 한마디에 쉽게 힘이 나고, 비난에 크게 흔들립니다. 따뜻한 말이 제일 큰 사랑의 증거예요.', emoji: '💌' },
  { key: 'time', title: '함께하는 시간', subtitle: 'Quality Time', desc: '양보다 질, 집중된 시간이 중요합니다. 같이 있어도 무관심하면 외로워요.', emoji: '⏳' },
  { key: 'gifts', title: '선물', subtitle: 'Receiving Gifts', desc: '마음이 담긴 작은 물건이 큰 상징이 됩니다. 기억해주는 것 자체가 사랑이에요.', emoji: '🎁' },
  { key: 'service', title: '봉사', subtitle: 'Acts of Service', desc: '말보다 행동, 대신 해주는 일에서 사랑을 느낍니다.', emoji: '🧺' },
  { key: 'touch', title: '스킨십', subtitle: 'Physical Touch', desc: '안아주거나 손잡는 작은 접촉에서 안전함과 사랑을 크게 느낍니다.', emoji: '🫂' },
];

export default function LoveLanguagesClient() {
  return (
    <CategoryTestRunner
      testId="love"
      title="사랑의 언어 테스트"
      introDesc="6문항으로 알아보는 나의 주요 사랑의 언어 테스트입니다."
      icon={<Gift size={28} />}
      questions={Q}
      results={R}
    />
  );
}
