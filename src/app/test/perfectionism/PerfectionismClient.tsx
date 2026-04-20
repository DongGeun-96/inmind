'use client';

import { Target } from 'lucide-react';
import TestRunner from '../TestRunner';

const QUESTIONS = [
  '실수하면 오래 머릿속에서 떠나지 않는다.',
  '“이 정도면 됐어”라는 기준을 스스로에게 잘 주지 않는다.',
  '남들의 평가가 내 자존감에 크게 영향을 준다.',
  '작은 결과물도 계속 다듬고 싶어진다.',
  '실패할 것 같으면 아예 시작을 못 할 때가 있다.',
  '내 장점을 말하라고 하면 불편하다.',
  '일정보다 한참 일찍 끝내놓고도 마감 직전까지 수정한다.',
  '남들이 칭찬해도 스스로는 부족하다고 느낀다.',
  '내 기준에 못 미치면 타인에게도 엄격해진다.',
  '쉬는 시간에도 해야 할 일이 머릿속에서 맴돈다.',
];

const OPTIONS = [
  { value: 0, label: '전혀 아니다' },
  { value: 1, label: '아니다' },
  { value: 2, label: '보통' },
  { value: 3, label: '그렇다' },
  { value: 4, label: '매우 그렇다' },
];

const INTERPRETATIONS = [
  { range: '0–10점', level: '유연형', desc: '완벽에 크게 매이지 않고 상황에 따라 유연하게 대처합니다.', min: 0, max: 10 },
  { range: '11–20점', level: '건강한 성실형', desc: '기준은 있지만 스스로를 몰아세우진 않습니다.', min: 11, max: 20 },
  { range: '21–30점', level: '완벽주의 성향', desc: '기준이 높고 엄격한 편입니다. 쉼의 기준도 함께 세워 보세요.', min: 21, max: 30 },
  { range: '31–40점', level: '강한 완벽주의', desc: '스스로를 많이 소진시키는 수준입니다. “충분히 잘했다”는 피드백을 의식적으로 자주 해보세요.', min: 31, max: 40, warning: true },
];

export default function PerfectionismClient() {
  return (
    <TestRunner
      testId="perfectionism"
      title="완벽주의 성향 테스트"
      introDesc="완벽을 추구하는 성향이 내 삶을 얼마나 눌러오는지 점검하는 테스트입니다."
      icon={<Target size={28} />}
      questions={QUESTIONS}
      options={OPTIONS}
      interpretations={INTERPRETATIONS}
      maxScore={40}
    />
  );
}
