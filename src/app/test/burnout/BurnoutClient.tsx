'use client';

import { Flame } from 'lucide-react';
import TestRunner from '../TestRunner';

// Copenhagen Burnout Inventory (CBI) 단축형 느낌으로 8문항 0~4점 구성
// (전문 MBI는 라이선스 이슈가 있어 공개 가능한 CBI 문항을 참고)
const QUESTIONS = [
  '요즘 들어 얼마나 자주 지쳤다고 느끼나요?',
  '하루가 끝날 때쯤 얼마나 자주 기운이 다 빠졌다고 느끼나요?',
  '아침에 일어났을 때 다시 또 하루를 버텨야 한다는 생각에 얼마나 자주 피곤함을 느끼나요?',
  '가족이나 친구들과 함께 시간을 보낼 에너지가 남아있지 않다고 얼마나 자주 느끼나요?',
  '하는 일이 의미 없게 느껴질 때가 얼마나 자주 있나요?',
  '일(또는 학업)에 집중하기 어려운 때가 얼마나 자주 있나요?',
  '사람들을 대하는 것 자체가 피곤하게 느껴질 때가 얼마나 자주 있나요?',
  '내가 맡은 일들이 감당하기 버겁다고 얼마나 자주 느끼나요?',
];

const OPTIONS = [
  { value: 0, label: '전혀 없음' },
  { value: 1, label: '가끔' },
  { value: 2, label: '종종' },
  { value: 3, label: '자주' },
  { value: 4, label: '항상' },
];

const INTERPRETATIONS = [
  {
    range: '0–8점', level: '제대로 에너지 돬고 있는 상태', emoji: '🔋',
    tagline: '피곤하지만 따라올 만한 하루',
    desc: '번아웃 위험이 낮은 편이에요. 지금의 생활 배터리를 잘 관리하고 계세요.',
    min: 0, max: 8,
    tips: ['조금 지친 날은 어체게 미루기', '해야 할 일과 하고 싶은 일의 비율 점검'],
    quote: '휴식은 게으름이 아니라 완충이다.',
  },
  {
    range: '9–16점', level: '에너지 배터리 줄어드는 중', emoji: '🔅',
    tagline: '아침이 조금 두려워지는 종이에요',
    desc: '가벼운 번아웃 신호가 얼듰대고 있어요. 미리 돌보면 회복이 훨씬 빨라요.',
    min: 9, max: 16,
    tips: ['주말 중 반나절은 무조건 내 시간으로', '하루 15분의 "아무것도 안 하기" 시간', '일 밖의 기발점이 되는 장면 하나 만들기'],
    quote: '열심히 사는 것이 잘 사는 것과 같지는 않습니다.',
  },
  {
    range: '17–24점', level: '번아웃 종목 지역', emoji: '⚠️',
    tagline: '몸과 마음이 멀리 있는 느낌',
    desc: '일과 삶에서 많이 소진된 상태예요. 방치하면 회복이 오래 걸릴 수 있어요.',
    min: 17, max: 24, warning: true,
    tips: ['할 일 목록에서 20–30% 과감히 빼기', '작은 변화라도 환경/루틴 재세팅하기', '너무 바쥐서 우직인 사람에게 한 마디라도 소리내기'],
    quote: '번아웃은 약함이 아니라, 너무 오래 강했다는 증거다.',
  },
  {
    range: '25–32점', level: '깊은 회복이 필요한 시기', emoji: '🛡️',
    tagline: '지금은 몸과 마음을 지키는 게 최우선',
    desc: '심한 번아웃이 의심됩니다. 의지력으로 버티는 것보다 시스템을 바꾸는 게 필요해요.',
    min: 25, max: 32, warning: true,
    tips: ['저녁에 전문가 상담 예약 겨보기', '1시간이라도 전화/알림 완전히 끊는 시간 확보', '가까운 사람에게 말하지 않고는 저녁을 맞지 않기'],
    quote: '멈춰 서있는 거 아니라, 잠시 숨 고르는 거예요.',
  },
];

export default function BurnoutClient() {
  return (
    <TestRunner
      testId="burnout"
      title="번아웃 자가진단"
      introDesc="최근의 생활을 기준으로 8개의 문항에 답해 주세요. 약 2분이 소요됩니다."
      icon={<Flame size={28} />}
      questions={QUESTIONS}
      options={OPTIONS}
      interpretations={INTERPRETATIONS}
      maxScore={32}
    />
  );
}
