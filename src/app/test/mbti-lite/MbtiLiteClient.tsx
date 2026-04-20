'use client';

import { Sparkles } from 'lucide-react';
import CategoryTestRunner, { type CategoryQuestion, type CategoryResult } from '../CategoryTestRunner';

// MBTI 간이판 12문항 (각 차원 3문항씩)
const Q: CategoryQuestion[] = [
  { text: '주말에 에너지를 충전하는 방식은?', options: [
    { label: '친구들과 약속 잡고 밖으로 나간다', weights: { E: 1 } },
    { label: '혼자만의 시간을 충분히 가진다', weights: { I: 1 } },
  ]},
  { text: '처음 보는 사람들 사이에서 나는?', options: [
    { label: '먼저 말을 걸고 분위기를 띄운다', weights: { E: 1 } },
    { label: '조용히 분위기를 살핀다', weights: { I: 1 } },
  ]},
  { text: '통화와 메시지 중 편한 쪽?', options: [
    { label: '통화가 편하다', weights: { E: 1 } },
    { label: '메시지가 편하다', weights: { I: 1 } },
  ]},
  { text: '정보를 받아들일 때 나는?', options: [
    { label: '구체적인 사실과 경험 중심', weights: { S: 1 } },
    { label: '전체 맥락과 가능성을 먼저 본다', weights: { N: 1 } },
  ]},
  { text: '새로운 기계를 사면?', options: [
    { label: '설명서부터 꼼꼼히 읽는다', weights: { S: 1 } },
    { label: '일단 눌러보며 감으로 익힌다', weights: { N: 1 } },
  ]},
  { text: '글을 쓸 때 나는?', options: [
    { label: '사실적인 묘사와 디테일을 살린다', weights: { S: 1 } },
    { label: '비유와 상징을 자주 쓴다', weights: { N: 1 } },
  ]},
  { text: '결정을 내릴 때 더 중요한 기준은?', options: [
    { label: '논리와 효율', weights: { T: 1 } },
    { label: '관계와 감정', weights: { F: 1 } },
  ]},
  { text: '친구가 고민을 말하면?', options: [
    { label: '원인 분석과 해결책을 함께 말한다', weights: { T: 1 } },
    { label: '먼저 공감하고 마음을 다독인다', weights: { F: 1 } },
  ]},
  { text: '나를 상처 입히는 말은?', options: [
    { label: '내 논리나 능력을 무시할 때', weights: { T: 1 } },
    { label: '내 진심을 의심할 때', weights: { F: 1 } },
  ]},
  { text: '여행 스타일은?', options: [
    { label: '일정을 미리 촘촘히 짠다', weights: { J: 1 } },
    { label: '큰 틀만 잡고 즉흥적으로 움직인다', weights: { P: 1 } },
  ]},
  { text: '마감 앞에 선 나는?', options: [
    { label: '미리 끝내놓고 여유를 즐긴다', weights: { J: 1 } },
    { label: '막판에 에너지가 폭발한다', weights: { P: 1 } },
  ]},
  { text: '갑작스러운 계획 변경은?', options: [
    { label: '당황스럽고 스트레스 받는다', weights: { J: 1 } },
    { label: '오히려 재미있다', weights: { P: 1 } },
  ]},
];

