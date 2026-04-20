import type { Metadata } from 'next';
import Link from 'next/link';
import { ClipboardCheck, Brain, Activity, Moon, Heart, Flame } from 'lucide-react';
import styles from './test.module.css';

export const metadata: Metadata = {
  title: '자가진단',
  description: '우울증, 불안, 스트레스, 불면증, 자존감, 번아웃 등 다양한 자가진단 테스트로 내 마음 상태를 확인해 보세요.',
};

interface TestCard {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  meta: string;
}

const TESTS: TestCard[] = [
  {
    href: '/test/phq9',
    icon: <ClipboardCheck size={22} />,
    title: '우울증 자가진단 (PHQ-9)',
    desc: '최근 2주 동안의 기분과 일상생활을 돌아보며 우울 정도를 확인합니다.',
    meta: '9문항 · 약 3분 소요',
  },
  {
    href: '/test/gad7',
    icon: <Brain size={22} />,
    title: '불안 자가진단 (GAD-7)',
    desc: '최근 2주 동안 느낀 불안 증상의 정도를 확인합니다.',
    meta: '7문항 · 약 2분 소요',
  },
  {
    href: '/test/stress',
    icon: <Activity size={22} />,
    title: '스트레스 자가진단 (PSS-10)',
    desc: '지난 한 달간의 스트레스 수준과 통제감을 점검합니다.',
    meta: '10문항 · 약 3분 소요',
  },
  {
    href: '/test/insomnia',
    icon: <Moon size={22} />,
    title: '불면증 자가진단 (ISI)',
    desc: '수면의 질과 낮 동안의 영향까지 살펴보는 불면 심각도 검사입니다.',
    meta: '7문항 · 약 2분 소요',
  },
  {
    href: '/test/self-esteem',
    icon: <Heart size={22} />,
    title: '자존감 자가진단 (RSE)',
    desc: '스스로를 바라보는 태도를 점검하는 로젠버그 자존감 척도입니다.',
    meta: '10문항 · 약 2분 소요',
  },
  {
    href: '/test/burnout',
    icon: <Flame size={22} />,
    title: '번아웃 자가진단',
    desc: '최근 삶의 피로와 무기력을 기반으로 번아웃 위험을 체크합니다.',
    meta: '8문항 · 약 2분 소요',
  },
];

export default function TestHubPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>자가진단 테스트</h1>
        <p className={styles.subtitle}>간단한 자가진단으로 내 마음 상태를 확인해 보세요</p>
      </div>
      <div className={styles.grid}>
        {TESTS.map((t) => (
          <Link key={t.href} href={t.href} className={styles.card}>
            <div className={styles.cardIcon}>{t.icon}</div>
            <h2 className={styles.cardTitle}>{t.title}</h2>
            <p className={styles.cardDesc}>{t.desc}</p>
            <p className={styles.cardMeta}>{t.meta}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
