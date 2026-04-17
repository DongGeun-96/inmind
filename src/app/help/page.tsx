import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './help.module.css';

export const metadata: Metadata = {
  title: '도움말 모음',
  description: '우울, 불안, 상실, 불면 등 상황별 마음 건강 가이드를 확인해 보세요.',
};

const GUIDES = [
  { emoji: '🌧️', title: '우울할 때 처음 뭘 해야 할까요?', desc: '2주 이상 우울감이 지속될 때 참고할 수 있는 단계별 안내', href: '/help/depression-first-steps' },
  { emoji: '🐾', title: '반려동물을 떠나보냈어요', desc: '펫로스 증후군을 겪고 있는 분들을 위한 안내', href: '/help/pet-loss' },
  { emoji: '🕯️', title: '소중한 사람을 잃었어요', desc: '사별 후 겪는 감정과 회복 과정 안내', href: '/help/human-loss' },
  { emoji: '🌙', title: '불면증이 심해요', desc: '잠 못 자는 날이 많을 때 도움이 되는 정보', href: '/help/sleep' },
  { emoji: '💨', title: '공황 발작이 왔을 때', desc: '공황 증상 대처법과 예방 안내', href: '/help/panic' },
  { emoji: '🔥', title: '번아웃이 왔어요', desc: '번아웃 인식과 회복을 위한 가이드', href: '/help/burnout' },
];

export default function HelpHubPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>도움말 모음</h1>
        <p className={styles.subtitle}>상황별로 마음을 돌보는 방법을 안내해 드려요</p>
      </div>
      <div className={styles.grid}>
        {GUIDES.map((g) => (
          <Link key={g.href} href={g.href} className={styles.card}>
            <div className={styles.cardEmoji}>{g.emoji}</div>
            <h2 className={styles.cardTitle}>{g.title}</h2>
            <p className={styles.cardDesc}>{g.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
