'use client';

import { Coffee } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '아침에 제일 먼저 떠오르는 감정은?', options: [
    { label: '자, 또 시작해볼까', weights: { americano: 1 } },
    { label: '오늘도 화이팅~', weights: { latte: 1 } },
    { label: '기분이 달달해지고 싶다', weights: { milkshake: 1 } },
    { label: '쉬고 싶다', weights: { tea: 1 } },
    { label: '놀고 싶다', weights: { soda: 1 } },
    { label: '조용하고 진하게', weights: { wine: 1 } },
  ]},
  { text: '친구한테 듣는 말?', options: [
    { label: '쿨하다', weights: { americano: 1 } },
    { label: '잘 웃어', weights: { latte: 1 } },
    { label: '너 보면 기분 좋아져', weights: { milkshake: 1 } },
    { label: '조용하고 착해', weights: { tea: 1 } },
    { label: '텐션이 장난아님', weights: { soda: 1 } },
    { label: '분위기 있어', weights: { wine: 1 } },
  ]},
  { text: '연애 스타일?', options: [
    { label: '쓸데없는 감정 소비 안 함', weights: { americano: 1 } },
    { label: '따뜻하고 안정적인 연애', weights: { latte: 1 } },
    { label: '이벤트 많은 달달한 연애', weights: { milkshake: 1 } },
    { label: '조용하고 긴 연애', weights: { tea: 1 } },
    { label: '텐션 높은 티키타카', weights: { soda: 1 } },
    { label: '성숙하고 묵직한 관계', weights: { wine: 1 } },
  ]},
  { text: '너의 MBTI 첫 글자?', options: [
    { label: 'T (논리)', weights: { americano: 1 } },
    { label: 'F (감성)', weights: { latte: 1 } },
    { label: 'F (감성)', weights: { milkshake: 1 } },
    { label: 'I (내향)', weights: { tea: 1 } },
    { label: 'E (외향)', weights: { soda: 1 } },
    { label: 'N (직관)', weights: { wine: 1 } },
  ]},
  { text: '내 취향 디저트는?', options: [
    { label: '쌉쌀한 다크 초콜릿', weights: { americano: 1 } },
    { label: '크림 가득 티라미수', weights: { latte: 1 } },
    { label: '딸기 생크림 케이크', weights: { milkshake: 1 } },
    { label: '쑥떡/양갱', weights: { tea: 1 } },
    { label: '젤리/마카롱', weights: { soda: 1 } },
    { label: '치즈 플레이트', weights: { wine: 1 } },
  ]},
  { text: '내 SNS 업로드 스타일은?', options: [
    { label: '잘 안 올림. 감정 낭비 싫음', weights: { americano: 1 } },
    { label: '가끔 따뜻한 일상샷', weights: { latte: 1 } },
    { label: '애플갤러리 감성 풀스토리', weights: { milkshake: 1 } },
    { label: '올리기보다 관찰자', weights: { tea: 1 } },
    { label: '웃긴 짤 릴스 폭격', weights: { soda: 1 } },
    { label: '음악/영화/책 취향 공유', weights: { wine: 1 } },
  ]},
  { text: '어른스러워 보이고 싶을 때 드는 음료는?', options: [
    { label: '블랙커피', weights: { americano: 1 } },
    { label: '플랫화이트', weights: { latte: 1 } },
    { label: '바닐라라떼', weights: { milkshake: 1 } },
    { label: '허브티', weights: { tea: 1 } },
    { label: '하이볼', weights: { soda: 1 } },
    { label: '위스키 온더락', weights: { wine: 1 } },
  ]},
  { text: '나의 대화 스타일은?', options: [
    { label: '효율적이고 본론 먼저', weights: { americano: 1 } },
    { label: '공감하며 조심스럽게', weights: { latte: 1 } },
    { label: '감정 이입 풀풀', weights: { milkshake: 1 } },
    { label: '짧게 끄덕, 말보다 눈빛', weights: { tea: 1 } },
    { label: '끊임없는 리액션과 잡담', weights: { soda: 1 } },
    { label: '깊은 주제 말고는 지루함', weights: { wine: 1 } },
  ]},
  { text: '혼자만의 시간에 뭐함?', options: [
    { label: '계획 짜기/정리', weights: { americano: 1 } },
    { label: '따뜻한 음료와 영상', weights: { latte: 1 } },
    { label: '케이크 먹으며 드라마', weights: { milkshake: 1 } },
    { label: '책/명상/글쓰기', weights: { tea: 1 } },
    { label: '게임/노래방/친구 부르기', weights: { soda: 1 } },
    { label: '미드/영화/음악 감상', weights: { wine: 1 } },
  ]},
  { text: '친구가 힘들어할 때 내 반응은?', options: [
    { label: '실질적 해결책 알려줌', weights: { americano: 1 } },
    { label: '같이 있어주고 따뜻하게', weights: { latte: 1 } },
    { label: '같이 울어주고 달달한 거 사줌', weights: { milkshake: 1 } },
    { label: '조용히 들어줌', weights: { tea: 1 } },
    { label: '기분 전환 되는 자리 만들어줌', weights: { soda: 1 } },
    { label: '깊은 대화로 맥락 정리해줌', weights: { wine: 1 } },
  ]},
  { text: '선호하는 연애 템포는?', options: [
    { label: '군더더기 없이 명확하게', weights: { americano: 1 } },
    { label: '안정적이고 오래가는', weights: { latte: 1 } },
    { label: '설렘 폭발 이벤트 풍부', weights: { milkshake: 1 } },
    { label: '조용하고 깊게', weights: { tea: 1 } },
    { label: '티키타카 유쾌하게', weights: { soda: 1 } },
    { label: '성숙하고 묵직하게', weights: { wine: 1 } },
  ]},
];

