'use client';

import { History } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '전생에 너가 즐겨 입었을 것 같은 옷은?', options: [
    { label: '비단으로 된 길고 우아한 옷', weights: { noble: 1 } },
    { label: '먹물 묻은 선비의 두루마기', weights: { scholar: 1 } },
    { label: '흙 묻은 소박한 일상복', weights: { farmer: 1 } },
    { label: '여행자의 망토와 가죽 가방', weights: { wanderer: 1 } },
    { label: '무대 의상과 화려한 장신구', weights: { artist: 1 } },
    { label: '마법사의 로브와 지팡이', weights: { sage: 1 } },
  ]},
  { text: '너가 가장 끌리는 장소는?', options: [
    { label: '고궁, 유서 깊은 저택', weights: { noble: 1 } },
    { label: '오래된 도서관, 서점', weights: { scholar: 1 } },
    { label: '논밭, 시골 풍경', weights: { farmer: 1 } },
    { label: '기차역, 공항', weights: { wanderer: 1 } },
    { label: '극장, 공연장', weights: { artist: 1 } },
    { label: '산속, 오래된 절', weights: { sage: 1 } },
  ]},
  { text: '너가 설명할 수 없게 편안한 순간은?', options: [
    { label: '고급스러운 공간에 있을 때', weights: { noble: 1 } },
    { label: '책에 둘러싸여 있을 때', weights: { scholar: 1 } },
    { label: '자연에서 햇볕 쬘 때', weights: { farmer: 1 } },
    { label: '낯선 도시를 걸을 때', weights: { wanderer: 1 } },
    { label: '무대/카메라 앞에 섰을 때', weights: { artist: 1 } },
    { label: '아무도 없는 새벽에 혼자', weights: { sage: 1 } },
  ]},
  { text: '사람들이 너한테 자주 하는 말?', options: [
    { label: '우아하다, 기품 있어 보여', weights: { noble: 1 } },
    { label: '똑똑해 보인다, 박식하네', weights: { scholar: 1 } },
    { label: '편안하다, 착하다', weights: { farmer: 1 } },
    { label: '자유로워 보인다', weights: { wanderer: 1 } },
    { label: '끼가 있다, 주목받는 스타일', weights: { artist: 1 } },
    { label: '신비롭다, 뭔가 깊어보여', weights: { sage: 1 } },
  ]},
  { text: '가장 끌리는 취미는?', options: [
    { label: '와인, 다도, 고급 클래스', weights: { noble: 1 } },
    { label: '책 읽기, 공부', weights: { scholar: 1 } },
    { label: '식물 키우기, 요리', weights: { farmer: 1 } },
    { label: '여행, 새로운 경험', weights: { wanderer: 1 } },
    { label: '춤, 노래, 그림', weights: { artist: 1 } },
    { label: '명상, 타로, 점성술', weights: { sage: 1 } },
  ]},
  { text: '너의 약점은?', options: [
    { label: '체면과 자존심이 너무 큼', weights: { noble: 1 } },
    { label: '지식으로 사람을 판단함', weights: { scholar: 1 } },
    { label: '거절을 잘 못함', weights: { farmer: 1 } },
    { label: '정착을 못함', weights: { wanderer: 1 } },
    { label: '관심받고 싶은 욕구가 큼', weights: { artist: 1 } },
    { label: '사람들과 거리를 두는 편', weights: { sage: 1 } },
  ]},
  { text: '전생에 네가 좋아했을 음식은?', options: [
    { label: '궁중 수라상', weights: { noble: 1 } },
    { label: '차와 다식', weights: { scholar: 1 } },
    { label: '갓 지은 밥과 된장국', weights: { farmer: 1 } },
    { label: '여정 중 맛본 이국 요리', weights: { wanderer: 1 } },
    { label: '잔칫날 주인공 음식', weights: { artist: 1 } },
    { label: '산에서 따 온 나물과 약초', weights: { sage: 1 } },
  ]},
  { text: '너의 전생 신체적 특징은?', options: [
    { label: '고운 피부와 단정한 자세', weights: { noble: 1 } },
    { label: '가는 손가락과 안경을 좋아함', weights: { scholar: 1 } },
    { label: '흙이 묻어도 상관없는 손', weights: { farmer: 1 } },
    { label: '먼 거리를 많이 걷는 다리', weights: { wanderer: 1 } },
    { label: '표정 변화가 풍부함', weights: { artist: 1 } },
    { label: '깊이 있는 눈빛', weights: { sage: 1 } },
  ]},
  { text: '내가 좋아하는 책의 장르는?', options: [
    { label: '역사/전기', weights: { noble: 1 } },
    { label: '철학/사회과학', weights: { scholar: 1 } },
    { label: '에세이/귀농일지', weights: { farmer: 1 } },
    { label: '여행기/모험소설', weights: { wanderer: 1 } },
    { label: '시/희곡/예술서', weights: { artist: 1 } },
    { label: '신비주의/종교/타로', weights: { sage: 1 } },
  ]},
  { text: '내가 지금 가장 신경쓰는 것은?', options: [
    { label: '체면과 명예', weights: { noble: 1 } },
    { label: '공부와 커리어', weights: { scholar: 1 } },
    { label: '가족과 안정', weights: { farmer: 1 } },
    { label: '자유와 새로운 경험', weights: { wanderer: 1 } },
    { label: '표현과 인정', weights: { artist: 1 } },
    { label: '내면의 평화', weights: { sage: 1 } },
  ]},
  { text: '내가 가장 싫어하는 것은?', options: [
    { label: '천박한 행동', weights: { noble: 1 } },
    { label: '무지한 대화', weights: { scholar: 1 } },
    { label: '거짓말/사기', weights: { farmer: 1 } },
    { label: '통제와 구속', weights: { wanderer: 1 } },
    { label: '무시당하는 것', weights: { artist: 1 } },
    { label: '시끄럽고 얕은 자리', weights: { sage: 1 } },
  ]},
  { text: '내가 지금 끌리는 공간의 향은?', options: [
    { label: '로즈/머스크 우아한 향', weights: { noble: 1 } },
    { label: '묵/종이/책 냄새', weights: { scholar: 1 } },
    { label: '흙과 나무 냄새', weights: { farmer: 1 } },
    { label: '바다와 비린내', weights: { wanderer: 1 } },
    { label: '향수/무대 화장품 냄새', weights: { artist: 1 } },
    { label: '향초/인센스 냄새', weights: { sage: 1 } },
  ]},
];

