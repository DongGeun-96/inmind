import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.info}>
          <span className={styles.name}>인마인드</span>
          <span className={styles.divider}>|</span>
          <span>공감, 위로, 힐링 커뮤니티</span>
        </div>
        <div className={styles.links}>
          <Link href="/terms" className={styles.footerLink}>이용약관</Link>
          <span className={styles.divider}>|</span>
          <Link href="/privacy" className={styles.footerLink}>개인정보처리방침</Link>
          <span className={styles.divider}>|</span>
          <Link href="/youth" className={styles.footerLink}>청소년보호정책</Link>
          <span className={styles.divider}>|</span>
          <Link href="/support" className={styles.footerLink}>고객센터</Link>
        </div>
        <p className={styles.copyright}>&copy; 2026 인마인드. All rights reserved.</p>
      </div>
    </footer>
  );
}
