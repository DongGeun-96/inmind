import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, ChevronRight, Phone } from 'lucide-react';
import styles from '../help.module.css';

export const metadata: Metadata = {
  title: '우울할 때 처음 뭘 해야 할까요?',
  description: '우울감이 2주 이상 지속될 때 참고할 수 있는 단계별 안내입니다.',
};

export default function DepressionFirstStepsPage() {
  return (
    <article className={styles.article}>
      <Link href="/help" className={styles.articleBack}>
        <ArrowLeft size={14} />
        도움말 목록
      </Link>

      <div className={styles.articleHeader}>
        <div className={styles.articleEmoji}>🌧️</div>
        <h1 className={styles.articleTitle}>우울할 때 처음 뭘 해야 할까요?</h1>
        <p className={styles.articleSummary}>우울감이 2주 이상 지속될 때 참고할 수 있는 단계별 안내입니다.</p>
      </div>

      {/* Section 1 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>당신의 감정은 잘못된 게 아니에요</h2>
        <div className={styles.sectionText}>
          <p>우울함을 느끼는 것은 나약함이 아니에요. 우리의 마음은 때로 너무 오랫동안 무거운 것을 들고 걸어왔을 때, 혹은 예상치 못한 충격을 받았을 때 그런 방식으로 반응합니다. 그건 당신이 잘못된 게 아니라, 당신의 마음이 힘들다는 신호를 보내고 있는 거예요.</p>
          <p>지금 이 순간 아무것도 하고 싶지 않고, 이유도 모르게 눈물이 나거나, 예전에는 즐거웠던 것들이 더 이상 즐겁지 않다면, 그 감정을 있는 그대로 인정해 주세요. 억지로 "괜찮아야 한다"고 다그치지 않아도 됩니다.</p>
          <p>우울감은 많은 사람들이 일생에 한 번쯤 경험하는 감정이에요. 당신만 이런 게 아니고, 이 감정은 영원하지 않습니다. 지금 이 페이지를 열어본 것만으로도 당신은 이미 한 발 내딛은 거예요.</p>
        </div>
      </section>

      {/* Section 2 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>오늘 당장 할 수 있는 3가지</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.listNumber}>1</span>
            <span><strong>매일 같은 시간에 일어나기</strong> — 우울할 때 수면 패턴이 불규칙해지기 쉬워요. 알람을 맞춰 같은 시간에 일어나는 것만으로도 하루의 리듬을 되찾을 수 있습니다.</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.listNumber}>2</span>
            <span><strong>가볍게 바깥 공기 쐬기</strong> — 5분이라도 괜찮아요. 집 앞을 한 바퀴 도는 것만으로도 기분에 변화가 올 수 있습니다.</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.listNumber}>3</span>
            <span><strong>물 한 잔 마시기</strong> — 간단하지만 몸을 돌보는 첫 걸음이에요. 나를 위해 무언가를 한다는 행동 자체가 중요합니다.</span>
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>전문가 상담이 필요한 신호</h2>
        <ul className={styles.checklist}>
          {[
            '2주 이상 우울한 기분이 지속된다',
            '이전에 즐기던 활동에 전혀 흥미가 없다',
            '수면이나 식욕에 큰 변화가 생겼다',
            '집중하기 어렵고 결정을 내리기 힘들다',
            '자신이 무가치하다고 느낀다',
            '자해나 자살에 대한 생각이 든다',
          ].map((item) => (
            <li key={item} className={styles.checkItem}>
              <CheckCircle size={16} className={styles.checkIcon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 4 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>정신과 방문에 대한 오해와 진실</h2>
        <div className={styles.faq}>
          <div className={styles.faqItem}>
            <p className={styles.faqQ}>정신과에 가면 기록이 남나요?</p>
            <p className={styles.faqA}>정신건강의학과 진료 기록은 의료법에 의해 철저히 보호됩니다. 일반적인 취업이나 보험 가입에 영향을 주지 않습니다.</p>
          </div>
          <div className={styles.faqItem}>
            <p className={styles.faqQ}>약을 먹으면 중독되나요?</p>
            <p className={styles.faqA}>정신과 약물은 전문의의 처방 아래 안전하게 사용됩니다. 필요에 따라 조절하며, 중독성이 거의 없는 약물을 주로 사용합니다.</p>
          </div>
          <div className={styles.faqItem}>
            <p className={styles.faqQ}>상담만 받을 수도 있나요?</p>
            <p className={styles.faqA}>네, 약물 처방 없이 심리상담만 받을 수 있습니다. 상담사와 함께 내 마음을 정리하는 것도 큰 도움이 됩니다.</p>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>어디서 상담받을 수 있나요?</h2>
        <ul className={styles.list}>
          {[
            '정신건강의학과 (정신과) — 전문의 진료와 필요시 약물 처방',
            '정신건강복지센터 — 전국에 있으며 무료 상담 가능 (1577-0199)',
            '온라인 상담 — 한국생명의전화 (1588-9191), 카카오톡 마음이음',
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
        <p className={styles.warningText}>자해나 자살에 대한 생각이 들 때, 일상생활이 어려울 정도로 힘들 때는 즉시 전문가의 도움을 받으세요.</p>
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
        <Link href="/board/depression" className={styles.relatedLink}>
          <ChevronRight size={16} />
          우울 게시판
        </Link>
      </div>

      <p className={styles.footerDisclaimer}>
        이 페이지는 참고용이며 전문 의학 조언을 대체하지 않습니다. 지속적인 어려움이 있다면 반드시 전문가와 상담하세요.
      </p>
    </article>
  );
}
