'use client';

import { Film } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

const Q: CategoryQuestion[] = [
  { text: '드라마가 시작되면 너는?', options: [
    { label: '첫 장면부터 엮이는 여주/남주', weights: { lead: 1 } },
    { label: '주인공 옆에서 극을 끌어올리는 2인자', weights: { second: 1 } },
    { label: '모든 반전의 열쇠를 쥔 미스터리 인물', weights: { mystery: 1 } },
    { label: '웃음 담당 조연', weights: { comic: 1 } },
    { label: '상처 있지만 매력 넘치는 빌런', weights: { villain: 1 } },
    { label: '안 보일 때 없고 모두가 아끼는 힐링 친구', weights: { healer: 1 } },
  ]},
  { text: '드라마 OST라면?', options: [
    { label: '설레는 피아노 인트로', weights: { lead: 1 } },
    { label: '애틋한 발라드', weights: { second: 1 } },
    { label: '긴장감 도는 스트링', weights: { mystery: 1 } },
    { label: '엔딩 후 나오는 밝은 삽입곡', weights: { comic: 1 } },
    { label: '묵직한 EDM/록', weights: { villain: 1 } },
    { label: '따뜻한 어쿠스틱', weights: { healer: 1 } },
  ]},
  { text: '남들이 너 보고 하는 평가는?', options: [
    { label: '드라마에 나와도 어울릴 분위기', weights: { lead: 1 } },
    { label: '은근 매력 있음', weights: { second: 1 } },
    { label: '속을 알 수 없어', weights: { mystery: 1 } },
    { label: '너랑 있으면 웃겨', weights: { comic: 1 } },
    { label: '카리스마 있다', weights: { villain: 1 } },
    { label: '같이 있으면 편해', weights: { healer: 1 } },
  ]},
  { text: '첫사랑 이야기라면?', options: [
    { label: '모두가 아는 드라마 같은 로맨스', weights: { lead: 1 } },
    { label: '짝사랑에 익숙함', weights: { second: 1 } },
    { label: '본인만 아는 서사 있음', weights: { mystery: 1 } },
    { label: '망한 연애를 개그로 풀어냄', weights: { comic: 1 } },
    { label: '상대가 나 때문에 변하는 스토리', weights: { villain: 1 } },
    { label: '따뜻한 오랜 인연', weights: { healer: 1 } },
  ]},
  { text: '위기에서 너는?', options: [
    { label: '결국 극복하고 빛남', weights: { lead: 1 } },
    { label: '주인공을 지켜주다가 본인도 성장', weights: { second: 1 } },
    { label: '모두를 놀래킬 반전의 한 수', weights: { mystery: 1 } },
    { label: '분위기 풀려고 농담 던짐', weights: { comic: 1 } },
    { label: '판 뒤집는 과감함', weights: { villain: 1 } },
    { label: '조용히 옆을 지킴', weights: { healer: 1 } },
  ]},
];

