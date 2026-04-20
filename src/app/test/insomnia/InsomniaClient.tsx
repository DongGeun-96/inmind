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
  { range: '0–7점', level: '임상적으로 유의미하지 않은 불면', desc: '현재 불면 증상이 거의 없습니다.', min: 0, max: 7 },
  { range: '8–14점', level: '경계 수준의 불면', desc: '가벼운 불면 증상이 있습니다. 수면 위생에 신경 써 보세요.', min: 8, max: 14 },
  { range: '15–21점', level: '중등도 임상적 불면', desc: '중등도의 불면이 있습니다. 전문가 상담을 고려해 보세요.', min: 15, max: 21, warning: true },
  { range: '22–28점', level: '심각한 임상적 불면', desc: '심한 불면입니다. 가능한 빨리 전문가 상담이 권장됩니다.', min: 22, max: 28, warning: true },
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
