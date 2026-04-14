import type { Metadata } from 'next';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '인마인드 개인정보처리방침입니다.',
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>개인정보처리방침</h1>
        <p className={styles.updated}>최종 수정일: 2026년 4월 9일</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. 수집하는 개인정보 항목</h2>
          <p className={styles.text}>인마인드는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
          <div className={styles.table}>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>필수 항목</span>
              <span className={styles.tableValue}>이메일 주소, 비밀번호, 닉네임</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>자동 수집</span>
              <span className={styles.tableValue}>서비스 이용 기록, 접속 로그, 기기 정보</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>선택 항목</span>
              <span className={styles.tableValue}>프로필 이미지, 자기소개</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. 개인정보 이용 목적</h2>
          <ul className={styles.list}>
            <li>회원 가입 및 관리: 회원 식별, 가입 의사 확인, 본인 인증</li>
            <li>서비스 제공: 커뮤니티 기능 제공, 게시물 작성 및 공감 기능</li>
            <li>서비스 개선: 이용 통계 분석, 서비스 품질 향상</li>
            <li>안전한 환경 유지: 부정 이용 방지, 약관 위반 행위 모니터링</li>
            <li>고객 지원: 문의 사항 처리, 공지사항 전달</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. 개인정보 보관 기간</h2>
          <p className={styles.text}>
            이용자의 개인정보는 회원 탈퇴 시까지 보관되며, 탈퇴 후 지체 없이 파기합니다. 다만, 관련 법령에 따라 보존할 필요가 있는 경우에는 해당 기간 동안 보관합니다.
          </p>
          <div className={styles.table}>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>계약 관련 기록</span>
              <span className={styles.tableValue}>5년 (전자상거래법)</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>접속 로그 기록</span>
              <span className={styles.tableValue}>3개월 (통신비밀보호법)</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableLabel}>소비자 불만 기록</span>
              <span className={styles.tableValue}>3년 (전자상거래법)</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. 개인정보의 제3자 제공</h2>
          <p className={styles.text}>
            인마인드는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.
          </p>
          <ul className={styles.list}>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 의해 요구되는 경우</li>
            <li>서비스 제공을 위해 필요한 범위 내에서 업무 위탁하는 경우</li>
          </ul>
          <p className={styles.text}>
            개인정보 처리와 관련한 문의 사항은 <strong>contact@inmind.kr</strong>로 연락해주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
