'use client';

import { Activity } from 'lucide-react';
import TestRunner from '../TestRunner';

// PSS-10 (Perceived Stress Scale, 한국어판)
// 문항 4,5,7,8 (0-base 3,4,6,7) 은 긍정 문항 → 역채점
const QUESTIONS = [
  '지난 한 달 동안 예상치 못한 일이 생겨서 당황했던 적이 얼마나 자주 있었나요?',
  '지난 한 달 동안 중요한 일들을 조절할 수 없다고 느낀 적이 얼마나 자주 있었나요?',
  '지난 한 달 동안 초조하거나 스트레스가 쌓인다고 느낀 적이 얼마나 자주 있었나요?',
  '지난 한 달 동안 개인적인 문제를 잘 처리할 수 있었다고 느낀 적이 얼마나 자주 있었나요?',
  '지난 한 달 동안 일상이 당신 뜻대로 잘 되어간다고 느낀 적이 얼마나 자주 있었나요?',
  '지난 한 달 동안 해야 할 일을 도저히 처리할 수 없다고 느낀 적이 얼마나 자주 있었나요?',
  '지난 한 달 동안 짜증나는 일을 잘 통제할 수 있었다고 느낀 적이 얼마나 자주 있었나요?',
  '지난 한 달 동안 자신이 상황을 잘 장악하고 있다고 느낀 적이 얼마나 자주 있었나요?',
  '지난 한 달 동안 통제할 수 없는 일 때문에 화가 난 적이 얼마나 자주 있었나요?',
  '지난 한 달 동안 해결할 수 없을 만큼 어려움이 쌓인다고 느낀 적이 얼마나 자주 있었나요?',
];

const OPTIONS = [
  { value: 0, label: '전혀 없었다' },
  { value: 1, label: '거의 없었다' },
  { value: 2, label: '때때로 있었다' },
  { value: 3, label: '자주 있었다' },
  { value: 4, label: '매우 자주 있었다' },
];

const INTERPRETATIONS = [
  { range: '0–13점', level: '낮은 스트레스', desc: '스트레스 수준이 낮습니다. 지금처럼 잘 관리해 보세요.', min: 0, max: 13 },
  { range: '14–26점', level: '중간 스트레스', desc: '평균 수준의 스트레스가 있습니다. 휴식과 자기 돌봄이 필요해요.', min: 14, max: 26 },
  { range: '27–40점', level: '높은 스트레스', desc: '스트레스가 높은 상태입니다. 전문가 상담을 고려해 보세요.', min: 27, max: 40, warning: true },
];

export default function StressClient() {
  return (
    <TestRunner
      testId="pss10"
      title="스트레스 자가진단 (PSS-10)"
      introDesc="지난 한 달 동안의 느낌과 생각을 기준으로 10개의 문항에 답해 주세요. 약 2~3분이 소요됩니다."
      icon={<Activity size={28} />}
      questions={QUESTIONS}
      reverseIndices={[3, 4, 6, 7]}
      options={OPTIONS}
      interpretations={INTERPRETATIONS}
      maxScore={40}
    />
  );
}
