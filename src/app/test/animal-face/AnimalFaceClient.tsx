'use client';

import { PawPrint } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '평소 다른 사람들이 너한테 자주 하는 말은?', options: [
    { label: '되게 귀엽게 생겼다', weights: { puppy: 1 } },
    { label: '도도해 보여', weights: { cat: 1 } },
    { label: '순해 보여', weights: { rabbit: 1 } },
    { label: '잘생겼다/시크하다', weights: { wolf: 1 } },
    { label: '분위기 있다', weights: { deer: 1 } },
    { label: '엉뚱하고 재밌어', weights: { hamster: 1 } },
  ]},
  { text: '친구 모임에서 너는?', options: [
    { label: '금방 친해지는 애교쟁이', weights: { puppy: 1 } },
    { label: '처음엔 거리두다 천천히', weights: { cat: 1 } },
    { label: '다 들어주는 리액션봇', weights: { rabbit: 1 } },
    { label: '말 많지 않은 쿨한 편', weights: { wolf: 1 } },
    { label: '혼자 있어도 분위기 잡힘', weights: { deer: 1 } },
    { label: '괜히 사고 치는 텐션러', weights: { hamster: 1 } },
  ]},
  { text: '너의 연애 스타일은?', options: [
    { label: '애교 많고 감정 풍부', weights: { puppy: 1 } },
    { label: '먼저 안 다가감, 밀당', weights: { cat: 1 } },
    { label: '다 맞춰주는 천사', weights: { rabbit: 1 } },
    { label: '표현 적지만 한결같음', weights: { wolf: 1 } },
    { label: '분위기 잡는 로맨티스트', weights: { deer: 1 } },
    { label: '장난스럽고 유쾌', weights: { hamster: 1 } },
  ]},
  { text: '선호하는 시간?', options: [
    { label: '산책하기 좋은 오후', weights: { puppy: 1 } },
    { label: '혼자 보내는 조용한 밤', weights: { cat: 1 } },
    { label: '햇살 좋은 아침', weights: { rabbit: 1 } },
    { label: '늦은 밤의 고요함', weights: { wolf: 1 } },
    { label: '비 오는 저녁', weights: { deer: 1 } },
    { label: '친구 만나는 오후 3시', weights: { hamster: 1 } },
  ]},
  { text: '스트레스 받을 때 대처법?', options: [
    { label: '친구한테 바로 연락', weights: { puppy: 1 } },
    { label: '혼자 방에서 침묵', weights: { cat: 1 } },
    { label: '달달한 거 먹기', weights: { rabbit: 1 } },
    { label: '운동이나 드라이브', weights: { wolf: 1 } },
    { label: '조용한 카페 혼자', weights: { deer: 1 } },
    { label: '노래방 or 배달음식', weights: { hamster: 1 } },
  ]},
  { text: '이상형에 가까운 건?', options: [
    { label: '다정하고 잘 웃는 사람', weights: { puppy: 1 } },
    { label: '쿨하고 매력 있는 사람', weights: { cat: 1 } },
    { label: '순하고 착한 사람', weights: { rabbit: 1 } },
    { label: '무뚝뚝해도 책임감 있는 사람', weights: { wolf: 1 } },
    { label: '분위기 있는 사람', weights: { deer: 1 } },
    { label: '웃기고 재밌는 사람', weights: { hamster: 1 } },
  ]},
];

