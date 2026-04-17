import type { Metadata } from 'next';
import Link from 'next/link';
import { ClipboardCheck, Brain } from 'lucide-react';
import styles from './test.module.css';

export const metadata: Metadata = {
  title: '자가진단',
  description: '우울증(PHQ-9)과 불안(GAD-7) 자가진단 테스트를 통해 내 마음 상태를 확인해 보세요.',
};

export default function TestHubPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>자가진단 테스트</h1>
        <p className={styles.subtitle}>간단한 자가진단으로 내 마음 상태를 확인해 보세요</p>
      </div>
      <div className={styles.grid}>
        {/* PHQ-9 Card */}
        <Link href="/test/phq9" className={styles.card}>
          <div className={styles.cardIcon}><ClipboardCheck size={22} /></div>
          <h2 className={styles.cardTitle}>우울증 자가진단 (PHQ-9)</h2>
          <p className={styles.cardDesc}>최근 2주 동안의 기분과 일상생활을 돌아보며 우울 정도를 확인합니다.</p>
          <p className={styles.cardMeta}>9문항 · 약 3분 소요</p>
        </Link>
        {/* GAD-7 Card */}
        <Link href="/test/gad7" className={styles.card}>
          <div className={styles.cardIcon}><Brain size={22} /></div>
          <h2 className={styles.cardTitle}>불안 자가진단 (GAD-7)</h2>
          <p className={styles.cardDesc}>최근 2주 동안 느낀 불안 증상의 정도를 확인합니다.</p>
          <p className={styles.cardMeta}>7문항 · 약 2분 소요</p>
        </Link>
      </div>
    </div>
  );
}
