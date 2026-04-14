import styles from './banned.module.css';

export const metadata = {
  title: '계정 정지 - 인마인드',
};

export default function BannedPage() {
  return (
    <div className={styles.page}>
      <div className={styles.icon}>🚫</div>
      <h1 className={styles.title}>계정이 정지되었습니다</h1>
      <p className={styles.message}>
        이용 규칙 위반으로 계정이 정지되었어요.
      </p>
      <p className={styles.contact}>
        문의: <a href="mailto:contact@inmind.kr" className={styles.email}>contact@inmind.kr</a>
      </p>
    </div>
  );
}
