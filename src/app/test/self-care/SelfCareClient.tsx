'use client';

import { Leaf } from 'lucide-react';
import TestRunner from '../TestRunner';

const QUESTIONS = [
  '주기적으로 나만의 회복 루틴(산책·명상·스트레칭 등)을 가진다.',
  '잠은 보통 6시간 이상 규칙적으로 잔다.',
  '주 2회 이상 몸을 움직이는 활동을 한다.',
  '지칠 때 나에게 “그럴 수 있어”라고 말해 준다.',
  '식사를 거르지 않고 챙겨 먹는다.',
  '마음을 나눌 수 있는 사람이 최소 1명 이상 있다.',
  '해야 할 일과 하고 싶은 일의 균형을 의식적으로 잡는다.',
  '도움이 필요할 때 도움을 요청할 수 있다.',
  '일과 분리되는 취미나 즐거움이 있다.',
  '스스로에게 작은 보상을 자주 준다.',
];

const OPTIONS = [
  { value: 0, label: '전혀 아니다' },
  { value: 1, label: '아닌 편' },
  { value: 2, label: '보통' },
  { value: 3, label: '그런 편' },
  { value: 4, label: '매우 그렇다' },
];

const INTERPRETATIONS = [
  { range: '0–10점', level: '자기돌봄 저조', desc: '나를 챙기는 시간이 많이 부족한 상태입니다. 작은 루틴 하나부터 시작해 보세요.', min: 0, max: 10, warning: true },
  { range: '11–20점', level: '기본은 되어있음', desc: '최소한의 자기돌봄은 유지되고 있습니다. 한 가지를 업그레이드해 보세요.', min: 11, max: 20 },
  { range: '21–30점', level: '안정적 자기돌봄', desc: '꽤 잘 챙기고 있습니다. 지금 루틴을 지키는 것이 중요해요.', min: 21, max: 30 },
  { range: '31–40점', level: '자기돌봄 고수', desc: '매우 건강한 자기돌봄 수준입니다. 주변에도 도움을 줄 수 있는 단계예요.', min: 31, max: 40 },
];

export default function SelfCareClient() {
  return (
    <TestRunner
      testId="self-care"
      title="자기돌봄 지수"
      introDesc="요즘 나를 얼마나 잘 챙기고 있는지 점검하는 테스트입니다."
      icon={<Leaf size={28} />}
      questions={QUESTIONS}
      options={OPTIONS}
      interpretations={INTERPRETATIONS}
      maxScore={40}
    />
  );
}
