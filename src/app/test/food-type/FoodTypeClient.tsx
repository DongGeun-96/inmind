'use client';

import { UtensilsCrossed } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '친구들이 너를 한마디로 표현한다면?', options: [
    { label: '있을 땐 모르는데 없으면 허전함', weights: { rice: 1 } },
    { label: '심심하면 생각나는 존재', weights: { ramen: 1 } },
    { label: '처음 보면 부담, 알고 보면 중독', weights: { mala: 1 } },
    { label: '가끔 선물 받으면 행복해지는 사람', weights: { cake: 1 } },
    { label: '분위기 메이커', weights: { chicken: 1 } },
    { label: '조용한데 안에 뭐가 많은 타입', weights: { kimbap: 1 } },
  ]},
  { text: '너의 MBTI 중 가장 너다운 알파벳 한 글자?', options: [
    { label: 'J - 원칙 있게', weights: { rice: 1 } },
    { label: 'P - 그때그때', weights: { ramen: 1 } },
    { label: 'T - 팩폭', weights: { mala: 1 } },
    { label: 'F - 감성', weights: { cake: 1 } },
    { label: 'E - 파티', weights: { chicken: 1 } },
    { label: 'I - 조용', weights: { kimbap: 1 } },
  ]},
  { text: '모임에서 네 역할은?', options: [
    { label: '맞장구와 리액션', weights: { rice: 1 } },
    { label: '야식 제안 담당', weights: { ramen: 1 } },
    { label: '할 말 다 하는 솔직이', weights: { mala: 1 } },
    { label: '생일 챙기는 다정이', weights: { cake: 1 } },
    { label: '분위기 몰이꾼', weights: { chicken: 1 } },
    { label: '조용한 관찰자', weights: { kimbap: 1 } },
  ]},
  { text: '헤어질 때 너의 말은?', options: [
    { label: '조심히 가', weights: { rice: 1 } },
    { label: '배고프면 연락해', weights: { ramen: 1 } },
    { label: '늦었어 얼른 가', weights: { mala: 1 } },
    { label: '오늘 너무 좋았어♡', weights: { cake: 1 } },
    { label: '한 잔만 더?', weights: { chicken: 1 } },
    { label: '들어가서 톡할게', weights: { kimbap: 1 } },
  ]},
  { text: '좋아하는 시간은?', options: [
    { label: '규칙적인 아침', weights: { rice: 1 } },
    { label: '늦은 밤 혼자', weights: { ramen: 1 } },
    { label: '자극적인 오후', weights: { mala: 1 } },
    { label: '햇살 좋은 주말 오후', weights: { cake: 1 } },
    { label: '불금 저녁 8시', weights: { chicken: 1 } },
    { label: '조용한 점심', weights: { kimbap: 1 } },
  ]},
  { text: '스트레스 풀 때?', options: [
    { label: '집에서 뒹굴', weights: { rice: 1 } },
    { label: '야식 하나 시킨다', weights: { ramen: 1 } },
    { label: '매운 거 폭식', weights: { mala: 1 } },
    { label: '디저트 카페 가기', weights: { cake: 1 } },
    { label: '친구 불러서 한잔', weights: { chicken: 1 } },
    { label: '혼자 드라이브/산책', weights: { kimbap: 1 } },
  ]},
  { text: '내 카톡 답장 속도는?', options: [
    { label: '즉시 답장 (강아지상)', weights: { rice: 1 } },
    { label: '10시가 넘어야 답장 오는 라면성', weights: { ramen: 1 } },
    { label: '이미 다 봤지만 쿨하게 내일', weights: { mala: 1 } },
    { label: '이모티콘 답정너', weights: { cake: 1 } },
    { label: '보자마자 답. 텐션 풀', weights: { chicken: 1 } },
    { label: '한잠에 몰아서 답장', weights: { kimbap: 1 } },
  ]},
  { text: '내 MZ식 사인이자 답장은?', options: [
    { label: 'ㅇㅇ 알겠서', weights: { rice: 1 } },
    { label: 'ㅋㅋㅋㅋㅋㅋ', weights: { ramen: 1 } },
    { label: '할말 있지만 참음 ㅋ', weights: { mala: 1 } },
    { label: '#@!* 하트 이모지 도배', weights: { cake: 1 } },
    { label: '얼른 나와 가자', weights: { chicken: 1 } },
    { label: 'ㅇㅋㅇㅋ', weights: { kimbap: 1 } },
  ]},
  { text: '돈을 모았다면 내 첫 소비는?', options: [
    { label: '저축/주식', weights: { rice: 1 } },
    { label: '배달음식', weights: { ramen: 1 } },
    { label: '자극적인 여행', weights: { mala: 1 } },
    { label: '비싼 디저트/카페', weights: { cake: 1 } },
    { label: '친구들과 파티', weights: { chicken: 1 } },
    { label: '작지만 오래 쓸 물건', weights: { kimbap: 1 } },
  ]},
  { text: '사는 동네에서 나는?', options: [
    { label: '동네 주민들한테 인사 잘 함', weights: { rice: 1 } },
    { label: '편의점/야식만 가끔 감', weights: { ramen: 1 } },
    { label: '시끄러운 외제차 타고 등장', weights: { mala: 1 } },
    { label: '감성 카페/꽃집 자주 감', weights: { cake: 1 } },
    { label: '옆동 술집에 내 지정석', weights: { chicken: 1 } },
    { label: '조용히 책방/서점 찾아감', weights: { kimbap: 1 } },
  ]},
  { text: '내 플레이리스트 장르는?', options: [
    { label: '팝/케이팝 대중가', weights: { rice: 1 } },
    { label: '새벽 감성 로파이', weights: { ramen: 1 } },
    { label: '힙합/하드록', weights: { mala: 1 } },
    { label: '인디/어쿠스틱', weights: { cake: 1 } },
    { label: '클럽 댄스 에너지곡', weights: { chicken: 1 } },
    { label: '재즈/클래식', weights: { kimbap: 1 } },
  ]},
  { text: '누가 "너 한마디로 표현해봐" 하면?', options: [
    { label: '편안한 사람', weights: { rice: 1 } },
    { label: '위로 잘 하는 사람', weights: { ramen: 1 } },
    { label: '재밌지만 피곤한 사람', weights: { mala: 1 } },
    { label: '사랑 많은 사람', weights: { cake: 1 } },
    { label: '밝은 사람', weights: { chicken: 1 } },
    { label: '믿음직한 사람', weights: { kimbap: 1 } },
  ]},
];

