import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ClipboardCheck, Brain, Activity, Moon, Heart, Flame, ChevronRight,
  Sparkles, HeartHandshake, Compass, Layers, Users, Gift, Flower2,
  HeartCrack, Sparkle, Target, Leaf, Palette, Sprout, MessageCircle,
} from 'lucide-react';
import styles from './test.module.css';

export const metadata: Metadata = {
  title: '자가진단 & 심리 테스트',
  description:
    '우울·불안·스트레스·자존감·번아웃 같은 심리 자가진단과 MBTI·애착·사랑의 언어·HSP 등 재미있는 심리 테스트를 모았어요.',
};

type IconTone = 'blue' | 'purple' | 'green' | 'yellow' | 'pink' | 'orange';

interface TestCard {
  href: string;
  icon: React.ReactNode;
  tone: IconTone;
  title: string;
  desc: string;
  meta: string;
}

const CLINICAL: TestCard[] = [
  { href: '/test/phq9', icon: <ClipboardCheck size={22} />, tone: 'blue',
    title: '우울증 자가진단 (PHQ-9)',
    desc: '최근 2주간의 우울 정도를 확인하는 국제 표준 검사입니다.',
    meta: '9문항 · 약 3분' },
  { href: '/test/gad7', icon: <Brain size={22} />, tone: 'purple',
    title: '불안 자가진단 (GAD-7)',
    desc: '최근 2주간 느낀 불안과 초조함의 정도를 확인합니다.',
    meta: '7문항 · 약 2분' },
  { href: '/test/stress', icon: <Activity size={22} />, tone: 'green',
    title: '스트레스 자가진단 (PSS-10)',
    desc: '지난 한 달간의 스트레스 수준과 통제감을 점검합니다.',
    meta: '10문항 · 약 3분' },
  { href: '/test/insomnia', icon: <Moon size={22} />, tone: 'yellow',
    title: '불면증 자가진단 (ISI)',
    desc: '수면의 질과 낮 동안의 영향을 확인합니다.',
    meta: '7문항 · 약 2분' },
  { href: '/test/self-esteem', icon: <Heart size={22} />, tone: 'pink',
    title: '자존감 자가진단 (RSE)',
    desc: '로젠버그 자존감 척도 기반 자가진단입니다.',
    meta: '10문항 · 약 2분' },
  { href: '/test/burnout', icon: <Flame size={22} />, tone: 'orange',
    title: '번아웃 자가진단',
    desc: '최근 삶의 피로와 무기력을 기반으로 번아웃 위험을 체크합니다.',
    meta: '8문항 · 약 2분' },
];

const PERSONALITY: TestCard[] = [
  { href: '/test/mbti-lite', icon: <Sparkles size={22} />, tone: 'purple',
    title: 'MBTI 간이판', desc: '12문항으로 빠르게 확인하는 MBTI 유형 테스트.',
    meta: '12문항 · 약 2분' },
  { href: '/test/enneagram', icon: <Compass size={22} />, tone: 'orange',
    title: '에니어그램 9유형', desc: '나의 동기와 두려움을 보여주는 9유형 테스트.',
    meta: '7문항 · 약 2분' },
  { href: '/test/big5', icon: <Layers size={22} />, tone: 'blue',
    title: 'Big5 성격검사', desc: '5가지 성격 요인을 비율로 보여주는 간이판.',
    meta: '10문항 · 약 2분' },
  { href: '/test/introvert', icon: <Users size={22} />, tone: 'green',
    title: '내향·외향 테스트', desc: '내가 어디에 속하는지 가볍게 확인.',
    meta: '8문항 · 약 1분' },
];