const R: CategoryResult[] = [
  {
    key: 'americano', title: '☕ 아이스 아메리카노형',
    subtitle: '쿨하고 깔끔한 인생',
    tagline: '감정 낭비 제일 싫어하는 사람',
    desc: '심플하고 쓸데없는 거 싫어하는 타입. “T발 너 F야?” 소리 자주 듣지만 속은 의외로 다정. 그냥 표현 안 할 뿐.',
    emoji: '☕',
    strengths: ['판단이 빠름', '감정에 잡히지 않음', '실행력 최고'],
    weaknesses: ['따뜻한 말 부족', '감정 표현 서툶', '상대가 서운해함'],
    match: '🥛 라떼형 — 너의 쿨함을 다정함으로 채워주는 사람',
    avoid: '🥤 탄산형 — 텐션 맞추다가 너가 지침',
    tip: '한 문장만 더 따뜻하게. “수고했어” 한 마디가 큰 차이를 만들어요.',
    quote: '쿨한 사람의 따뜻함이 제일 크게 다가온다.',
  },
  {
    key: 'latte', title: '🥛 카페라떼형',
    subtitle: '따뜻한 균형감',
    tagline: '있으면 안심되는 사람',
    desc: '부드럽고 다정한 타입. 주변 사람들 기분까지 챙기는 세심한 스타일. 친구들이 진지한 고민 생기면 제일 먼저 찾는 존재.',
    emoji: '🥛',
    strengths: ['공감 능력 최상', '분위기 부드럽게 만듦', '안정감 있음'],
    weaknesses: ['혼자 다 감당하려 함', '거절 잘 못 함', '스스로 후순위'],
    match: '☕ 아메리카노형 — 너의 다정함을 쿨하게 받아주는 사람',
    avoid: '🍷 와인형 — 너무 무거워서 같이 있으면 지침',
    tip: '다 챙기려 하지 말고, 오늘은 네가 라떼 한 잔 받는 날로.',
    quote: '따뜻한 사람 곁엔 따뜻한 사람이 모인다.',
  },
  {
    key: 'milkshake', title: '🍦 딸기 밀크쉐이크형',
    subtitle: '감성 + 달달함',
    tagline: '보고 있으면 설레는 사람',
    desc: '감성 풍부하고 디테일 챙기는 스타일. 일상도 이벤트처럼 만들 줄 아는 사람. 감정 기복은 크지만 그만큼 사랑도 많이 주는 타입.',
    emoji: '🍦',
    strengths: ['감성 풍부', '로맨틱한 분위기', '디테일 챙김'],
    weaknesses: ['기분 기복 큼', '생각 많음', '서운함 잘 느낌'],
    match: '🫖 차형 — 너의 감정을 차분히 담아주는 사람',
    avoid: '☕ 아메리카노형 — 너의 감성이 이해받기 어려움',
    tip: '달달한 기분도 좋지만, 혼자 몰아치는 감정은 조금만 식혀보세요.',
    quote: '감성은 인생의 설탕이다.',
  },
  {
    key: 'tea', title: '🫖 우전녹차/보이차형',
    subtitle: '은은함 + 깊이',
    tagline: '조용히 오래 곁에 있는 사람',
    desc: '말수 적고 차분한 스타일. 근데 한번 친해지면 인생의 절반을 함께할 정도로 깊어지는 관계를 만드는 타입. 감정도 천천히 오래 가는 사람.',
    emoji: '🫖',
    strengths: ['진중하고 차분함', '관계가 깊음', '분위기가 고요'],
    weaknesses: ['에너지 많은 자리 힘듦', '표현이 너무 적음', '외로움 잘 탐'],
    match: '🍦 밀크쉐이크형 — 너의 고요를 따뜻하게 채워주는 사람',
    avoid: '🥤 탄산형 — 템포가 안 맞아 피곤함',
    tip: '너의 깊이를 아는 사람에게 조금만 더 문을 열어보세요.',
    quote: '조용한 사람이 가장 오래 남는다.',
  },
  {
    key: 'soda', title: '🥤 탄산 음료형',
    subtitle: '텐션 폭발, 유쾌 그 자체',
    tagline: '너만 있으면 자리가 뜸',
    desc: '웃음 전도사, 에너지 터지는 스타일. 모임의 분위기를 책임지는 존재. 친구들이 “너만 있으면 재밌다”는 말 엄청 많이 듣는 사람.',
    emoji: '🥤',
    strengths: ['유머 감각 최상', '분위기 메이커', '친화력 폭발'],
    weaknesses: ['감정 숨기기', '혼자 시간 부족', '진지한 거 약함'],
    match: '🥛 라떼형 — 너의 템포를 부드럽게 받아주는 사람',
    avoid: '🫖 차형 — 자리가 너무 조용해서 둘 다 힘듦',
    tip: '웃음 뒤의 네 기분도 살펴주세요. 너도 힐링이 필요한 사람이에요.',
    quote: '밝은 사람이 남몰래 제일 많이 애쓰고 있다.',
  },
  {
    key: 'wine', title: '🍷 와인형',
    subtitle: '성숙 + 묵직한 매력',
    tagline: '나이보다 어른스러운 사람',
    desc: '분위기 있고, 삶의 밀도가 깊은 스타일. 가볍게 만나는 대신 진하게 오래 가는 관계를 선호. 말보단 존재감 자체로 빛나는 타입.',
    emoji: '🍷',
    strengths: ['성숙하고 안정적', '깊이 있는 매력', '인생관이 명확함'],
    weaknesses: ['벽이 높음', '가까워지기 어려움', '너무 진지해서 외로움'],
    match: '🫖 차형 — 대화가 끝없이 깊어지는 관계',
    avoid: '🥤 탄산형 — 템포가 너무 빨라서 지침',
    tip: '가끔은 와인잔 대신 사이다 한 잔 해봐요. 인생도 살짝 가벼워져요.',
    quote: '진짜 어른은 자신의 속도를 아는 사람이다.',
  },
];

export default function BeverageClient() {
  return (
    <CategoryTestRunner
      testId="beverage"
      title="나를 음료로 표현한다면?"
      introDesc="5문항으로 알아보는 나의 음료 성격. 친구들한테 공유하고 맞춰보세요."
      icon={<Coffee size={28} />}
      questions={Q}
      results={R}
    />
  );
}
