'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MOOD_CONFIG, type MoodEntry, type MoodType } from '@/types/database';
import styles from './mood.module.css';

interface Props {
  entries: MoodEntry[];
}

export default function MoodClient({ entries }: Props) {
  // Build 30-day grid
  const days: { date: string; entry: MoodEntry | null }[] = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });
    const entry = entries.find((e) => e.entry_date === dateStr) || null;
    days.push({ date: dateStr, entry });
  }

  // Top 3 moods
  const moodCounts = entries.reduce<Record<string, number>>((acc, e) => {
    acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {});

  const topMoods = Object.entries(moodCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  const getDayOfWeek = (dateStr: string) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const d = new Date(dateStr + 'T00:00:00');
    return days[d.getDay()];
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/mypage" className={styles.backBtn} aria-label="마이페이지로 돌아가기">
          <ArrowLeft size={20} />
        </Link>
        <h1 className={styles.pageTitle}>감정 기록</h1>
      </div>

      {/* Top moods */}
      {topMoods.length > 0 && (
        <div className={styles.topCard}>
          <h2 className={styles.topTitle}>최근 30일 가장 많이 느낀 감정</h2>
          <div className={styles.topList}>
            {topMoods.map(([mood, count], i) => {
              const config = MOOD_CONFIG[mood as MoodType];
              return (
                <div key={mood} className={styles.topItem}>
                  <span className={styles.topRank}>{i + 1}</span>
                  <span className={styles.topEmoji}>{config?.emoji}</span>
                  <span className={styles.topLabel}>{config?.label}</span>
                  <span className={styles.topCount}>{count}회</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 30 day grid */}
      <div className={styles.gridCard}>
        <h2 className={styles.gridTitle}>최근 30일</h2>
        <div className={styles.grid}>
          {days.map(({ date, entry }) => (
            <div key={date} className={styles.gridItem}>
              <span className={styles.gridDate}>{formatDate(date)}</span>
              <span className={styles.gridDay}>({getDayOfWeek(date)})</span>
              <span className={styles.gridEmoji}>
                {entry ? MOOD_CONFIG[entry.mood]?.emoji : '—'}
              </span>
              {entry?.note && <span className={styles.gridNote}>{entry.note}</span>}
            </div>
          ))}
        </div>
      </div>

      {entries.length === 0 && (
        <p className={styles.empty}>아직 감정 기록이 없어요. 홈에서 오늘의 기분을 기록해보세요!</p>
      )}
    </div>
  );
}
