'use client';

import { HeartHandshake } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '연인이 연락이 뜸할 때 나는?', options: [
    { label: '바쁜가 보다 하고 기다린다', weights: { secure: 1 } },
    { label: '불안해서 자꾸 연락하게 된다', weights: { anxious: 1 } },
    { label: '나도 거리를 두고 싶어진다', weights: { avoidant: 1 } },
    { label: '불안하기도 하고 거리도 두고 싶다', weights: { fearful: 1 } },
  ]},
  { text: '관계에서 가장 불안한 순간은?', options: [
    { label: '딱히 없다, 대체로 편하다', weights: { secure: 1 } },
    { label: '상대의 마음이 식었을 때', weights: { anxious: 1 } },
    { label: '상대가 나에게 너무 가까이 올 때', weights: { avoidant: 1 } },
    { label: '가까워지면서 상처받을 걸 상상할 때', weights: { fearful: 1 } },
  ]},
  { text: '내 감정을 잘 드러내는 편인가?', options: [
    { label: '네, 솔직하게 표현한다', weights: { secure: 1 } },
    { label: '표현하지만 반응이 신경쓰인다', weights: { anxious: 1 } },
    { label: '거의 표현하지 않는 편', weights: { avoidant: 1 } },
    { label: '표현하고 싶은데 무섭다', weights: { fearful: 1 } },
  ]},
  { text: '상대가 힘들 때 나는?', options: [
    { label: '옆에서 편하게 함께 있어준다', weights: { secure: 1 } },
    { label: '내가 부족해서 그런가 자책한다', weights: { anxious: 1 } },
    { label: '무슨 말을 해야 할지 막막하다', weights: { avoidant: 1 } },
    { label: '돕고 싶지만 거리를 두게 된다', weights: { fearful: 1 } },
  ]},
  { text: '헤어진 뒤 나는?', options: [
    { label: '슬프지만 시간이 지나면 회복된다', weights: { secure: 1 } },
    { label: '오랫동안 매달리고 집착한다', weights: { anxious: 1 } },
    { label: '금방 다음으로 넘어간다', weights: { avoidant: 1 } },
    { label: '다시 만나고 싶기도, 도망치고 싶기도 하다', weights: { fearful: 1 } },
  ]},
  { text: '관계에 대한 기본 믿음은?', options: [
    { label: '사람을 믿고 나도 사랑받을 만하다', weights: { secure: 1 } },
    { label: '사랑받고 싶지만 자주 불안하다', weights: { anxious: 1 } },
    { label: '가까워지는 것 자체가 부담스럽다', weights: { avoidant: 1 } },
    { label: '사랑받고 싶지만 두렵기도 하다', weights: { fearful: 1 } },
  ]},
  { text: '내가 연인에게 자주 하는 말은?', options: [
    { label: '같이 얘기해 보자', weights: { secure: 1 } },
    { label: '나 좋아하는 거 맞아?', weights: { anxious: 1 } },
    { label: '혼자 생각 좀 할게', weights: { avoidant: 1 } },
    { label: '내가 문제인 것 같아', weights: { fearful: 1 } },
  ]},
  { text: '이상적인 관계의 거리감은?', options: [
    { label: '적당히 가깝고 각자도 있는 관계', weights: { secure: 1 } },
    { label: '거의 붙어있는 관계', weights: { anxious: 1 } },
    { label: '느슨하고 자유로운 관계', weights: { avoidant: 1 } },
    { label: '가깝고 싶지만 너무 가까우면 무섭다', weights: { fearful: 1 } },
  ]},
];

const R: CategoryResult[] = [
  { key: 'secure', title: '안정형 (Secure)', subtitle: '가까움과 독립 모두 편안한 타입', desc: '상대와 자신을 모두 신뢰합니다. 갈등이 생겨도 대화로 풀어가는 힘이 있어요.', emoji: '🌳' },
  { key: 'anxious', title: '불안형 (Anxious)', subtitle: '사랑을 갈구하는 타입', desc: '관계에서 사랑을 갈망하지만 버려짐의 불안이 커요. 상대의 반응에 크게 흔들립니다.', emoji: '💭' },
  { key: 'avoidant', title: '회피형 (Avoidant)', subtitle: '거리와 독립을 선호', desc: '가까워지는 순간 부담을 느낍니다. 감정 표현보다 혼자 처리하는 편이에요.', emoji: '🧊' },
  { key: 'fearful', title: '혼란형 (Fearful-avoidant)', subtitle: '가까워지고 싶지만 두려운', desc: '사랑받고 싶은 마음과 상처받기 싫은 마음이 함께 있어 관계가 복잡해집니다.', emoji: '🌪️' },
];

export default function AttachmentClient() {
  return (
    <CategoryTestRunner
      testId="attachment"
      title="애착유형 테스트"
      introDesc="연애·관계에서 나의 애착 스타일을 확인해 보는 테스트입니다. 8문항, 약 2분."
      icon={<HeartHandshake size={28} />}
      questions={Q}
      results={R}
    />
  );
}
