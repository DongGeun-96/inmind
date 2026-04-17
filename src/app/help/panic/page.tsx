import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import styles from '../help.module.css';

export const metadata: Metadata = {
  title: '공황 발작이 왔을 때',
  description: '공황 발작 대처법, 그라운딩 기법, 예방법 안내.',
};

export default function PanicPage() {
  return (
    <article className={styles.article}>
      <Link href="/help" className={styles.articleBack}>
        <ArrowLeft size={14} />
        도움말 목록
      </Link>

      <div className={styles.articleHeader}>
        <div className={styles.articleEmoji}>💨</div>
        <h1 className={styles.articleTitle}>공황 발작이 왔을 때</h1>
        <p className={styles.articleSummary}>공황 증상 대처법과 예방에 대한 안내입니다.</p>
      </div>

      {/* Section 1 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>공황 발작이 오면 지금 해야 할 것</h2>
        <ul className={styles.list}>
          {[
            '멈추고 안전한 곳에 앉으세요 — 가능하면 벽이나 의자에 기대세요.',
            '호흡에 집중하세요 — 코로 4초 들이쉬고, 입으로 6초 천천히 내쉬세요. 급하게 쉬면 과호흡이 될 수 있어요.',
            '5-4-3-2-1 그라운딩 기법 — 눈에 보이는 것 5가지, 만질 수 있는 것 4가지, 들리는 소리 3가지, 냄새 2가지, 맛 1가지를 천천히 찾아보세요.',
            '스스로에게 말하세요 — "이건 공황이야. 위험하지 않아. 곧 지나갈 거야."',
            '몸의 긴장을 풀어주세요 — 주먹을 꽉 쥐었다가 천천히 펴세요. 어깨도 올렸다가 내리세요.',
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
        <h2 className={styles.sectionTitle}>공황은 위험하지 않아요</h2>
        <div className={styles.sectionText}>
          <p>심장이 빨리 뛰고, 숨이 막히는 것 같고, "죽을 것 같다"는 느낌이 들지만, 공황 발작으로 사망하는 경우는 없습니다. 보통 10~20분 안에 자연스럽게 가라앉습니다. 이 사실을 아는 것만으로도 공포가 줄어들 수 있어요.</p>
        </div>
      </section>

      {/* Section 3 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>반복될 때 — 공황장애 가능성</h2>
        <ul className={styles.checklist}>
          {[
            '한 달 안에 2회 이상 공황 발작이 반복된다',
            '또 발작이 올까 봐 항상 불안하다',
            '발작이 올까 봐 특정 장소나 상황을 피한다',
            '일상생활에 지장이 생겼다',
          ].map((item, index) => (
            <li key={index} className={styles.checkItem}>
              <CheckCircle size={16} className={styles.checkIcon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className={styles.sectionText} style={{ marginTop: 12 }}>
          <p>위 항목 중 해당되는 것이 있다면 공황장애일 수 있으므로 전문가 상담을 받아보세요.</p>
        </div>
      </section>

      {/* Section 4 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>일상에서 예방하는 법</h2>
        <ul className={styles.list}>
          {[
            '규칙적인 유산소 운동 (걷기, 조깅 등)',
            '카페인과 알코올 섭취 줄이기',
            '충분한 수면과 규칙적인 생활 리듬',
            '호흡 연습을 평소에도 해두기',
            '스트레스 요인 파악하고 관리하기',
            '명상이나 마음챙김(mindfulness) 연습',
          ].map((item, index) => (
            <li key={index} className={styles.listItem}>
              <span className={styles.listBullet} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Info box */}
      <div className={styles.infoBox}>
        <h3 className={styles.infoTitle}>공황 발작 대처 카드</h3>
        <p className={styles.infoText}>자주 공황이 오는 분이라면, 대처법을 적은 작은 카드를 지갑에 넣어두세요. 발작이 올 때 꺼내서 읽으면 도움이 됩니다.</p>
      </div>

      {/* Warning box */}
      <div className={styles.warningBox}>
        <h3 className={styles.warningTitle}><AlertTriangle size={18} /> 이런 때는 도움을 요청하세요</h3>
        <p className={styles.warningText}>공황 발작이 반복되거나 일상생활이 어려울 정도라면 정신건강의학과를 방문해 주세요. 적절한 치료를 통해 충분히 나아질 수 있습니다.</p>
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
        <Link href="/help" className={styles.relatedLink}>도움말 목록 <ChevronRight size={16} /></Link>
      </div>

      <p className={styles.footerDisclaimer}>이 페이지는 참고용이며 전문 의학 조언을 대체하지 않습니다. 지속적인 어려움이 있다면 반드시 전문가와 상담하세요.</p>
    </article>
  );
}
