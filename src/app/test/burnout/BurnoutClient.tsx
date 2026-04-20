'use client';

import { Flame } from 'lucide-react';
import TestRunner from '../TestRunner';

// Copenhagen Burnout Inventory (CBI) 단축형 느낌으로 8문항 0~4점 구성
// (전문 MBI는 라이선스 이슈가 있어 공개 가능한 CBI 문항을 참고)
const QUESTIONS = [
  '요즘 들어 얼마나 자주 지쳤다고 느끼나요?',
  '하루가 끝날 때쯤 얼마나 자주 기운이 다 빠졌다고 느끼나요?',
  '아침에 일어났을 때 다시 또 하루를 버텨야 한다는 생각에 얼마나 자주 피곤함을 느끼나요?',
  '가족이나 친구들과 함께 시간을 보낼 에너지가 남아있지 않다고 얼마나 자주 느끼나요?',
  '하는 일이 의미 없게 느껴질 때가 얼마나 자주 있나요?',
  '일(또는 학업)에 집중하기 어려운 때가 얼마나 자주 있나요?',
  '사람들을 대하는 것 자체가 피곤하게 느껴질 때가 얼마나 자주 있나요?',
  '내가 맡은 일들이 감당하기 버겁다고 얼마나 자주 느끼나요?',
];

const OPTIONS = [
  { value: 0, label: '전혀 없음' },
  { value: 1, label: '가끔' },
  { value: 2, label: '종종' },
  { value: 3, label: '자주' },
  { value: 4, label: '항상' },
];

const INTERPRETATIONS = [
  { range: '0–8점', level: '번아웃 위험 낮음', desc: '지금은 번아웃 위험이 낮은 편입니다.', min: 0, max: 8 },
  { range: '9–16점', level: '경미한 번아웃', desc: '가벼운 번아웃 신호가 있습니다. 휴식 루틴을 점검해 보세요.', min: 9, max: 16 },
  { range: '17–24점', level: '중등도 번아웃', desc: '중등도 번아웃 상태로 보입니다. 의식적으로 속도를 줄여 보세요.', min: 17, max: 24, warning: true },
  { range: '25–32점', level: '심한 번아웃', desc: '심한 번아웃 가능성이 있습니다. 전문가 상담과 회복 시간이 필요합니다.', min: 25, max: 32, warning: true },
];

export default function BurnoutClient() {
  return (
    <TestRunner
      testId="burnout"
      title="번아웃 자가진단"
      introDesc="최근의 생활을 기준으로 8개의 문항에 답해 주세요. 약 2분이 소요됩니다."
      icon={<Flame size={28} />}
      questions={QUESTIONS}
      options={OPTIONS}
      interpretations={INTERPRETATIONS}
      maxScore={32}
    />
  );
}
