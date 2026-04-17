import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import styles from '../help.module.css';

export const metadata: Metadata = {
  title: '불면증이 심해요',
  description: '불면증 대처법과 수면 위생 가이드. 잠 못 자는 밤을 위한 안내.',
};

export default function SleepPage() {
  return (
    <article className={styles.article}>
      <Link href="/help" className={styles.articleBack}>
        <ArrowLeft size={14} />
        도움말 목록
      </Link>

      <div className={styles.articleHeader}>
        <div className={styles.articleEmoji}>🌙</div>
        <h1 className={styles.articleTitle}>불면증이 심해요</h1>
        <p className={styles.articleSummary}>잠 못 자는 날이 많을 때 참고할 수 있는 수면 관리 안내입니다.</p>
      </div>

      {/* Section 1 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>수면 위생 기본 10가지</h2>
        <ul className={styles.list}>
          {[
            '매일 같은 시간에 자고 일어나세요',
            '침실은 어둡고 시원하게 유지하세요',
            '잠자리에 들기 1시간 전부터 스마트폰을 멀리 하세요',
            '카페인은 오후 2시 이후로 피하세요',
            '저녁에 과식하거나 술을 마시지 마세요',
            '낮잠은 20분 이내로 제한하세요',
            '규칙적인 운동을 하되, 취침 3시간 전에는 마치세요',
            '잠이 안 오면 침대에서 나와 다른 일을 하세요',
            '걱정거리는 노트에 적어두고 내일로 미루세요',
            '침대는 잠과 휴식만을 위한 공간으로 사용하세요',
          ].map((item, index) => (
            <li key={index} className={styles.listItem}>
              <span className={styles.listNumber}>{index + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 2 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>잠 안 오는 밤 당장 해볼 수 있는 것</h2>
        <ul className={styles.list}>
          {[
            '4-7-8 호흡법: 코로 4초 들이쉬고, 7초 참고, 입으로 8초 내쉬세요. 3~4회 반복하면 마음이 차분해집니다.',
            '점진적 근육 이완: 발끝부터 시작해 각 부위의 근육을 5초간 힘주었다가 풀기를 반복하세요.',
            '마음 속 안전한 장소 떠올리기: 편안했던 장소를 세밀하게 상상해 보세요.',
            '단조로운 것 세기: 양을 세는 것도 좋지만, 숫자를 거꾸로 세는 것도 도움이 됩니다.',
          ].map((item, index) => (
            <li key={index} className={styles.listItem}>
              <span className={styles.listBullet} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>불면증과 우울·불안의 관계</h2>
        <div className={styles.sectionText}>
          <p>불면이 오래 지속되면 우울이나 불안이 동반되기 쉽고, 반대로 우울이나 불안이 불면의 원인이 되기도 합니다. 수면 문제가 2주 이상 지속된다면, 단순한 수면 문제가 아닐 수 있어요.</p>
        </div>
      </section>

      {/* Section 4 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>병원을 고려해야 할 때</h2>
        <ul className={styles.checklist}>
          {[
            '잠들기까지 30분 이상 걸리는 날이 일주일에 3일 이상이다',
            '한 달 이상 수면 문제가 지속되고 있다',
            '낮 동안 피로감이 심해 일상생활에 지장이 있다',
            '수면제 없이는 잠들기 어렵다',
            '코골이나 수면 무호흡 증상이 있다',
          ].map((item, index) => (
            <li key={index} className={styles.checkItem}>
              <CheckCircle size={16} className={styles.checkIcon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Info box */}
      <div className={styles.infoBox}>
        <h3 className={styles.infoTitle}>수면 일기를 써보세요</h3>
        <p className={styles.infoText}>취침 시간, 기상 시간, 잠들기까지 걸린 시간, 중간에 깬 횟수를 기록하면 자신의 수면 패턴을 파악하는 데 도움이 됩니다. 병원 방문 시에도 유용한 자료가 됩니다.</p>
      </div>

      {/* Warning box */}
      <div className={styles.warningBox}>
        <h3 className={styles.warningTitle}><AlertTriangle size={18} /> 이런 때는 도움을 요청하세요</h3>
        <p className={styles.warningText}>불면이 한 달 이상 지속되고 일상에 지장이 있다면 수면 전문의 또는 정신건강의학과 진료를 받아보세요.</p>
      </div>

      {/* Hotline box */}
      <div className={styles.hotlineBox}>
        <h3 className={styles.hotlineTitle}>상담 전화번호</h3>
        <div className={styles.hotlineList}>
          <div className={styles.hotlineItem}><span className={styles.hotlineName}>자살예방상담전화</span><span className={styles.hotlineNumber}>1393</span></div>
          <div className={styles.hotlineItem}><span className={styles.hotlineName}>정신건강위기상담전화</span><span className={styles.hotlineNumber}>1577-0199</span></div>
          <div className={styles.hotlineItem}><span className={styles.hotlineName}>건강보험공단</span><span className={styles.hotlineNumber}>129</span></div>
        </div>
      </div>

      {/* Related */}
      <div className={styles.relatedBox}>
        <h3 className={styles.relatedTitle}>관련 게시판</h3>
        <Link href="/board/depression" className={styles.relatedLink}>우울 게시판 <ChevronRight size={16} /></Link>
      </div>

      <p className={styles.footerDisclaimer}>이 페이지는 참고용이며 전문 의학 조언을 대체하지 않습니다. 지속적인 어려움이 있다면 반드시 전문가와 상담하세요.</p>
    </article>
  );
}
