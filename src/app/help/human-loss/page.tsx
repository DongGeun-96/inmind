import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, ChevronRight, Phone } from 'lucide-react';
import styles from '../help.module.css';

export const metadata: Metadata = {
  title: '소중한 사람을 잃었어요',
  description: '사별 후 겪는 감정과 회복 과정을 안내합니다.',
};

export default function HumanLossPage() {
  return (
    <article className={styles.article}>
      <Link href="/help" className={styles.articleBack}>
        <ArrowLeft size={14} />
        도움말 목록
      </Link>

      <div className={styles.articleHeader}>
        <div className={styles.articleEmoji}>🕯️</div>
        <h1 className={styles.articleTitle}>소중한 사람을 잃었어요</h1>
        <p className={styles.articleSummary}>사별 후 겪는 감정과 회복 과정을 안내합니다.</p>
      </div>

      {/* Section 1 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>애도는 직선이 아니에요</h2>
        <div className={styles.sectionText}>
          <p>사람들은 종종 슬픔이 시간이 지나면 자연스럽게 나아질 거라고 말해요. 어느 정도는 맞는 말이지만, 애도는 결코 직선으로 나아가지 않아요. 어제보다 오늘이 더 힘들 수도 있고, 오랫동안 괜찮다가 갑자기 무너지는 날도 있어요.</p>
          <p>그건 당신이 제대로 슬퍼하지 않아서가 아닙니다. 애도는 파도처럼 옵니다. 잔잔한 날도 있고, 갑자기 거세게 밀려오는 날도 있어요. 그 모든 날이 다 정상이에요.</p>
          <p>고인과 함께한 시간이 길고 깊을수록, 그 빈자리는 더 크게 느껴질 수밖에 없어요. 슬픔의 깊이는 사랑의 깊이예요. 지금 느끼는 모든 감정을 그대로 인정해 주세요.</p>
        </div>
      </section>

      {/* Section 2 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>복합적 애도 반응</h2>
        <p className={styles.sectionText} style={{ marginBottom: 12 }}>정상적인 반응</p>
        <ul className={styles.checklist}>
          {[
            '갑작스러운 울음',
            '고인과의 대화 상상',
            '멍하거나 비현실감',
            '수면·식욕 변화',
            '분노나 죄책감',
          ].map((item) => (
            <li key={item} className={styles.checkItem}>
              <CheckCircle size={16} className={styles.checkIcon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className={styles.sectionText} style={{ marginTop: 20, marginBottom: 12 }}>전문 도움이 필요한 신호</p>
        <ul className={styles.checklist}>
          {[
            '6개월 이상 일상 복귀가 안 됨',
            '고인을 따라가고 싶은 생각',
            '극심한 자기 방치',
            '알코올·약물 의존 증가',
          ].map((item) => (
            <li key={item} className={styles.checkItem}>
              <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 3, color: 'var(--color-danger)' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1주기, 기념일이 다가올 때</h2>
        <ul className={styles.list}>
          {[
            '미리 그 날에 대한 계획을 세워두세요',
            '혼자 보내지 않아도 괜찮아요 — 함께 할 사람과 시간을 보내세요',
            '고인을 기리는 나만의 방식을 만들어도 좋아요',
            '그날 유독 힘들다면, 무리하지 말고 쉬어도 괜찮습니다',
          ].map((item) => (
            <li key={item} className={styles.listItem}>
              <span className={styles.listBullet} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 4 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>남은 사람들을 위한 자기 돌봄</h2>
        <ul className={styles.list}>
          {[
            '규칙적인 식사와 수면 유지',
            '감정을 글이나 대화로 표현하기',
            '도움이 필요하면 주저 없이 요청하기',
            '슬픔에도 불구하고 즐거운 순간이 오는 것은 자연스러운 것',
          ].map((item) => (
            <li key={item} className={styles.listItem}>
              <span className={styles.listBullet} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Warning Box */}
      <div className={styles.warningBox}>
        <p className={styles.warningTitle}>
          <AlertTriangle size={16} />
          이런 때는 바로 도움을 요청하세요
        </p>
        <p className={styles.warningText}>고인을 따라가고 싶은 생각이 들거나, 일상생활이 어려울 정도로 힘들 때는 즉시 전문가의 도움을 받으세요.</p>
      </div>

      {/* Hotline Box */}
      <div className={styles.hotlineBox}>
        <p className={styles.hotlineTitle}>
          <Phone size={14} style={{ display: 'inline', marginRight: 6 }} />
          24시간 위기상담 전화
        </p>
        <div className={styles.hotlineList}>
          <div className={styles.hotlineItem}>
            <span className={styles.hotlineName}>자살예방상담전화</span>
            <span className={styles.hotlineNumber}>1393</span>
          </div>
          <div className={styles.hotlineItem}>
            <span className={styles.hotlineName}>정신건강위기상담전화</span>
            <span className={styles.hotlineNumber}>1577-0199</span>
          </div>
          <div className={styles.hotlineItem}>
            <span className={styles.hotlineName}>건강보험공단</span>
            <span className={styles.hotlineNumber}>129</span>
          </div>
        </div>
      </div>

      {/* Related Box */}
      <div className={styles.relatedBox}>
        <p className={styles.relatedTitle}>관련 게시판</p>
        <Link href="/board/human_loss" className={styles.relatedLink}>
          <ChevronRight size={16} />
          사별 게시판
        </Link>
      </div>

      <p className={styles.footerDisclaimer}>
        이 페이지는 참고용이며 전문 의학 조언을 대체하지 않습니다. 지속적인 어려움이 있다면 반드시 전문가와 상담하세요.
      </p>
    </article>
  );
}
