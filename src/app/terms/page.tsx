import type { Metadata } from 'next';
import styles from './terms.module.css';

export const metadata: Metadata = {
  title: '이용약관',
  description: '인마인드 서비스 이용약관입니다.',
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>이용약관</h1>
        <p className={styles.updated}>최종 수정일: 2026년 4월 9일</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제1조 (서비스 이용약관)</h2>
          <p className={styles.text}>
            본 약관은 인마인드(이하 &quot;서비스&quot;)가 제공하는 힐링 커뮤니티 서비스의 이용 조건과 절차, 회사와 이용자 간의 권리 및 의무 사항을 규정합니다.
          </p>
          <p className={styles.text}>
            인마인드는 공감, 위로, 힐링을 중심으로 한 커뮤니티 플랫폼으로, 이용자 간의 따뜻한 소통과 정서적 지지를 목적으로 합니다.
          </p>
          <p className={styles.text}>
            본 서비스를 이용함으로써 이용자는 본 약관에 동의한 것으로 간주됩니다. 약관에 동의하지 않을 경우, 서비스 이용이 제한될 수 있습니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제2조 (이용자의 의무)</h2>
          <ul className={styles.list}>
            <li>이용자는 서비스 이용 시 관련 법령과 본 약관을 준수해야 합니다.</li>
            <li>타인의 개인정보를 도용하거나 허위 정보를 등록해서는 안 됩니다.</li>
            <li>서비스 내에서 다른 이용자를 존중하고, 건전한 소통 문화를 유지해야 합니다.</li>
            <li>서비스의 안정적 운영을 방해하는 행위를 해서는 안 됩니다.</li>
            <li>게시물 작성 시 타인의 명예를 훼손하거나 사생활을 침해하는 내용을 포함해서는 안 됩니다.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제3조 (금지 행위)</h2>
          <p className={styles.text}>이용자는 다음 각 호에 해당하는 행위를 해서는 안 됩니다.</p>
          <ul className={styles.list}>
            <li>욕설, 비방, 혐오 표현 등 타인에게 불쾌감을 주는 행위</li>
            <li>영리 목적의 광고, 스팸, 홍보 활동</li>
            <li>허위 사실 유포 또는 타인의 명예를 훼손하는 행위</li>
            <li>서비스의 운영을 고의로 방해하는 행위</li>
            <li>불법 콘텐츠의 게시 또는 유포</li>
            <li>타인의 계정을 무단으로 사용하는 행위</li>
            <li>자살, 자해 등을 조장하거나 미화하는 행위</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제4조 (면책조항)</h2>
          <p className={styles.text}>
            인마인드는 이용자가 작성한 게시물의 내용에 대해 책임을 지지 않으며, 이용자 간의 분쟁에 대해 개입하지 않습니다.
          </p>
          <p className={styles.text}>
            본 서비스는 전문 상담 서비스가 아니며, 의료적 또는 심리적 전문 조언을 대체하지 않습니다. 긴급한 도움이 필요한 경우, 전문 기관에 연락하시기 바랍니다.
          </p>
          <p className={styles.text}>
            천재지변, 시스템 장애 등 불가항력적인 사유로 인한 서비스 중단에 대해 회사는 책임을 지지 않습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