const R: CategoryResult[] = [
  {
    key: 'noble', title: '👑 귀족',
    subtitle: '우아함과 품위의 아이콘',
    tagline: '어느 시대든 상석에 앉았을 사람',
    desc: '전생에 너는 고귀한 가문에서 자란 귀족이었을 거예요. 정중하게 말하고, 품위를 지키는 게 몸에 배어 있어요. 그래서 지금도 싸구려 것에 잘 안 끌리는 이유.',
    emoji: '👑',
    strengths: ['품위와 예의', '자기관리 철저', '미적 감각 최상'],
    weaknesses: ['자존심 상처에 약함', '체면 차리다 손해 봄', '격식 없는 자리 힘들어함'],
    match: '🎭 예술가 — 너의 품위를 가장 빛나게 해주는 사람',
    avoid: '🌾 농부 — 속도가 안 맞아서 서로 답답함',
    tip: '품위는 지키되, 가끔은 편한 사람 앞에선 무장해제해도 돼요.',
    quote: '진짜 품격은 넘어져도 천천히 일어나는 사람에게 있다.',
  },
  {
    key: 'scholar', title: '📜 학자/선비',
    subtitle: '지식을 사랑한 지성인',
    tagline: '책 속의 문장으로 세상을 이해하는 사람',
    desc: '조용한 서재에서 책을 읽던 너. 지식에서 자유를 찾고, 대화보다 글로 표현하는 걸 좋아했을 거예요. 지금도 호기심이 많고 한 주제에 꽂히면 끝까지 파는 타입.',
    emoji: '📜',
    strengths: ['깊이 있는 사고력', '집중력 탁월', '조언이 논리적'],
    weaknesses: ['감정 표현 약함', '고집 셈', '실행보다 분석이 먼저'],
    match: '🧙 현자 — 대화가 끝없이 깊어지는 사이',
    avoid: '🎭 예술가 — 표현 방식이 너무 달라서 충돌',
    tip: '이해하려 하지 말고 그냥 느껴도 괜찮은 날이 있어요.',
    quote: '가장 박식한 사람은 “나는 모른다”고 말할 줄 아는 사람이다.',
  },
  {
    key: 'farmer', title: '🌾 농부/어부',
    subtitle: '땅에 발붙인 든든한 존재',
    tagline: '느리지만 깊이 있는 사람',
    desc: '전생에 너는 자연과 함께 살았을 거예요. 계절을 느끼며 하루를 일구던 사람. 그래서 지금도 허세 부리는 걸 싫어하고, 있는 그대로 편한 게 좋은 타입.',
    emoji: '🌾',
    strengths: ['성실함과 꾸준함', '현실 감각 최고', '사람을 진심으로 대함'],
    weaknesses: ['변화에 약함', '자기 표현 서툶', '안 쉬고 자기 갈아 씀'],
    match: '🧭 방랑자 — 너의 안정을 신선함으로 흔들어주는 사람',
    avoid: '👑 귀족 — 삶의 속도와 기준이 너무 다름',
    tip: '쉬는 것도 농사의 일부. 오늘은 한 줄이라도 “아무것도 안 하기”를 써보세요.',
    quote: '느리게 가는 사람이 가장 멀리 간다.',
  },
  {
    key: 'wanderer', title: '🧭 방랑자',
    subtitle: '자유를 사랑했던 여행자',
    tagline: '한 곳에 오래 머물지 못하는 사람',
    desc: '전생에 너는 세상을 떠돌며 노래와 이야기를 실어나르던 여행자였을 거예요. 그래서 지금도 “뜨고 싶다”는 감정이 자주 드는 이유. 새로운 풍경이 너의 에너지예요.',
    emoji: '🧭',
    strengths: ['개방적이고 쿨함', '적응력 최고', '이야기 보따리'],
    weaknesses: ['정착이 힘듦', '관계가 쉽게 얕아짐', '책임지는 거 피함'],
    match: '🎭 예술가 — 너의 자유를 이해해주는 사람',
    avoid: '🌾 농부 — 너의 발 빠름이 상대를 외롭게 만들 수 있어요',
    tip: '떠나는 게 답일 때도 있지만, 가끔은 “남는 용기”도 멋있어요.',
    quote: '길 위에 있는 사람은 이미 길을 알고 있다.',
  },
  {
    key: 'artist', title: '🎭 예술가/광대',
    subtitle: '무대 위에서 살던 사람',
    tagline: '감정을 작품으로 바꾸는 재능',
    desc: '전생에 너는 사람들을 웃기고 울리던 예술가였을 거예요. 감정이 풍부하고 표현이 아름답던 사람. 지금도 주목받을 때 제일 너답고, 창작에 중독되는 타입.',
    emoji: '🎭',
    strengths: ['창의력과 감성', '표현력 최상', '사람 마음을 움직임'],
    weaknesses: ['감정 기복 큼', '비교에 예민', '혼자 있을 때 우울'],
    match: '👑 귀족 — 너의 무대를 빛내주는 품위 있는 관객',
    avoid: '📜 학자 — 너의 감정이 이해보다 분석당함',
    tip: '작품이 아니어도 너라는 사람 자체가 이미 예술이에요.',
    quote: '세상을 바꾸는 건 완벽함이 아니라 진심이다.',
  },
  {
    key: 'sage', title: '🧙 현자/무당',
    subtitle: '세상 뒤편의 진실을 보던 사람',
    tagline: '말 없어도 다 아는 사람',
    desc: '전생에 너는 산속에서 수행하거나 신령과 통하던 현자였을 거예요. 촉이 유독 좋고, 사람들의 감정을 잘 읽어내는 이유. 혼자 있는 시간이 에너지의 원천.',
    emoji: '🧙',
    strengths: ['통찰력 최상', '직관이 날카로움', '분위기가 깊음'],
    weaknesses: ['사람과 거리감 큼', '에너지 흡수해서 쉽게 피로', '공감 후 본인이 고갈'],
    match: '📜 학자 — 대화가 무한대로 깊어지는 사이',
    avoid: '🎭 예술가 — 너의 침묵을 무관심으로 읽음',
    tip: '네 직관은 맞을 때가 많아요. 대신 혼자 다 품지 말고 조금씩 흘려보내세요.',
    quote: '보이는 것이 전부가 아니라는 걸 이미 알고 있는 사람.',
  },
];

export default function PastLifeClient() {
  return (
    <CategoryTestRunner
      testId="past-life"
      title="전생 직업 테스트"
      introDesc="내가 전생에 어떤 사람이었을까? 6문항으로 알아보는 감성 테스트."
      icon={<History size={28} />}
      questions={Q}
      results={R}
    />
  );
}
