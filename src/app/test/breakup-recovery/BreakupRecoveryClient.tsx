'use client';

import { HeartCrack } from 'lucide-react';
import TestRunner from '../TestRunner';

// 이별 회복 지수: 0~4 리커트 10문항, 역방향 없음
const QUESTIONS = [
  '헤어진 사람의 SNS를 아직도 자주 들여다본다.',
  '혼자 있는 시간이 견디기 힘들다.',
  '일이나 일상에 집중이 잘 안 된다.',
  '감정 기복이 심하고 울컥하는 일이 많다.',
  '잠이 잘 오지 않거나 중간에 자주 깬다.',
  '새로운 사람을 만나는 상상이 불편하다.',
  '그 사람과 함께한 장소에 가기 힘들다.',
  '헤어진 일이 내 탓인 것 같아 자책한다.',
  '친구들과의 약속을 자주 미루게 된다.',
  '미래에 대해 희망이 잘 안 보인다.',
];

const OPTIONS = [
  { value: 0, label: '전혀 아니다' },
  { value: 1, label: '아니다' },
  { value: 2, label: '보통' },
  { value: 3, label: '그렇다' },
  { value: 4, label: '매우 그렇다' },
];

const INTERPRETATIONS = [
  {
    range: '0–10점', level: '이제 너의 삶을 살고 있어요', emoji: '🌿',
    tagline: '그 사람 없이도 내가 꽤 괜찮은 날이 늘고 있어요',
    desc: '가끔 생각은 나지만 이제 그 생각은 잘 두고 가는 단계예요. 잘 걸어왔습니다.',
    min: 0, max: 10,
    tips: ['새로운 일상에 에너지 더 부어보기', '꼭 정리하고 싶은 물건이 있다면 지금', '추억은 지움이 아니라 보관입니다'],
    quote: '이별도 사랑의 한 장면이었다.',
  },
  {
    range: '11–20점', level: '오르락내리락 스스로 일어나는 중', emoji: '🌦️',
    tagline: '좀 나아졌나 싶으면 다시 불콑',
    desc: '아직 감정 기복이 있지만, 내가 나를 다시 데리고 오는 힘이 꽤 자라고 있는 시기예요.',
    min: 11, max: 20,
    tips: ['점장 보는 시간 줄이기 (확인 횟수 확 줄이기)', '은탕 필요한 날엔 친한 친구 한 명 불러내기', '운동이나 산책 같은 몸을 움직이는 활동 추천'],
    quote: '회복은 직선이 아니라 나선형입니다.',
  },
  {
    range: '21–30점', level: '마음이 흙듬거리는 한가운데', emoji: '🌧️',
    tagline: '밤이 힘들고, 혼자 있는 게 무서워요',
    desc: '지금 아픈 게 당연합니다. 근데 깊이에 빠지지만 않도록 스스로를 잘 돌볼 시기예요.',
    min: 21, max: 30, warning: true,
    tips: ['"나는 왕머청 잘 새긴 것 뿐이다" 라고 적어보기', '밤에 연락 있을 사람 1명 미리 정해두기', '분노/자책/사랑 직접 영향 받은 의사결정 잠시 보류', '감정 일기로 하루의 파도 남기기'],
    quote: '슬픔은 숨개등이 아니라, 그만큼 사랑했다는 증거입니다.',
  },
  {
    range: '31–40점', level: '지금은 도움이 필요한 때', emoji: '🛡️',
    tagline: '혼자 너무 많이 격고 있었어요',
    desc: '하루가 너무 무거운 상태예요. 그 사람이 나간 것이지, 내 싶 전부가 난 게 아니에요.',
    min: 31, max: 40, warning: true,
    tips: ['2주 이상 일상 기능이 막힌다면 정신건강의학과 상담 고려', '친구/가족 중 누구에게 말할지 지금 정해두기', '자책을 멈춰주는 문장 하나 휴대폰에 저장해두기', '숙면·식사 중 하나라도 최소한은 지키기'],
    quote: '사랑은 끝났지만, 나는 끝나지 않았습니다.',
  },
];

export default function BreakupRecoveryClient() {
  return (
    <TestRunner
      testId="breakup"
      title="이별 회복 지수"
      introDesc="최근 이별 후 느끼는 감정과 일상 상태를 점검하는 테스트입니다. 10문항, 약 2분."
      icon={<HeartCrack size={28} />}
      questions={QUESTIONS}
      options={OPTIONS}
      interpretations={INTERPRETATIONS}
      maxScore={40}
    />
  );
}
