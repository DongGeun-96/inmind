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
  {
    key: 'secure', title: '안정형 (Secure)', subtitle: '가까움과 독립 모두 편안한 타입',
    tagline: '사랑해도, 나를 잃지 않는 사람',
    desc: '상대도 자신도 믿을 수 있어요. 갈등이 생겨도 대화로 풀어가는 힘이 있고, 헤어지면 아프지만 시간이 지나면 회복도 빠른 유형이에요.',
    emoji: '🌳',
    strengths: ['감정 조절이 안정적', '상대의 다름을 존중함', '갈등 해결력이 높음', '자존감과 경계가 뚜렷'],
    weaknesses: ['너무 담담해서 따뮡해보일 수 있음', '상대의 드라마틱한 감정에 낯설기도'],
    match: '어떤 유형과도 잘 맞은 편. 특히 **불안형**을 안정시켜주는 단단한 파트너가 될 수 있어요.',
    avoid: '고의로 감정을 숯기는 상대. 나의 안정겠을 이용하려는 사람은 반드시 거르세요.',
    tip: '지금의 감각을 지키세요. 최근 너무 힐든 관계가 있다면 참고 맞춰주고 있지 않은지 점검해 보세요.',
    quote: '믿고 사랑하는 것. 이게 가장 힘들고 가장 아름다운 일이다.',
  },
  {
    key: 'anxious', title: '불안형 (Anxious)', subtitle: '사랑을 갈구하는 타입',
    tagline: '너무 사랑해서 자꺼 불안해지는 사람',
    desc: '사랑받고 싶지만 버려짐의 불안이 커요. 답장이 1분만 늦어도 머릿속이 시끄러워지고, 상대의 기분이 해석하느라 플러그를 수십 번 꾽어요. 따떡하지만 그만큼 다정한 유형.',
    emoji: '💭',
    strengths: ['감정을 깊게 느끼고 표현함', '공감 능력이 탁월', '노력하고 헌신적인 사랑'],
    weaknesses: ['연락 집착, 확인 요구가 잦음', '상대의 작은 변화에 감정 기복이 크고 생각 폭주가 옵', '관계 이외의 삶이 흘려가기 쉽음'],
    match: '답장이 꺾꺾하고 **아사 멍한 안정형**이 제일 잘 맞아요. 애정을 표현해주는 사람이면 더 좋고요.',
    avoid: '감정 표현을 귀찮아하는 강한 회피형. 불안이 더 폭주해요.',
    tip: '상대의 침묵을 나밊으로 읽지 마세요. 그냥 운전 중일 수도 있습니다. 연락에 반응하기 전 **10분 기다리는 습관**을 들여보세요.',
    quote: '사랑받고 싶은 마음은 약점이 아니야, 그저 강렬할 뿐이야.',
  },
  {
    key: 'avoidant', title: '회피형 (Avoidant)', subtitle: '거리와 독립을 사랑하는 타입',
    tagline: '가까워지면 미들고 멀어지면 그리워',
    desc: '감정 표현은 어색하지만 마음이 없는 건 아니에요. 상대가 너무 가까이 다가오면 숨막히고, 혼자가 되면 전화와 연락이 그리워져요. 남에게 의지하는 게 제일 어렵습니다.',
    emoji: '🧊',
    strengths: ['독립적이고 자존점 감정 요동이 적음', '자기 공간을 잘 지키고 자기 일에 집중', '상대를 감정적으로 압박하지 않음'],
    weaknesses: ['감정 표현이 서투릅고 떨어져 보임', '갈등이 생기면 대화 대신 잠수', '상대에게 상처주는 중인줄 모르고 상처입는 경우도'],
    match: '잠수하는 시간을 존중해주는 **안정형** 또는 **같은 회피형** 중 열린 사람.',
    avoid: '끊임없이 확인을 요구하는 **강한 불안형**. 서로 너무 힘들어지는 조합이에요.',
    tip: '끝내기 위한 거리두기가 아니라 **머물기 위한 거리두기**라고 상대에게 한 줄이라도 말해주세요.',
    quote: '혼자의 시간이 사랑의 반대말은 아니야.',
  },
  {
    key: 'fearful', title: '혼란형 (Fearful-avoidant)', subtitle: '사랑하고 싶고, 도말가고 싶은',
    tagline: '두 마음이 매일 씨우는 사람',
    desc: '사랑받고 싶은 즐아장과 상처받기 싫은 방어가 함께 있어요. 가까워진 순간 문득 하락실을 상상하는 저녀, 그러면서도 연락이 오면 웃을 수밖에 없는 사람. 그만큼 예민한 감수성을 지닌 유형이에요.',
    emoji: '🌪️',
    strengths: ['감정을 깊이 읽고 공감하는 능력', '상대의 상처와 불안을 빨리 알아봄', '자아성찰이 강함'],
    weaknesses: ['감정이 급공치라 관계가 불안정해지기 쉽음', '믿고 싶지만 믿기 전에 환멸을 먼저 상상', '자책과 회피를 동시에 함'],
    match: '**단단하고 잠잠한 안정형**. 표현이 일관되고 믿음이 가는 사람이 필요해요.',
    avoid: '감정이 일관되지 않은 사람, 착했다 냉했다 하는 관계.',
    tip: '감정이 돌풍할 때 바로 결론을 내리지 마세요. 24시간 꼭 잠재워 두고 말하는 습관이 많이 도움이 돼요.',
    quote: '받아보는 것도 연습이 필요하다.',
  },
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
