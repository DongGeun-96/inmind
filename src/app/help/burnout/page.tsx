import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import styles from '../help.module.css';

export const metadata: Metadata = {
  title: '번아웃이 왔어요',
  description: '번아웃 증상 체크리스트와 회복 가이드.',
};

export default function BurnoutPage() {
  return (
    <article className={styles.article}>
      <Link href="/help" className={styles.articleBack}>
        <ArrowLeft size={14} />
        도움말 목록
      </Link>

      <div className={styles.articleHeader}>
        <div className={styles.articleEmoji}>🔥</div>
        <h1 className={styles.articleTitle}>번아웃이 왔어요</h1>
        <p className={styles.articleSummary}>번아웃을 인식하고 회복하기 위한 가이드입니다.</p>
      </div>

      {/* Section 1 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>번아웃 체크리스트</h2>
        <ul className={styles.checklist}>
          {[
            '아침에 일어나면 이미 피곤하다',
            '일에 대한 의욕이나 열정이 사라졌다',
            '사소한 일에도 짜증이 난다',
            '성과가 나지 않는다고 느낀다',
            '집중력이 현저히 떨어졌다',
            '사람들을 만나는 것이 귀찮다',
            '두통, 소화불량 등 원인 모를 신체 증상이 있다',
            '주말에도 충분히 쉬어도 회복되지 않는다',
            '"이래 봤자 뭐 하나" 하는 허무감이 든다',
            '이전에 좋아하던 것에 관심이 없어졌다',
            '수면 패턴이 불규칙해졌다',
            '술이나 자극적인 것에 의존하게 된다',
          ].map((item, index) => (
            <li key={index} className={styles.checkItem}>
              <CheckCircle size={16} className={styles.checkIcon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className={styles.sectionText} style={{ marginTop: 12 }}>
          <p>5개 이상 해당된다면 번아웃 상태일 가능성이 높습니다.</p>
        </div>
      </section>

      {/* Section 2 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>피로와 번아웃의 차이</h2>
        <div className={styles.sectionText}>
          <p>단순한 피로는 휴식을 취하면 회복됩니다. 하지만 번아웃은 충분히 쉬어도 나아지지 않고, 무기력감과 냉소가 지속됩니다. 피로는 "쉬고 싶다"이지만, 번아웃은 "아무것도 하고 싶지 않다"입니다. 이 차이를 인식하는 것이 회복의 첫 걸음이에요.</p>
        </div>
      </section>

      {/* Section 3 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>당장 할 수 있는 회복 단계</h2>
        <ul className={styles.list}>
          {[
            '인정하기 — 번아웃 상태라는 것을 인정하세요. 자신을 게으르다고 탓하지 마세요.',
            '완전한 쉼 확보하기 — 가능하다면 며칠간 완전한 휴식을 취하세요. 아무것도 하지 않아도 괜찮아요.',
            '에너지 도둑 찾기 — 나의 에너지를 소모하는 것들을 목록으로 적어보세요.',
            '작은 것부터 다시 시작하기 — 회복 후에도 한꺼번에 돌아가지 마세요. 하루에 하나씩, 천천히.',
            '경계 설정하기 — "안 된다"고 말하는 연습을 하세요. 모든 것을 다 할 필요는 없어요.',
          ].map((item, index) => (
            <li key={index} className={styles.listItem}>
              <span className={styles.listNumber}>{index + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 4 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>직장에서의 대처</h2>
        <ul className={styles.list}>
          {[
            '업무량 조정이 필요하다면 상사와 솔직하게 대화하세요',
            '연차나 휴가 사용을 미루지 마세요',
            '점심시간에는 업무 공간을 벗어나세요',
            '퇴근 후에는 업무 메시지를 확인하지 않는 시간을 정하세요',
            '동료에게 도움을 요청하는 것은 나약함이 아닙니다',
          ].map((item, index) => (
            <li key={index} className={styles.listItem}>
              <span className={styles.listBullet} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 5 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>만성이 된 경우</h2>
        <div className={styles.sectionText}>
          <p>번아웃이 수개월 이상 지속되면 우울증으로 이어질 수 있습니다. 번아웃 상태에서 벗어나지 못하고 있다면, 전문 상담을 통해 근본적인 원인을 함께 살펴보는 것이 중요합니다.</p>
        </div>
      </section>

      {/* Warning box */}
      <div className={styles.warningBox}>
        <h3 className={styles.warningTitle}><AlertTriangle size={18} /> 이런 때는 도움을 요청하세요</h3>
        <p className={styles.warningText}>번아웃이 오래 지속되어 우울감이나 무기력이 심해졌다면, 정신건강의학과 상담을 받아보세요. 번아웃도 치료가 필요한 상태입니다.</p>
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
        <Link href="/board/career" className={styles.relatedLink}>직장·진로 게시판 <ChevronRight size={16} /></Link>
      </div>

      <p className={styles.footerDisclaimer}>이 페이지는 참고용이며 전문 의학 조언을 대체하지 않습니다. 지속적인 어려움이 있다면 반드시 전문가와 상담하세요.</p>
    </article>
  );
}