const R: CategoryResult[] = [
  { key: 'INTJ', title: 'INTJ · 전략가', subtitle: '조용히 큰 그림을 그리는 타입', desc: '깊이 있게 몰입하고 끝까지 밀고 나가는 힘이 있어요. 감정보다 시스템을 먼저 보는 편이에요.', emoji: '🧩' },
  { key: 'INTP', title: 'INTP · 탐구자', subtitle: '생각 속 미로를 걷는 사람', desc: '호기심과 논리로 세상을 이해하려 합니다. 즉흥보다는 사유가 먼저예요.', emoji: '🔬' },
  { key: 'ENTJ', title: 'ENTJ · 지휘관', subtitle: '목표를 향해 돌진', desc: '리드하고 구조화하는 데 강합니다. 비효율을 못 견뎌요.', emoji: '🚀' },
  { key: 'ENTP', title: 'ENTP · 토론가', subtitle: '아이디어의 연주자', desc: '새로운 관점을 던지고 토론을 즐깁니다. 지루함이 가장 큰 적이에요.', emoji: '💡' },
  { key: 'INFJ', title: 'INFJ · 옹호자', subtitle: '조용한 이상주의자', desc: '타인의 감정에 예민하고 의미 있는 것을 추구합니다.', emoji: '🌙' },
  { key: 'INFP', title: 'INFP · 중재자', subtitle: '감정과 상상 사이', desc: '가치와 진정성이 중요한 사람. 혼자만의 세계가 깊어요.', emoji: '🌿' },
  { key: 'ENFJ', title: 'ENFJ · 선도자', subtitle: '사람을 북돋우는 사람', desc: '공감력과 조직력이 모두 있어요. 타인의 성장을 돕는 걸 좋아합니다.', emoji: '🤝' },
  { key: 'ENFP', title: 'ENFP · 활동가', subtitle: '가능성의 탐험가', desc: '영감과 열정이 강합니다. 하지만 루틴은 조금 약해요.', emoji: '✨' },
  { key: 'ISTJ', title: 'ISTJ · 현실주의자', subtitle: '믿음직한 기둥', desc: '책임감과 원칙이 뚜렷합니다. 루틴과 규칙에 안정감을 느껴요.', emoji: '📚' },
  { key: 'ISFJ', title: 'ISFJ · 수호자', subtitle: '따뜻한 관리자', desc: '조용히 주변을 챙기는 사람. 기억력이 좋고 섬세합니다.', emoji: '🫖' },
  { key: 'ESTJ', title: 'ESTJ · 관리자', subtitle: '현실에 강한 추진가', desc: '조직과 절차를 잘 운영합니다. 원칙이 분명해요.', emoji: '📋' },
  { key: 'ESFJ', title: 'ESFJ · 친선도모형', subtitle: '공동체의 분위기 메이커', desc: '사람들과 잘 어울리고 주변을 돌봅니다. 관계가 삶의 중심이에요.', emoji: '🎈' },
  { key: 'ISTP', title: 'ISTP · 장인', subtitle: '손에 잡히는 걸 사랑하는', desc: '조용하지만 문제 해결이 빠릅니다. 말보다 행동파.', emoji: '🛠️' },
  { key: 'ISFP', title: 'ISFP · 예술가', subtitle: '조용한 감성러', desc: '자기만의 감각으로 세상을 경험합니다. 강요받는 걸 싫어해요.', emoji: '🎨' },
  { key: 'ESTP', title: 'ESTP · 사업가', subtitle: '즉흥과 스릴을 즐기는', desc: '현장에서 빛나는 사람. 지금 이 순간에 강합니다.', emoji: '🏍️' },
  { key: 'ESFP', title: 'ESFP · 연예인', subtitle: '분위기 메이커', desc: '흥과 즉흥의 에너지. 사람들과 어울릴 때 가장 나답습니다.', emoji: '🎤' },
];

export default function MbtiLiteClient() {
  return (
    <CategoryTestRunner
      testId="mbti"
      title="MBTI 간이판"
      introDesc="12문항으로 간단히 확인해 보는 MBTI 유형 테스트입니다. 약 2분이면 끝나요."
      icon={<Sparkles size={28} />}
      questions={Q}
      results={R}
      dimensions={[
        { key: 'EI', positive: 'E', negative: 'I' },
        { key: 'SN', positive: 'S', negative: 'N' },
        { key: 'TF', positive: 'T', negative: 'F' },
        { key: 'JP', positive: 'J', negative: 'P' },
      ]}
    />
  );
}