const R: CategoryResult[] = [
  {
    key: 'puppy', title: '🐶 강아지상', subtitle: '다정함 + 애교 폭발',
    tagline: '보고만 있어도 기분 좋아지는 사람',
    desc: '눈웃음이 예쁘고 분위기가 둥글둥글. 친구도 잘 사귀고 사랑도 많이 받는 타입. “귀엽다”는 말을 평생 듣는 사람 1순위.',
    emoji: '🐶',
    strengths: ['친화력 끝판왕', '사람에게 사랑받음', '긍정 에너지 최강'],
    weaknesses: ['혼자 있는 거 약함', '감정 잘 티남', '다 맞춰주다 지침'],
    match: '🐺 늑대상 — 너의 에너지를 받아주는 든든한 스타일',
    avoid: '🐱 고양이상 — 밀당 스타일이라 너가 자꾸 지칠 수 있음',
    tip: '사랑받으려 애쓰지 않아도 이미 충분히 사랑스러워요.',
    quote: '다정한 얼굴은 가장 강력한 무기다.',
  },
  {
    key: 'cat', title: '🐱 고양이상', subtitle: '도도함과 매력의 아이콘',
    tagline: '궁금하게 만드는 사람',
    desc: '은은한 눈매, 매력적인 분위기. 먼저 다가가지 않지만 보고 있으면 끌리는 타입. 친해지면 반전 매력이 쏟아져요.',
    emoji: '🐱',
    strengths: ['독립적이고 쿨함', '자기 관리 잘함', '의외의 애교가 있음'],
    weaknesses: ['표현이 서툶', '가까워지는 데 시간 오래 걸림', '관심 없을 땐 너무 냉정'],
    match: '🐶 강아지상 — 너에게 따뜻하게 다가와주는 사람',
    avoid: '🐹 햄스터상 — 텐션 너무 높아서 쉽게 피곤해짐',
    tip: '가끔은 먼저 연락해도 멋 안 떨어집니다. 안 해서 놓치는 관계가 더 아까워요.',
    quote: '모든 매력은 약간의 거리에서 시작된다.',
  },
  {
    key: 'rabbit', title: '🐰 토끼상', subtitle: '착한 얼굴 + 순한 성격',
    tagline: '보호 본능 자극하는 사람',
    desc: '동글동글한 얼굴에 순한 분위기. 누구에게나 친절하고 잘 웃어서 주변에 사람이 자연스럽게 모여요. 가끔 본인이 더 챙김 받아야 할 사람.',
    emoji: '🐰',
    strengths: ['사람을 편하게 해줌', '상대를 잘 배려함', '잘 웃고 긍정적'],
    weaknesses: ['거절 잘 못 함', '혼자 쌓아둠', '너무 착해서 이용당하기도'],
    match: '🐺 늑대상 — 너를 든든하게 지켜주는 스타일',
    avoid: '🐯 (미정) — 너의 선을 지켜주지 않는 사람은 걸러요',
    tip: '친절하되, “나는 지금 피곤해”라는 말도 꼭 연습해 보세요.',
    quote: '착한 사람일수록 자기 경계가 필요합니다.',
  },
  {
    key: 'wolf', title: '🐺 늑대상', subtitle: '시크함 + 한결같음',
    tagline: '말수는 적지만 신뢰감 있는 사람',
    desc: '샤프한 인상에 표현은 적지만 한번 마음 열면 끝까지 가는 타입. 친구들 사이에서 “쟤가 제일 든든해”라는 평가 많이 듣는 사람.',
    emoji: '🐺',
    strengths: ['책임감 최강', '한번 맺은 관계 오래감', '일 제대로 해냄'],
    weaknesses: ['감정 표현 서툶', '혼자 다 해결하려 함', '가끔 차가워 보임'],
    match: '🐶 강아지상 · 🐰 토끼상 — 너의 시크함을 다정함으로 녹여주는 사람',
    avoid: '🦌 사슴상 — 둘 다 말을 안 해서 오해가 쌓여요',
    tip: '말하지 않으면 상대는 몰라요. 한 줄이라도 마음을 표현해 보세요.',
    quote: '강한 사람일수록 부드러움이 빛을 발한다.',
  },
  {
    key: 'deer', title: '🦌 사슴상', subtitle: '분위기 1절, 신비로움 2절',
    tagline: '가만히 있어도 작품 같은 사람',
    desc: '예쁜 이목구비에 은근한 분위기. 조용히 있어도 눈에 띄는 타입. 감성 충만해서 혼자 사색하는 시간을 사랑해요.',
    emoji: '🦌',
    strengths: ['감성과 예술성', '혼자 잘 놈', '고유한 분위기'],
    weaknesses: ['가까워지기 어려움', '감정에 깊이 빠짐', '차가워 보일 때 있음'],
    match: '🐶 강아지상 — 너의 조용함을 편하게 깨워줄 사람',
    avoid: '🐺 늑대상 — 서로 너무 말을 안 해요',
    tip: '내 감정이 너무 깊어질 땐 글로 써보면 정리가 돼요.',
    quote: '고요한 사람에게는 별이 머문다.',
  },
  {
    key: 'hamster', title: '🐹 햄스터상', subtitle: '귀염 + 엉뚱함 + 파워 텐션',
    tagline: '보고 있으면 자꾸 웃음 나는 사람',
    desc: '볼살 복실복실, 행동 엉뚱하고 귀여움. 친구들이 너 보면 자동 웃음 트리거 발동. 단체 카톡방에서 가장 웃긴 애 담당.',
    emoji: '🐹',
    strengths: ['유머 감각 최강', '사람 기분 풀어줌', '귀여움 치트키'],
    weaknesses: ['진지 타임에 약함', '덜렁댐', '감정 요동 큼'],
    match: '🐺 늑대상 — 너의 엉뚱함을 다 받아줌',
    avoid: '🐱 고양이상 — 너무 쿨해서 너의 웃음 에너지가 멋쩍음',
    tip: '재미있는 사람도 가끔 진지해도 괜찮아요. 속 얘기는 속으로 쌓이면 힘들어요.',
    quote: '웃기는 사람은 세상을 가볍게 만든다.',
  },
];

export default function AnimalFaceClient() {
  return (
    <CategoryTestRunner
      testId="animal-face"
      title="동물상 테스트"
      introDesc="강아지·고양이·토끼·늑대·사슴·햄스터 중 나는 어떤 동물상? 6문항으로 알아보세요."
      icon={<PawPrint size={28} />}
      questions={Q}
      results={R}
    />
  );
}
