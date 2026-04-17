import Link from 'next/link';
import { ClipboardCheck, HelpCircle } from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.quickLinks}>
        <Link href="/test" className={styles.quickLink}>
          <ClipboardCheck size={18} />
          <span>자가진단</span>
        </Link>
        <Link href="/help" className={styles.quickLink}>
          <HelpCircle size={18} />
          <span>도움말 모음</span>
        </Link>
      </div>

      <div className={styles.crisisBox}>
        <h3 className={styles.crisisTitle}>위기상담 연락처</h3>
        <ul className={styles.crisisList}>
          <li className={styles.crisisItem}>
            <span className={styles.crisisName}>자살예방상담전화</span>
            <span className={styles.crisisNumber}>1393</span>
          </li>
          <li className={styles.crisisItem}>
            <span className={styles.crisisName}>정신건강위기상담전화</span>
            <span className={styles.crisisNumber}>1577-0199</span>
          </li>
          <li className={styles.crisisItem}>
            <span className={styles.crisisName}>생명의전화</span>
            <span className={styles.crisisNumber}>1588-9191</span>
          </li>
          <li className={styles.crisisItem}>
            <span className={styles.crisisName}>청소년전화</span>
            <span className={styles.crisisNumber}>1388</span>
          </li>
          <li className={styles.crisisItem}>
            <span className={styles.crisisName}>카카오톡 마음이음</span>
            <span className={styles.crisisNumber}>24시간</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
