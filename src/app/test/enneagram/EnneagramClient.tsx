'use client';

import { Compass } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '내가 가장 견디기 힘든 것은?', options: [
    { label: '옳지 않은 것을 그냥 넘기는 것', weights: { e1: 1 } },
    { label: '사랑받지 못한다고 느끼는 것', weights: { e2: 1 } },
    { label: '실패하거나 인정받지 못하는 것', weights: { e3: 1 } },
    { label: '나의 개성을 몰라주는 것', weights: { e4: 1 } },
    { label: '무지한 상태로 남는 것', weights: { e5: 1 } },
    { label: '의지할 곳이 없다는 불안', weights: { e6: 1 } },
    { label: '지루하고 갇혀있는 느낌', weights: { e7: 1 } },
    { label: '내가 통제당하는 상황', weights: { e8: 1 } },
    { label: '갈등과 시끄러움', weights: { e9: 1 } },
  ]},
  { text: '주변 사람들은 나를 이렇게 말한다', options: [
    { label: '원칙적이고 꼼꼼한 사람', weights: { e1: 1 } },
    { label: '따뜻하고 잘 챙기는 사람', weights: { e2: 1 } },
    { label: '유능하고 추진력 있는 사람', weights: { e3: 1 } },
    { label: '감성적이고 개성 있는 사람', weights: { e4: 1 } },
    { label: '조용하고 지적인 사람', weights: { e5: 1 } },
    { label: '신중하고 책임감 있는 사람', weights: { e6: 1 } },
    { label: '유쾌하고 호기심 많은 사람', weights: { e7: 1 } },
    { label: '강하고 당당한 사람', weights: { e8: 1 } },
    { label: '편안하고 포용적인 사람', weights: { e9: 1 } },
  ]},
  { text: '스트레스를 받을 때 나는?', options: [
    { label: '더 완벽해지려고 애쓴다', weights: { e1: 1 } },
    { label: '주변을 더 챙기며 인정을 구한다', weights: { e2: 1 } },
    { label: '성취로 증명하려 한다', weights: { e3: 1 } },
    { label: '감정에 더 깊이 빠져든다', weights: { e4: 1 } },
    { label: '혼자 있고 정보를 더 모은다', weights: { e5: 1 } },
    { label: '최악의 시나리오를 준비한다', weights: { e6: 1 } },
    { label: '다른 재미를 찾아 도망간다', weights: { e7: 1 } },
    { label: '더 강하게 밀어붙인다', weights: { e8: 1 } },
    { label: '아무 일 없는 척 잠잠해진다', weights: { e9: 1 } },
  ]},
  { text: '관계에서 내가 주는 힘은?', options: [
    { label: '정확함과 기준', weights: { e1: 1 } },
    { label: '돌봄과 공감', weights: { e2: 1 } },
    { label: '에너지와 목표 의식', weights: { e3: 1 } },
    { label: '깊이와 진정성', weights: { e4: 1 } },
    { label: '통찰과 전문성', weights: { e5: 1 } },
    { label: '충실함과 책임감', weights: { e6: 1 } },
    { label: '즐거움과 낙관', weights: { e7: 1 } },
    { label: '용기와 보호', weights: { e8: 1 } },
    { label: '편안함과 중재', weights: { e9: 1 } },
  ]},
  { text: '일을 할 때 나는?', options: [
    { label: '정확하고 기준에 맞게', weights: { e1: 1 } },
    { label: '사람들의 필요를 맞춰가며', weights: { e2: 1 } },
    { label: '효율과 성과 중심으로', weights: { e3: 1 } },
    { label: '나만의 색을 살려서', weights: { e4: 1 } },
    { label: '조용히 몰입해서', weights: { e5: 1 } },
    { label: '리스크를 줄이며 착실하게', weights: { e6: 1 } },
    { label: '즐겁게, 여러 가지를 동시에', weights: { e7: 1 } },
    { label: '주도적으로 밀어붙이며', weights: { e8: 1 } },
    { label: '마찰 없이 부드럽게', weights: { e9: 1 } },
  ]},
  { text: '내가 가장 두려워하는 나의 모습은?', options: [
    { label: '나쁜 사람이 되는 것', weights: { e1: 1 } },
    { label: '사랑받지 못하는 것', weights: { e2: 1 } },
    { label: '무능한 사람으로 보이는 것', weights: { e3: 1 } },
    { label: '특별함을 잃는 것', weights: { e4: 1 } },
    { label: '무력한 상태가 되는 것', weights: { e5: 1 } },
    { label: '지지할 사람이 없어지는 것', weights: { e6: 1 } },
    { label: '고통에 갇히는 것', weights: { e7: 1 } },
    { label: '내가 약해 보이는 것', weights: { e8: 1 } },
    { label: '관계가 깨지는 것', weights: { e9: 1 } },
  ]},
  { text: '휴식은 내게?', options: [
    { label: '일을 제대로 끝낸 후의 보상', weights: { e1: 1 } },
    { label: '함께 있어주는 사람과의 시간', weights: { e2: 1 } },
    { label: '성과 뒤에 잠깐 누리는 여유', weights: { e3: 1 } },
    { label: '내 감정을 들여다보는 시간', weights: { e4: 1 } },
    { label: '방해 없이 책이나 콘텐츠와', weights: { e5: 1 } },
    { label: '믿을 만한 사람과 안정적으로', weights: { e6: 1 } },
    { label: '새로운 경험이 계속 이어지는 것', weights: { e7: 1 } },
    { label: '내가 통제할 수 있는 공간', weights: { e8: 1 } },
    { label: '편안하고 조용한 공간', weights: { e9: 1 } },
  ]},
];

