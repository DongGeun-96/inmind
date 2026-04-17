import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from './verified.module.css';

export default function VerifiedPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>이메일 인증 완료</h1>
        <p className={styles.description}>
          이메일 인증이 완료되었어요.<br />
          지금 바로 로그인해서 인마인드를 이용해보세요.
        </p>
        <Link href="/auth/login">
          <Button fullWidth>로그인하기</Button>
        </Link>
      </div>
    </div>
  );
}
