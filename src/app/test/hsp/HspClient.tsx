'use client';

import { Sparkle } from 'lucide-react';
import TestRunner from '../TestRunner';

// HSP (Highly Sensitive Person) 간이판 12문항, 0~2 (그렇다/약간/아니다)
const QUESTIONS = [
  '미세한 소리, 냄새, 조명에 민감하게 반응한다.',
  '다른 사람의 감정 변화를 잘 알아챈다.',
  '한 번에 여러 일을 처리하면 금방 지친다.',
  '영화나 음악에 쉽게 깊이 빠져든다.',
  '사람이 많은 곳에 오래 있으면 피곤해진다.',
  '예리한 말이나 분위기에 상처를 잘 받는다.',
  '세심한 감각으로 디테일을 잘 본다.',
  '시간 압박이 있으면 평소보다 더 쉽게 실수한다.',
  '작은 일에도 깊게 생각하고 되짚는 편이다.',
  '배가 고프거나 피곤하면 기분 변화가 크다.',
  '갈등이나 비난을 피하려고 애쓴다.',
  '새로운 환경에 적응하기까지 시간이 걸린다.',
];

const OPTIONS = [
  { value: 0, label: '아니다' },
  { value: 1, label: '가끔 그렇다' },
  { value: 2, label: '자주 그렇다' },
];

const INTERPRETATIONS = [
  { range: '0–8점', level: '낮은 민감도', desc: '자극에 비교적 둔감한 편입니다. 외부 압력에도 잘 버텨요.', min: 0, max: 8 },
  { range: '9–16점', level: '중간 민감도', desc: '상황에 따라 민감해지는 평균 수준입니다.', min: 9, max: 16 },
  { range: '17–24점', level: '높은 민감도 (HSP 가능성)', desc: '민감도가 높습니다. 강점이자 쉽게 피로해지는 지점이에요. 충분한 회복 시간이 필수.', min: 17, max: 24, warning: true },
];

export default function HspClient() {
  return (
    <TestRunner
      testId="hsp"
      title="민감도 테스트 (HSP)"
      introDesc="외부 자극과 감정에 얼마나 민감한지 간단히 확인해 보는 테스트입니다."
      icon={<Sparkle size={28} />}
      questions={QUESTIONS}
      options={OPTIONS}
      interpretations={INTERPRETATIONS}
      maxScore={24}
    />
  );
}
