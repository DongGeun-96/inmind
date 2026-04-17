import Link from 'next/link';
import { BookOpen, Sparkles, ClipboardCheck } from 'lucide-react';
import styles from './HomeBanners.module.css';

export default function HomeBanners() {
  return (
    <div className={styles.banners}>
      <Link href="/board/healing_place" className={`${styles.banner} ${styles.magazine}`}>
        <div className={styles.bannerGlow} aria-hidden="true" />
        <div className={styles.bannerBody}>
          <div className={styles.bannerHead}>
            <span className={styles.bannerTag}>
              <Sparkles size={12} />
              매거진
            </span>
          </div>
          <h3 className={styles.bannerTitle}>오늘의 힐링, 한 페이지</h3>
          <p className={styles.bannerDesc}>쉼이 필요한 마음에게</p>
        </div>
        <BookOpen className={styles.bannerIcon} size={80} aria-hidden="true" />
      </Link>

      <Link href="/test" className={`${styles.banner} ${styles.test}`}>
        <div className={styles.bannerGlow} aria-hidden="true" />
        <div className={styles.bannerBody}>
          <div className={styles.bannerHead}>
            <span className={styles.bannerTag}>
              <ClipboardCheck size={12} />
              심리검사
            </span>
          </div>
          <h3 className={styles.bannerTitle}>나를 위한 심리 체크</h3>
          <p className={styles.bannerDesc}>5분이면 충분해요</p>
        </div>
        <ClipboardCheck className={styles.bannerIcon} size={80} aria-hidden="true" />
      </Link>
    </div>
  );
}
