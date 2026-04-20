'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Layers, ChevronLeft, ChevronRight, RotateCcw, ArrowLeft } from 'lucide-react';
import styles from '../test.module.css';

// 5요인 각 2문항씩, 5점 리커트 (0~4)
// O(개방성), C(성실성), E(외향성), A(친화성), N(신경성)
const ITEMS: { dim: 'O' | 'C' | 'E' | 'A' | 'N'; text: string; reverse?: boolean }[] = [
  { dim: 'O', text: '새로운 아이디어나 경험에 끌리는 편이다.' },
  { dim: 'O', text: '전통적이고 익숙한 방식이 더 편하다.', reverse: true },
  { dim: 'C', text: '할 일은 미리 계획하고 체크리스트를 만든다.' },
  { dim: 'C', text: '마감 직전에야 움직이는 편이다.', reverse: true },
  { dim: 'E', text: '사람이 많은 자리에서 에너지를 얻는다.' },
  { dim: 'E', text: '혼자 있는 시간이 더 편하다.', reverse: true },
  { dim: 'A', text: '상대 입장을 먼저 헤아리려고 한다.' },
  { dim: 'A', text: '내 할 말은 직설적으로 하는 편이다.', reverse: true },
  { dim: 'N', text: '사소한 일로 쉽게 긴장하거나 불안해진다.' },
  { dim: 'N', text: '스트레스에도 비교적 잘 버티는 편이다.', reverse: true },
];

const OPTIONS = [
  { value: 0, label: '전혀 아니다' },
  { value: 1, label: '아닌 편' },
  { value: 2, label: '보통' },
  { value: 3, label: '그런 편' },
  { value: 4, label: '매우 그렇다' },
];

const DIM_LABEL: Record<string, string> = {
  O: '개방성 (Openness)',
  C: '성실성 (Conscientiousness)',
  E: '외향성 (Extraversion)',
  A: '친화성 (Agreeableness)',
  N: '신경성 (Neuroticism)',
};

const DIM_DESC: Record<string, string> = {
  O: '새로움과 상상에 대한 열린 정도',
  C: '계획성·책임감·성취지향',
  E: '외부 자극에서 에너지를 얻는 정도',
  A: '협력적이고 공감적인 성향',
  N: '정서적 예민함과 스트레스 반응',
};

const DISCLAIMER =
  '이 테스트는 참고용이며, 공식 Big5 검사를 대체하지 않습니다.';

export default function Big5Client() {
  const [phase, setPhase] = useState<'intro' | 'questions' | 'result'>('intro');
  const [answers, setAnswers] = useState<number[]>(Array(ITEMS.length).fill(-1));
  const [currentQ, setCurrentQ] = useState(0);

  function handleStart() {
    setPhase('questions');
    window.scrollTo(0, 0);
  }

  function handleSelect(v: number) {
    const n = [...answers];
    n[currentQ] = v;
    setAnswers(n);
  }

  function handlePrev() {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  }
  function handleNext() {
    if (answers[currentQ] === -1) return;
    if (currentQ < ITEMS.length - 1) setCurrentQ(currentQ + 1);
    else setPhase('result');
  }
  function handleReset() {
    setAnswers(Array(ITEMS.length).fill(-1));
    setCurrentQ(0);
    setPhase('intro');
  }

  // 집계 (각 dim 0~8 → 0~100%)
  const dimScore: Record<string, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  ITEMS.forEach((it, idx) => {
    const v = answers[idx];
    if (v < 0) return;
    dimScore[it.dim] += it.reverse ? 4 - v : v;
  });
  const dimPct: Record<string, number> = {};
  for (const k of Object.keys(dimScore)) {
    dimPct[k] = Math.round((dimScore[k] / 8) * 100);
  }

  const progressPct = Math.round(((currentQ + 1) / ITEMS.length) * 100);

  if (phase === 'intro') {
    return (
      <div className={styles.testContainer}>
        <div className={styles.intro}>
          <div className={styles.introIcon}><Layers size={28} /></div>
          <h1 className={styles.introTitle}>Big5 성격검사 간이판</h1>
          <p className={styles.introDesc}>10문항으로 간단히 5가지 성격 요인을 확인해 보세요.</p>
          <p className={styles.disclaimer}>{DISCLAIMER}</p>
          <button className={styles.startBtn} onClick={handleStart}>
            시작하기 <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'questions') {
    const it = ITEMS[currentQ];
    const answered = answers[currentQ] !== -1;
    return (
      <div className={styles.testContainer}>
        <div className={styles.progressWrap}>
          <div className={styles.progressInfo}>
            <span className={styles.progressLabel}>Big5 성격검사</span>
            <span className={styles.progressCount}>{currentQ + 1} / {ITEMS.length}</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        <div className={styles.questionCard}>
          <p className={styles.questionNumber}>문항 {currentQ + 1}/{ITEMS.length}</p>
          <p className={styles.questionText}>{it.text}</p>
          <div className={styles.options}>
            {OPTIONS.map((opt) => {
              const selected = answers[currentQ] === opt.value;
              const id = `big5-q${currentQ}-o${opt.value}`;
              return (
                <label key={opt.value} htmlFor={id} className={`${styles.option}${selected ? ` ${styles.optionSelected}` : ''}`}>
                  <input type="radio" id={id} name={`big5-q${currentQ}`} checked={selected} onChange={() => handleSelect(opt.value)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                  <div className={styles.optionRadio} />
                  {opt.label}
                </label>
              );
            })}
          </div>
        </div>
        <div className={styles.navButtons}>
          <button className={`${styles.navBtn} ${styles.navBtnPrev}`} onClick={handlePrev} disabled={currentQ === 0}>
            <ChevronLeft size={18} /> 이전
          </button>
          <button className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={handleNext} disabled={!answered}>
            {currentQ === ITEMS.length - 1 ? '결과 보기' : '다음'} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.testContainer}>
      <div className={styles.resultHeader}>
        <h1 className={styles.resultTitle}>Big5 결과</h1>
        <p className={styles.resultSubtitle}>5가지 성격 요인 비율</p>
      </div>
      <div className={styles.interpretBox}>
        {(['O', 'C', 'E', 'A', 'N'] as const).map((k) => (
          <div key={k} style={{ padding: '14px 0', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <strong>{DIM_LABEL[k]}</strong>
              <span>{dimPct[k]}%</span>
            </div>
            <div style={{ background: 'var(--color-bg-secondary)', borderRadius: 999, height: 8, overflow: 'hidden' }}>
              <div style={{ width: `${dimPct[k]}%`, height: '100%', background: 'var(--color-accent)' }} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 6 }}>{DIM_DESC[k]}</p>
          </div>
        ))}
      </div>
      <p className={styles.disclaimer}>{DISCLAIMER}</p>
      <div className={styles.resultActions}>
        <button className={`${styles.resultBtn} ${styles.resultBtnPrimary}`} onClick={handleReset}>
          <RotateCcw size={16} /> 다시 하기
        </button>
        <Link href="/test" className={`${styles.resultBtn} ${styles.resultBtnSecondary}`}>
          <ArrowLeft size={16} /> 목록으로
        </Link>
      </div>
    </div>
  );
}
