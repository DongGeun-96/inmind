'use client';

import { MessageCircle } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '친구가 내 얘기를 들을 때 가장 고마운 반응은?', options: [
    { label: '“완전 내 얘기 같아” 공감', weights: { empathy: 1 } },
    { label: '구체적인 해결책 제시', weights: { advice: 1 } },
    { label: '같이 움직여서 기분 전환', weights: { action: 1 } },
    { label: '조용히 옆에 있어주는 것', weights: { presence: 1 } },
  ]},
  { text: '힘든 밤에 내가 원하는 것은?', options: [
    { label: '내 마음 알아주는 말', weights: { empathy: 1 } },
    { label: '다음에 뭘 할지 정리', weights: { advice: 1 } },
    { label: '나가서 맛있는 거 먹기', weights: { action: 1 } },
    { label: '말없이 같이 있어주기', weights: { presence: 1 } },
  ]},
  { text: '내가 남을 위로할 때도 이렇게 한다?', options: [
    { label: '그 마음 나도 안다고 말한다', weights: { empathy: 1 } },
    { label: '이렇게 해보라고 조언한다', weights: { advice: 1 } },
    { label: '바람 쐬러 같이 나간다', weights: { action: 1 } },
    { label: '말없이 옆을 지킨다', weights: { presence: 1 } },
  ]},
  { text: '제일 싫은 위로 방식은?', options: [
    { label: '내 감정을 가볍게 넘기는 것', weights: { empathy: 1 } },
    { label: '무조건 공감만 하고 방치하는 것', weights: { advice: 1 } },
    { label: '말로만 하고 같이 안 움직이는 것', weights: { action: 1 } },
    { label: '조언만 잔뜩 쏟아내는 것', weights: { presence: 1 } },
  ]},
];

const R: CategoryResult[] = [
  { key: 'empathy', title: '공감형', subtitle: '“그랬구나, 힘들었겠다”', desc: '마음을 그대로 읽어주는 말이 제일 큰 위로예요.', emoji: '🫂' },
  { key: 'advice', title: '조언형', subtitle: '“이렇게 해보면 어때?”', desc: '현실적 해결책과 방향성에서 힘을 얻습니다.', emoji: '🧭' },
  { key: 'action', title: '행동형', subtitle: '“같이 나가자”', desc: '함께 움직이거나 환경을 바꾸는 데서 회복됩니다.', emoji: '🚶' },
  { key: 'presence', title: '옆에있기형', subtitle: '“말 안 해도 돼, 옆에 있을게”', desc: '말보다 존재 자체가 위로가 되는 타입이에요.', emoji: '🕯️' },
];

export default function ComfortStyleClient() {
  return (
    <CategoryTestRunner
      testId="comfort"
      title="위로 받는 방식 테스트"
      introDesc="내가 어떻게 위로받을 때 가장 마음이 풀리는지 확인해 보세요."
      icon={<MessageCircle size={28} />}
      questions={Q}
      results={R}
    />
  );
}