const R: CategoryResult[] = [
  {
    key: 'lead', title: '🎬 주인공형',
    subtitle: '모든 서사의 중심',
    tagline: '네 인생이 이미 한 편의 드라마',
    desc: '눈에 띄고, 이야기의 중심이 되는 타입. 웃어도 울어도 주목받는 사람이에요. 뭘 해도 “저 사람 분위기가 있다”는 말을 듣는 이유.',
    emoji: '🎬',
    strengths: ['카리스마 있음', '서사가 있는 매력', '성장 가능성 무한'],
    weaknesses: ['주목에 예민', '혼자 있는 거 힘들어함', '책임감이 과함'],
    match: '💙 2인자형 — 너를 가장 진심으로 응원하는 사람',
    avoid: '😏 빌런형 — 같이 있으면 둘 다 상처',
    tip: '네 이야기는 이미 충분히 아름다워요. 비교하지 말고 너의 페이스로.',
    quote: '주인공은 대본이 아니라 태도로 만들어진다.',
  },
  {
    key: 'second', title: '💙 2인자(서브남/여주)형',
    subtitle: '더 많은 사람의 최애',
    tagline: '사실은 네가 진짜 주인공',
    desc: '상처 있지만 다정한 타입. 알고 보면 제일 매력 있고, 시청자들이 “제발 얘랑 잘 돼라”고 외치는 존재. 주인공보다 네가 더 아깝다.',
    emoji: '💙',
    strengths: ['다정하고 성숙함', '깊이 있는 감성', '헌신적인 사랑'],
    weaknesses: ['짝사랑 잘 당함', '감정 숨김', '자신을 후순위로 둠'],
    match: '🎬 주인공형 — 너의 진심을 알아보는 사람',
    avoid: '😏 빌런형 — 너가 자꾸 참게 되는 관계',
    tip: '이번엔 네가 주인공이어도 돼요. 마음 먼저 표현해 보기.',
    quote: '너는 서브가 아니라 내 이야기의 메인이다.',
  },
  {
    key: 'mystery', title: '🕵️ 미스터리 인물형',
    subtitle: '반전의 열쇠',
    tagline: '속을 알 수 없어서 더 매력적인',
    desc: '조용한데 은근 시선 끄는 타입. 모두가 “쟤 뭐지?”라고 생각하는 존재. 깊이 있고, 상대의 감정도 잘 읽어내는 직관파.',
    emoji: '🕵️',
    strengths: ['관찰력과 직관', '분위기 있음', '속 깊은 대화 가능'],
    weaknesses: ['가까워지기 어려움', '오해 받기 쉬움', '혼자 쌓아둠'],
    match: '🎬 주인공형 — 너의 속을 궁금해해주는 사람',
    avoid: '😄 개그형 — 너의 깊이를 장난으로 받아들임',
    tip: '너의 서사를 조금씩 보여줘도 돼요. 다 안 보여도 괜찮아요.',
    quote: '궁금하게 만드는 사람은 오래 기억된다.',
  },
  {
    key: 'comic', title: '😄 개그 조연형',
    subtitle: '웃음 담당 씬스틸러',
    tagline: '너 없으면 드라마가 노잼',
    desc: '심각한 분위기도 한 마디로 풀어내는 사람. 친구들의 기분을 자동 전환시키는 파워 유머러스. 근데 혼자 있을 땐 의외로 감성파.',
    emoji: '😄',
    strengths: ['유머와 리듬감', '분위기 풀기 최고', '친화력 최상'],
    weaknesses: ['진지한 순간 약함', '감정 숨기고 웃음으로 덮음', '본인 힘든 거 잘 못 말함'],
    match: '💖 힐링형 — 너의 숨겨진 감정을 읽어주는 사람',
    avoid: '🕵️ 미스터리형 — 대화가 안 이어져서 답답',
    tip: '가끔은 웃기지 않아도 돼요. “나 지금 힘들어”라고 말해도 돼요.',
    quote: '사람을 웃기는 것도 재능, 스스로를 돌보는 것도 재능.',
  },
  {
    key: 'villain', title: '😏 빌런형',
    subtitle: '상처 있는 카리스마',
    tagline: '가장 입체적인 인물',
    desc: '시청률 보장형 인물. 쎄 보이는데 알고 보면 누구보다 상처 많은 타입. 솔직하고 추진력 있어서 리더 자리에 자주 섬. 근데 가까운 사람한테는 의외로 약해요.',
    emoji: '😏',
    strengths: ['카리스마와 추진력', '할 말은 함', '리더십 있음'],
    weaknesses: ['상처를 분노로 표현', '신뢰 쌓는데 오래 걸림', '자존심이 커서 손해 봄'],
    match: '💖 힐링형 — 너의 날을 가장 부드럽게 녹여주는 사람',
    avoid: '🎬 주인공형 — 둘 다 주도권 싸움',
    tip: '강함 뒤에 숨긴 약함, 믿을 만한 사람 한 명에겐 꼭 보여주세요.',
    quote: '가장 빛나는 빌런은 결국 사랑받는 인물이 된다.',
  },
  {
    key: 'healer', title: '💖 힐링형',
    subtitle: '극의 온도를 올리는 존재',
    tagline: '보는 것만으로 마음이 놓이는 사람',
    desc: '말 없이 옆에 있어도 위안이 되는 타입. 드라마에서 가장 “힐링 캐”로 사랑받는 인물. 실제로도 주변 사람들의 감정 쉼터가 돼주는 사람.',
    emoji: '💖',
    strengths: ['공감과 포용력', '차분한 분위기', '사람을 편안하게 함'],
    weaknesses: ['자기 감정 후순위', '거절 잘 못함', '본인은 덜 챙김'],
    match: '😏 빌런형 — 너가 풀어줄 수 있는 마음을 가진 사람',
    avoid: '🎬 주인공형 — 너무 강해서 너가 조연이 되어버림',
    tip: '남을 챙기는 만큼 너도 챙겨야 해요. 오늘은 네가 힐링받는 사람.',
    quote: '다정한 사람이 결국 다정한 세상을 만든다.',
  },
];

export default function DramaCharacterClient() {
  return (
    <CategoryTestRunner
      testId="drama"
      title="내가 드라마 속 캐릭터라면?"
      introDesc="5문항으로 알아보는 내 드라마 캐릭터. 주인공일까, 2인자일까?"
      icon={<Film size={28} />}
      questions={Q}
      results={R}
    />
  );
}
