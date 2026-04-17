import type { Metadata } from 'next';
import styles from '../terms/terms.module.css';

export const metadata: Metadata = {
  title: '청소년보호정책',
  description: '인마인드 청소년보호정책입니다.',
};

export default function YouthProtectionPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>청소년 보호정책</h1>
        <p className={styles.updated}>시행일: 2026년 4월 9일</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. 목적</h2>
          <p className={styles.text}>
            인마인드는 청소년이 건전한 인터넷 환경에서 서비스를 이용할 수 있도록
            청소년 보호법 및 관련 법령에 따라 청소년 보호정책을 수립하고 이를 시행합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. 유해정보로부터의 보호</h2>
          <p className={styles.text}>인마인드는 청소년에게 유해한 정보의 유통을 방지하기 위해 다음과 같은 조치를 취합니다.</p>
          <ul className={styles.list}>
            <li>청소년 유해 게시물에 대한 모니터링 및 삭제 조치</li>
            <li>불건전한 게시물 신고 기능 운영</li>
            <li>유해 정보 차단을 위한 기술적 조치</li>
            <li>청소년 유해 매체물 표시 및 접근 제한</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. 청소년 개인정보 보호</h2>
          <ul className={styles.list}>
            <li>만 14세 미만 아동의 개인정보 수집 시 법정대리인의 동의를 받습니다.</li>
            <li>수집된 개인정보는 서비스 제공 목적으로만 사용되며, 제3자에게 제공하지 않습니다.</li>
            <li>청소년의 개인정보 열람, 정정, 삭제 요청에 신속하게 대응합니다.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. 청소년 보호 책임자</h2>
          <p className={styles.text}>
            인마인드는 청소년 보호를 위해 아래와 같이 청소년 보호 책임자를 지정하고 있습니다.
          </p>
          <ul className={styles.list}>
            <li>담당자: 인마인드 운영팀</li>
            <li>이메일: contact@in-mind.dev</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. 이용자의 협조</h2>
          <p className={styles.text}>
            청소년이 안전하게 서비스를 이용할 수 있도록 보호자의 관심과 지도를 부탁드립니다.
            유해 게시물을 발견하시면 신고 기능을 통해 알려주시기 바랍니다.
          </p>
        </section>
      </div>
    </div>
  );
}
