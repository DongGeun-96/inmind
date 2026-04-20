'use client';

import { HeartCrack } from 'lucide-react';
import TestRunner from '../TestRunner';

// 이별 회복 지수: 0~4 리커트 10문항, 역방향 없음
const QUESTIONS = [
  '헤어진 사람의 SNS를 아직도 자주 들여다본다.',
  '혼자 있는 시간이 견디기 힘들다.',
  '일이나 일상에 집중이 잘 안 된다.',
  '감정 기복이 심하고 울컥하는 일이 많다.',
  '잠이 잘 오지 않거나 중간에 자주 깬다.',
  '새로운 사람을 만나는 상상이 불편하다.',
  '그 사람과 함께한 장소에 가기 힘들다.',
  '헤어진 일이 내 탓인 것 같아 자책한다.',
  '친구들과의 약속을 자주 미루게 된다.',
  '미래에 대해 희망이 잘 안 보인다.',
];

const OPTIONS = [
  { value: 0, label: '전혀 아니다' },
  { value: 1, label: '아니다' },
  { value: 2, label: '보통' },
  { value: 3, label: '그렇다' },
  { value: 4, label: '매우 그렇다' },
];

const INTERPRETATIONS = [
  { range: '0–10점', level: '회복 후반', desc: '대부분 잘 지내고 있습니다. 일상 회복이 어느 정도 완료된 단계예요.', min: 0, max: 10 },
  { range: '11–20점', level: '회복 중반', desc: '여전히 흔들리는 순간이 있지만, 스스로 돌아올 힘이 커지고 있어요.', min: 11, max: 20 },
  { range: '21–30점', level: '회복 초반', desc: '감정이 많이 요동치는 시기입니다. 자책보다 자기돌봄에 집중해 주세요.', min: 21, max: 30, warning: true },
  { range: '31–40점', level: '집중 케어 필요', desc: '혼자 견디지 마세요. 가까운 사람이나 전문가의 도움이 필요한 시기입니다.', min: 31, max: 40, warning: true },
];

export default function BreakupRecoveryClient() {
  return (
    <TestRunner
      testId="breakup"
      title="이별 회복 지수"
      introDesc="최근 이별 후 느끼는 감정과 일상 상태를 점검하는 테스트입니다. 10문항, 약 2분."
      icon={<HeartCrack size={28} />}
      questions={QUESTIONS}
      options={OPTIONS}
      interpretations={INTERPRETATIONS}
      maxScore={40}
    />
  );
}