const RELATIONSHIP: TestCard[] = [
  { href: '/test/attachment', icon: <HeartHandshake size={22} />, tone: 'pink',
    title: '애착유형 테스트', desc: '안정·불안·회피·혼란 중 내 애착 스타일.',
    meta: '8문항 · 약 2분' },
  { href: '/test/love-languages', icon: <Gift size={22} />, tone: 'orange',
    title: '사랑의 언어 테스트', desc: '5가지 사랑의 언어 중 나에게 가장 강한 언어.',
    meta: '6문항 · 약 2분' },
  { href: '/test/love-style', icon: <Flower2 size={22} />, tone: 'purple',
    title: '연애 스타일 테스트', desc: '열정·친밀·현실·유희 중 내 연애 스타일.',
    meta: '5문항 · 약 1분' },
  { href: '/test/breakup-recovery', icon: <HeartCrack size={22} />, tone: 'blue',
    title: '이별 회복 지수', desc: '이별 이후의 감정·일상 회복 정도.',
    meta: '10문항 · 약 2분' },
];

const SELF: TestCard[] = [
  { href: '/test/hsp', icon: <Sparkle size={22} />, tone: 'yellow',
    title: '민감도 테스트 (HSP)', desc: '자극과 감정에 얼마나 예민한 사람인지.',
    meta: '12문항 · 약 2분' },
  { href: '/test/perfectionism', icon: <Target size={22} />, tone: 'orange',
    title: '완벽주의 성향 테스트', desc: '완벽주의가 내 일상에 주는 영향.',
    meta: '10문항 · 약 2분' },
  { href: '/test/self-care', icon: <Leaf size={22} />, tone: 'green',
    title: '자기돌봄 지수', desc: '요즘 나를 얼마나 잘 챙기고 있는지.',
    meta: '10문항 · 약 2분' },
  { href: '/test/mind-color', icon: <Palette size={22} />, tone: 'pink',
    title: '내 마음 컬러 테스트', desc: '지금의 마음 상태를 한 가지 색으로.',
    meta: '5문항 · 약 1분' },
  { href: '/test/healing-style', icon: <Sprout size={22} />, tone: 'green',
    title: '힐링 유형 테스트', desc: '나에게 가장 잘 맞는 회복 방식.',
    meta: '4문항 · 약 1분' },
  { href: '/test/comfort-style', icon: <MessageCircle size={22} />, tone: 'purple',
    title: '위로 받는 방식 테스트', desc: '공감·조언·행동·함께있기 중 내 스타일.',
    meta: '4문항 · 약 1분' },
];

const toneClass: Record<IconTone, string> = {
  blue: styles.cardIconBlue,
  purple: styles.cardIconPurple,
  green: styles.cardIconGreen,
  yellow: styles.cardIconYellow,
  pink: styles.cardIconPink,
  orange: styles.cardIconOrange,
};

function Section({ title, subtitle, items }: { title: string; subtitle: string; items: TestCard[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionSub}>{subtitle}</p>
      </div>
      <div className={styles.grid}>
        {items.map((t) => (
          <Link key={t.href} href={t.href} className={styles.card}>
            <div className={`${styles.cardIcon} ${toneClass[t.tone]}`}>{t.icon}</div>
            <h3 className={styles.cardTitle}>{t.title}</h3>
            <p className={styles.cardDesc}>{t.desc}</p>
            <p className={styles.cardMeta}>{t.meta}</p>
            <div className={styles.cardCta}>
              검사 시작
              <ChevronRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function TestHubPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>자가진단 & 심리 테스트</h1>
        <p className={styles.subtitle}>
          전문 자가진단부터 가볍게 즐기는 심리 테스트까지. 내 마음 상태를 다양한 각도에서 확인해 보세요.
        </p>
      </div>

      <Section title="심리 자가진단" subtitle="전문 척도 기반의 자가진단 검사" items={CLINICAL} />
      <Section title="성격·성향" subtitle="나를 이해하는 성격 테스트" items={PERSONALITY} />
      <Section title="연애·관계" subtitle="관계 속의 나를 알아보기" items={RELATIONSHIP} />
      <Section title="자기이해 & 감성" subtitle="재밌게 나를 들여다보는 테스트" items={SELF} />
    </div>
  );
}
