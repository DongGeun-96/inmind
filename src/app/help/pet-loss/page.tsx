import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, ChevronRight, Phone } from 'lucide-react';
import styles from '../help.module.css';

export const metadata: Metadata = {
  title: '반려동물을 떠나보냈어요',
  description: '펫로스 증후군을 겪고 있는 분들을 위한 안내입니다.',
};

export default function PetLossPage() {
  return (
    <article className={styles.article}>
      <Link href="/help" className={styles.articleBack}>
        <ArrowLeft size={14} />
        도움말 목록
      </Link>

      <div className={styles.articleHeader}>
        <div className={styles.articleEmoji}>🐾</div>
        <h1 className={styles.articleTitle}>반려동물을 떠나보냈어요</h1>
        <p className={styles.articleSummary}>펫로스 증후군을 겪고 있는 분들을 위한 안내입니다.</p>
      </div>

      {/* Section 1 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>당신의 슬픔은 정당해요</h2>
        <div className={styles.sectionText}>
          <p>반려동물을 잃는 슬픔은 누군가에게는 이해받기 어려운 감정일 수 있어요. "그냥 동물인데"라는 말을 들을 때, 그 상처는 더 깊어지기도 합니다. 하지만 당신의 슬픔은 완전히 정당하고, 진짜입니다.</p>
          <p>반려동물은 단순한 동물이 아니에요. 매일 아침 가장 먼저 반겨주고, 말없이 곁에 있어 주고, 어떤 날도 당신을 판단하지 않았던 존재입니다. 그런 존재를 잃은 슬픔이 크고 깊은 건 당연한 일이에요.</p>
          <p>펫로스 증후군은 실제로 존재하는 심리적 반응입니다. 사람을 잃었을 때와 유사한 애도 과정을 거치는 분들이 많아요. 지금 느끼는 공허함, 그리움, 죄책감은 모두 사랑했다는 증거입니다.</p>
        </div>
      </section>

      {/* Section 2 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>펫로스 증후군의 일반적인 단계</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.listNumber}>1</span>
            <span><strong>부정</strong> — "아직도 문 앞에서 기다리는 것 같아요"</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.listNumber}>2</span>
            <span><strong>분노</strong> — "더 잘해줄 수 있었는데..." 하는 자책</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.listNumber}>3</span>
            <span><strong>우울</strong> — 텅 빈 집이 유독 크게 느껴지는 시기</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.listNumber}>4</span>
            <span><strong>수용</strong> — 천천히, 자신의 속도로 찾아옵니다</span>
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>스스로를 돌보는 방법</h2>
        <ul className={styles.list}>
          {[
            '일상의 루틴을 유지하려고 노력하세요',
            '반려동물과의 추억을 사진이나 글로 정리해 보세요',
            '슬픔을 억지로 참지 마세요 — 울고 싶을 때 우는 것도 치유입니다',
            '같은 경험을 한 사람들과 이야기를 나눠보세요',
            '새로운 반려동물을 서둘러 맞이할 필요 없어요 — 자신의 속도를 존중하세요',
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
        <h2 className={styles.sectionTitle}>주변의 "그 정도로 뭘…" 소리에 상처받았다면</h2>
        <div className={styles.sectionText}>
          <p>반려동물을 잃은 슬픔을 이해하지 못하는 사람들의 말은 때로 의도치 않게 상처가 됩니다. "이미 지났잖아", "다시 키우면 되잖아" 같은 말들이요. 그런 말을 들을 때 당신의 감정이 작아지게 느껴지겠지만, 그 감정의 크기는 오직 당신만이 알 수 있어요.</p>
          <p>당신의 슬픔을 이해해 주는 사람을 찾는 것이 중요합니다. 펫로스를 경험한 커뮤니티나 온라인 모임에서 같은 감정을 나누는 것이 도움이 되기도 해요. 당신이 혼자가 아니라는 걸 기억해 주세요.</p>
        </div>
      </section>

      {/* Warning Box */}
      <div className={styles.warningBox}>
        <p className={styles.warningTitle}>
          <AlertTriangle size={16} />
          이런 때는 도움을 청하세요
        </p>
        <p className={styles.warningText}>2주 이상 일상생활이 어려울 정도로 슬픔이 지속되거나, 자해에 대한 생각이 든다면 전문가와 이야기해 주세요.</p>
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
        <Link href="/board/pet_loss" className={styles.relatedLink}>
          <ChevronRight size={16} />
          펫로스 게시판
        </Link>
      </div>

      <p className={styles.footerDisclaimer}>
        이 페이지는 참고용이며 전문 의학 조언을 대체하지 않습니다. 지속적인 어려움이 있다면 반드시 전문가와 상담하세요.
      </p>
    </article>
  );
}