const R: CategoryResult[] = [
  {
    key: 'rice', title: '🍚 흰쌀밥형', subtitle: '없으면 허전, 있으면 당연한 존재',
    tagline: '매일 먹어도 안 질리는 사람',
    desc: '화려하진 않지만 늘 곁에 있는 존재. 너가 없으면 친구들 인생이 왠지 허전해요. 조용히 사람들을 붙잡아주는 힘이 있는 사람.',
    emoji: '🍚',
    strengths: ['꾸준하고 믿음직함', '누구와도 잘 어울림', '감정 기복이 적음'],
    weaknesses: ['존재감이 잘 티가 안 남', '너무 맞춰주다 지침', '자기주장이 약할 때 있음'],
    match: '🍗 치킨형 · 🥢 김밥형 — 너의 담백함을 제일 잘 아는 사람',
    avoid: '🌶️ 마라형 — 자극이 너무 커서 피곤해질 수 있어요',
    tip: '오늘 하루는 “내가 뭘 먹고 싶지?”부터 먼저 생각해 보세요. 양보는 그다음.',
    quote: '담백한 사람은 오래 갑니다.',
  },
  {
    key: 'ramen', title: '🍜 라면형', subtitle: '심심하면 생각나는 위로',
    tagline: '존재만으로 다정한 야식 같은 사람',
    desc: '평소엔 조용한데 밤이 되면 진가 발휘. 친구들이 힘들 때 가장 먼저 떠올리는 존재. 자극 없는 일상에서도 맛있게 사는 법을 아는 사람이에요.',
    emoji: '🍜',
    strengths: ['위로를 잘 해줌', '편한 분위기 메이커', '혼자도 잘 놈'],
    weaknesses: ['즉흥적이라 미룸병', '생활 리듬이 불규칙', '건강 챙기기 귀찮음'],
    match: '🍚 흰쌀밥형 · 🎂 케이크형 — 너의 감성을 알아주는 사람',
    avoid: '🌶️ 마라형 — 너무 자극적이라 탈남',
    tip: '새벽에 시키는 거 오늘은 참고 내일 점심에 먹기. 몸도 챙기자.',
    quote: '세상 대부분의 위로는 뜨거운 국물로 시작된다.',
  },
  {
    key: 'mala', title: '🌶️ 마라탕형', subtitle: '중독성 강한 솔직함',
    tagline: '처음엔 부담, 한 번 빠지면 못 끊는 사람',
    desc: '첫인상은 강렬, 할 말은 하는 솔직 파워. 근데 알고 보면 다정하고 의리 있어서 주변에 찐팬이 많아요. 심심한 걸 세상 제일 싫어하는 인생 즐기는 타입.',
    emoji: '🌶️',
    strengths: ['솔직하고 시원시원', '결정이 빠름', '할 말은 함'],
    weaknesses: ['가끔 말이 너무 직설적', '감정 소비가 큼', '잔소리 듣기 싫어함'],
    match: '🍗 치킨형 — 텐션이 맞아서 같이 놀면 재밌음',
    avoid: '🍚 흰쌀밥형 — 너의 자극이 버겁게 느껴질 수 있음',
    tip: '솔직함과 예의 사이 0.5초만 먼저 생각해 보기. 관계가 오래 갑니다.',
    quote: '싱거운 인생은 못 참지.',
  },
  {
    key: 'cake', title: '🎂 케이크형', subtitle: '받으면 무조건 기분 좋은 존재',
    tagline: '감성 충만, 사랑이 많은 사람',
    desc: '디테일에 진심, 기념일도 감정도 섬세하게 챙기는 타입. 너랑 있으면 별거 아닌 일도 이벤트가 돼요. 대신 감정 소비가 커서 쉴 때 확실히 쉬어야 하는 사람.',
    emoji: '🎂',
    strengths: ['감성 풍부', '사람을 잘 챙김', '작은 디테일을 기억함'],
    weaknesses: ['쉽게 상처받음', '혼자 생각 많음', '달달한 거 없으면 우울'],
    match: '🍜 라면형 · 🥢 김밥형 — 너의 섬세함을 알아주는 사람',
    avoid: '🌶️ 마라형 — 너무 자극적이라 너가 자꾸 상처받음',
    tip: '기대한 반응이 안 올 때는 서운함 대신 “다음엔 내가 말해보자”로 바꿔보기.',
    quote: '다정한 사람이 세상을 바꿉니다.',
  },
  {
    key: 'chicken', title: '🍗 치킨형', subtitle: '모이면 무조건 등장하는 주인공',
    tagline: '인생 즐기는 분위기 메이커',
    desc: '친구들이 “너 없으면 노잼”이라고 말하는 그 사람. 모임 약속 잡는 건 늘 너의 몫. 노는 것도 잘하고, 사람도 잘 챙기는 타입.',
    emoji: '🍗',
    strengths: ['분위기 메이커', '친화력 최강', '에너지 풍부'],
    weaknesses: ['혼자 있는 거 못 견딤', '가끔 오버함', '조용한 자리에 약함'],
    match: '🌶️ 마라형 · 🎂 케이크형 — 너의 텐션을 받아주는 사람',
    avoid: '🥢 김밥형 — 너무 조용해서 답답할 수 있음 (근데 의외로 잘 맞기도 해요)',
    tip: '매일 바쁘게 사느라 진짜 내 기분 놓치지 말기. 가끔 혼자 시간도 챙기기.',
    quote: '즐겁게 사는 것도 재능입니다.',
  },
  {
    key: 'kimbap', title: '🥢 김밥형', subtitle: '겉은 단정, 속은 꽉 찬',
    tagline: '조용하지만 속이 꽉 찬 사람',
    desc: '말수 적은데 들어보면 다 의미 있음. 관찰력 최상, 내 편은 제대로 챙기는 조용한 진국. 겉으론 티 안 나는데 안에서 생각 많이 하는 타입이에요.',
    emoji: '🥢',
    strengths: ['속 깊고 차분', '신뢰도 최상', '센스 있음'],
    weaknesses: ['감정 표현 서툶', '혼자 다 안고 감', '티를 안 내서 오해받음'],
    match: '🍚 흰쌀밥형 · 🎂 케이크형 — 너의 속을 알아봐주는 사람',
    avoid: '🌶️ 마라형 — 너의 고요함을 부담으로 읽음',
    tip: '티 내도 돼요. 안에만 담아두면 너만 힘들어집니다.',
    quote: '조용한 사람이 제일 강한 법.',
  },
];

export default function FoodTypeClient() {
  return (
    <CategoryTestRunner
      testId="food-type"
      title="나를 음식으로 표현한다면?"
      introDesc="6문항으로 알아보는 나의 음식 성격. 친구들한테 결과 자랑해 보세요."
      icon={<UtensilsCrossed size={28} />}
      questions={Q}
      results={R}
    />
  );
}
