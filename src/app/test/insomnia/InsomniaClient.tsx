'use client';

import { Moon } from 'lucide-react';
import TestRunner from '../TestRunner';

// ISI (Insomnia Severity Index) 한국어판, 7문항 0~4점
const QUESTIONS = [
  '잠들기 어려움의 심각도',
  '수면 중 자주 깨는 정도의 심각도',
  '너무 일찍 깨서 다시 잠들지 못하는 정도의 심각도',
  '현재 수면 패턴에 대한 만족도',
  '수면 문제가 낮 동안의 활동(예: 피로, 집중력, 기분)에 얼마나 방해가 되나요?',
  '다른 사람이 보기에 당신의 수면 문제가 삶의 질을 손상시키는 정도는 어느 정도로 눈에 띄나요?',
  '현재 수면 문제에 대해 얼마나 걱정하거나 불안해하시나요?',
];

const OPTIONS_SEVERITY = [
  { value: 0, label: '전혀 없음' },
  { value: 1, label: '약간' },
  { value: 2, label: '중간' },
  { value: 3, label: '심함' },
  { value: 4, label: '매우 심함' },
];

const INTERPRETATIONS = [
  {
    range: '0–7점', level: '푸근한 한 밤', emoji: '🌙',
    tagline: '잠은 꽤 잘 자고 있어요',
    desc: '현재 수면 상태는 거의 문제가 없어요. 지금의 루틴을 유지해 보세요.',
    min: 0, max: 7,
    tips: ['일정한 기상/취침 시간 유지', '자기 전 카페인은 피하기', '토요일도 평소와 비슷한 시간에 일어나기'],
    quote: '잘 자는 것도 야심입니다.',
  },
  {
    range: '8–14점', level: '살짝 서너라이즈된 수면', emoji: '⏰',
    tagline: '제대로 못 잘 때도 자주 있어요',
    desc: '가벼운 불면이 있습니다. 생활 습관 몇 가지만 바꿔도 많이 개선되는 구간이에요.',
    min: 8, max: 14,
    tips: ['자기 1시간 전부터는 핸드폰 멀리하기', '침실 온도 18–20℃ 유지', '캐페인 오후 2시 이후 수박하기', '15분이상 잠을 못 들면 잠시 일어나 말치 잘기'],
    quote: '잠이 오지 않을 땐, 잠을 자려고 애쓰는 것이 잘 잠을 방해한다.',
  },
  {
    range: '15–21점', level: '삶의 질이 떨어지는 불면', emoji: '😴',
    tagline: '잠이 부족해서 낮 시간도 힘들어요',
    desc: '중등도의 불면입니다. 몸이 회복할 시간이 절대적으로 부족한 상태에요.',
    min: 15, max: 21, warning: true,
    tips: ['2주 이상 지속된다면 수면클리닉 상담 고려', '수면일기를 써보면 패턴이 보여요', '낮잔은 20분 이내로 짧게', '전문가 상담 전 생활 습관부터 정조정 해보기'],
    quote: '잠은 충전일 뿐, 시간낭비가 아닙니다.',
  },
  {
    range: '22–28점', level: '지금 꼭 도움이 필요한 불면', emoji: '🚨',
    tagline: '혼자 버티지 않아도 돼요',
    desc: '심한 불면입니다. 수면 부족이 길어지면 우울·불안이 따라오기 쉽습니다.',
    min: 22, max: 28, warning: true,
    tips: ['수면의학클리닉/정신건강의학과 상담', '순환이 심하다면 인지행동치료(CBT-I) 프로그램 신청', '주위에 지금 내 상태를 알리고 도움 요청하기'],
    quote: '도움을 청하는 것은 약함이 아니라 지혜다.',
  },
];

export default function InsomniaClient() {
  return (
    <TestRunner
      testId="isi"
      title="불면증 자가진단 (ISI)"
      introDesc="지난 2주 동안의 수면 상태를 기준으로 7개의 문항에 답해 주세요. 약 2분이 소요됩니다."
      icon={<Moon size={28} />}
      questions={QUESTIONS}
      options={OPTIONS_SEVERITY}
      interpretations={INTERPRETATIONS}
      maxScore={28}
    />
  );
}
