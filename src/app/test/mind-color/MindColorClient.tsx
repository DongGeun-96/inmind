'use client';

import { Palette } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '요즘 내 마음을 한 장면으로 표현한다면?', options: [
    { label: '바람 많이 부는 새벽 바다', weights: { blue: 1 } },
    { label: '햇살 드는 노란 들판', weights: { yellow: 1 } },
    { label: '비 내린 뒤의 초록 숲', weights: { green: 1 } },
    { label: '핑크빛 노을', weights: { pink: 1 } },
    { label: '밤의 보라 하늘', weights: { purple: 1 } },
    { label: '회색 안개 낀 도시', weights: { gray: 1 } },
  ]},
  { text: '듣고 싶은 소리는?', options: [
    { label: '잔잔한 파도 소리', weights: { blue: 1 } },
    { label: '밝은 피아노 멜로디', weights: { yellow: 1 } },
    { label: '새소리와 빗소리', weights: { green: 1 } },
    { label: '따뜻한 재즈 보컬', weights: { pink: 1 } },
    { label: '신비로운 앰비언트', weights: { purple: 1 } },
    { label: '조용한 클래식 피아노', weights: { gray: 1 } },
  ]},
  { text: '마음을 안아준다면 필요한 말은?', options: [
    { label: '“숨 한번 깊게 쉬어도 돼.”', weights: { blue: 1 } },
    { label: '“오늘도 반짝였어.”', weights: { yellow: 1 } },
    { label: '“쉬어가도 괜찮아.”', weights: { green: 1 } },
    { label: '“너는 사랑받을 만해.”', weights: { pink: 1 } },
    { label: '“너의 깊이를 소중히 해.”', weights: { purple: 1 } },
    { label: '“잠시 가라앉아도 돼.”', weights: { gray: 1 } },
  ]},
  { text: '입고 싶은 옷 색은?', options: [
    { label: '차분한 네이비', weights: { blue: 1 } },
    { label: '버터 옐로우', weights: { yellow: 1 } },
    { label: '세이지 그린', weights: { green: 1 } },
    { label: '말린 장미 핑크', weights: { pink: 1 } },
    { label: '라벤더', weights: { purple: 1 } },
    { label: '라이트 그레이', weights: { gray: 1 } },
  ]},
  { text: '지금 가장 필요한 감정은?', options: [
    { label: '고요함', weights: { blue: 1 } },
    { label: '희망과 에너지', weights: { yellow: 1 } },
    { label: '회복과 안정', weights: { green: 1 } },
    { label: '따뜻한 사랑', weights: { pink: 1 } },
    { label: '나만의 몰입', weights: { purple: 1 } },
    { label: '조용한 쉼', weights: { gray: 1 } },
  ]},
];

const R: CategoryResult[] = [
  { key: 'blue', title: '블루 · 고요함', subtitle: '마음이 차분함을 원해요', desc: '지금 당신의 마음은 잔잔한 파도 같아요. 깊이 호흡하는 시간이 필요합니다.', emoji: '🌊' },
  { key: 'yellow', title: '옐로우 · 희망', subtitle: '다시 반짝이고 싶어요', desc: '작은 빛이 필요한 시기입니다. 햇살 아래 짧은 산책이 도움이 돼요.', emoji: '🌞' },
  { key: 'green', title: '그린 · 회복', subtitle: '회복과 균형의 빛', desc: '몸과 마음 모두 숨 고르기가 필요한 때. 푸른 공간을 가까이 두세요.', emoji: '🌿' },
  { key: 'pink', title: '핑크 · 사랑', subtitle: '따뜻한 사랑이 필요해요', desc: '누군가의 온기가 스며들어도 좋은 시기입니다. 나를 먼저 안아 주세요.', emoji: '🌸' },
  { key: 'purple', title: '퍼플 · 깊이', subtitle: '혼자만의 세계로', desc: '상상과 직관이 풍부한 시기. 창작과 기록이 잘 어울려요.', emoji: '🌌' },
  { key: 'gray', title: '그레이 · 쉼', subtitle: '조용히 가라앉고 싶어요', desc: '애쓰지 않아도 되는 하루가 필요합니다. 의무를 줄이고 물러나 쉬세요.', emoji: '🌫️' },
];

export default function MindColorClient() {
  return (
    <CategoryTestRunner
      testId="mind-color"
      title="내 마음 컬러 테스트"
      introDesc="지금 마음 상태를 한 가지 색으로 만나보는 감성 테스트입니다."
      icon={<Palette size={28} />}
      questions={Q}
      results={R}
    />
  );
}