const R: CategoryResult[] = [
  { key: 'e1', title: '1유형 · 개혁가', subtitle: '원칙과 완벽을 추구', desc: '옳은 것을 지향하며 스스로에게도 엄격합니다.', emoji: '⚖️' },
  { key: 'e2', title: '2유형 · 조력가', subtitle: '사랑과 돌봄', desc: '타인을 돕고 인정받는 것에서 가치를 찾습니다.', emoji: '🫶' },
  { key: 'e3', title: '3유형 · 성취자', subtitle: '성공과 목표', desc: '효율과 성취에 강하고 성과로 자신을 증명합니다.', emoji: '🏆' },
  { key: 'e4', title: '4유형 · 예술가', subtitle: '깊이와 개성', desc: '감정의 결이 섬세하며 나만의 색을 중요하게 여깁니다.', emoji: '🎨' },
  { key: 'e5', title: '5유형 · 탐구자', subtitle: '지식과 관찰', desc: '정보와 이해로 세상을 파악합니다. 에너지를 아끼는 편.', emoji: '🔭' },
  { key: 'e6', title: '6유형 · 충성가', subtitle: '신뢰와 안전', desc: '리스크를 미리 읽고 믿을 수 있는 관계에 충실합니다.', emoji: '🛡️' },
  { key: 'e7', title: '7유형 · 낙천가', subtitle: '자유와 재미', desc: '새롭고 즐거운 경험을 쫓고 가능성에 민감합니다.', emoji: '🎈' },
  { key: 'e8', title: '8유형 · 도전자', subtitle: '힘과 주도', desc: '솔직하고 주도적이며 자신과 주변을 지키려 합니다.', emoji: '🔥' },
  { key: 'e9', title: '9유형 · 평화주의자', subtitle: '조화와 평안', desc: '갈등을 피하고 조화를 이루려 합니다. 느리고 부드럽게.', emoji: '🕊️' },
];

export default function EnneagramClient() {
  return (
    <CategoryTestRunner
      testId="enneagram"
      title="에니어그램 9유형"
      introDesc="7문항으로 간단히 확인하는 에니어그램 간이 테스트입니다."
      icon={<Compass size={28} />}
      questions={Q}
      results={R}
    />
  );
}
