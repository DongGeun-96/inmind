'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, RotateCcw, ArrowLeft } from 'lucide-react';
import styles from './test.module.css';

export interface CategoryOption {
  label: string;
  /** 선택 시 가산될 카테고리 → 점수 */
  weights: Record<string, number>;
}

export interface CategoryQuestion {
  text: string;
  options: CategoryOption[];
}

export interface CategoryResult {
  key: string;
  title: string;
  subtitle?: string;
  desc: string;
  emoji?: string;
}

export interface CategoryTestRunnerProps {
  testId: string;
  title: string;
  introDesc: string;
  icon: ReactNode;
  questions: CategoryQuestion[];
  results: CategoryResult[];
  /**
   * MBTI처럼 여러 축(차원)이 있는 경우 결과 키 조합 방식 사용.
   * dimensions 예: [{ key:'EI', positive:'E', negative:'I' }, ...]
   * 각 옵션 weights에 positive/negative에 +1 주고, 합계 부호로 결정.
   */
  dimensions?: { key: string; positive: string; negative: string }[];
}

const DISCLAIMER =
  '이 테스트는 재미와 자기이해를 위한 참고용이며, 전문적인 심리 진단을 대체하지 않습니다.';

export default function CategoryTestRunner({
  testId,
  title,
  introDesc,
  icon,
  questions,
  results,
  dimensions,
}: CategoryTestRunnerProps) {
  const [phase, setPhase] = useState<'intro' | 'questions' | 'result'>('intro');
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [currentQ, setCurrentQ] = useState(0);

  function handleStart() {
    setPhase('questions');
    window.scrollTo(0, 0);
  }

  function handleSelect(idx: number) {
    const next = [...answers];
    next[currentQ] = idx;
    setAnswers(next);
  }

  function handlePrev() {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      window.scrollTo(0, 0);
    }
  }

  function handleNext() {
    if (answers[currentQ] === -1) return;
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      window.scrollTo(0, 0);
    } else {
      setPhase('result');
      window.scrollTo(0, 0);
    }
  }

  function handleReset() {
    setAnswers(Array(questions.length).fill(-1));
    setCurrentQ(0);
    setPhase('intro');
    window.scrollTo(0, 0);
  }

  // 점수 집계
  const scores: Record<string, number> = {};
  answers.forEach((optIdx, qIdx) => {
    if (optIdx < 0) return;
    const opt = questions[qIdx].options[optIdx];
    for (const [k, v] of Object.entries(opt.weights)) {
      scores[k] = (scores[k] ?? 0) + v;
    }
  });

  // 결과 결정
  let resultKey = '';
  if (dimensions && dimensions.length) {
    // MBTI 스타일: 각 차원에서 positive vs negative
    let key = '';
    for (const d of dimensions) {
      const p = scores[d.positive] ?? 0;
      const n = scores[d.negative] ?? 0;
      key += p >= n ? d.positive : d.negative;
    }
    resultKey = key;
  } else {
    // 최고 점수 카테고리
    let best = '';
    let bestScore = -Infinity;
    for (const [k, v] of Object.entries(scores)) {
      if (v > bestScore) {
        bestScore = v;
        best = k;
      }
    }
    resultKey = best;
  }

  const winner = results.find((r) => r.key === resultKey) ?? results[0];
  const progressPct = Math.round(((currentQ + 1) / questions.length) * 100);

  // Intro
  if (phase === 'intro') {
    return (
      <div className={styles.testContainer}>
        <div className={styles.intro}>
          <div className={styles.introIcon}>{icon}</div>
          <h1 className={styles.introTitle}>{title}</h1>
          <p className={styles.introDesc}>{introDesc}</p>
          <p className={styles.disclaimer}>{DISCLAIMER}</p>
          <button className={styles.startBtn} onClick={handleStart}>
            시작하기
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // Questions
  if (phase === 'questions') {
    const q = questions[currentQ];
    const isFirst = currentQ === 0;
    const isLast = currentQ === questions.length - 1;
    const answered = answers[currentQ] !== -1;

    return (
      <div className={styles.testContainer}>
        <div className={styles.progressWrap}>
          <div className={styles.progressInfo}>
            <span className={styles.progressLabel}>{title}</span>
            <span className={styles.progressCount}>
              {currentQ + 1} / {questions.length}
            </span>
          </div>
          <div
            className={styles.progressBar}
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className={styles.questionCard}>
          <p className={styles.questionNumber}>
            문항 {currentQ + 1}/{questions.length}
          </p>
          <p className={styles.questionText}>{q.text}</p>
          <div className={styles.options}>
            {q.options.map((opt, idx) => {
              const selected = answers[currentQ] === idx;
              const inputId = `${testId}-q${currentQ}-opt${idx}`;
              return (
                <label
                  key={idx}
                  htmlFor={inputId}
                  className={`${styles.option}${selected ? ` ${styles.optionSelected}` : ''}`}
                >
                  <input
                    type="radio"
                    id={inputId}
                    name={`${testId}-q${currentQ}`}
                    value={idx}
                    checked={selected}
                    onChange={() => handleSelect(idx)}
                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                  />
                  <div className={styles.optionRadio} />
                  {opt.label}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.navButtons}>
          <button
            className={`${styles.navBtn} ${styles.navBtnPrev}`}
            onClick={handlePrev}
            disabled={isFirst}
          >
            <ChevronLeft size={18} />
            이전
          </button>
          <button
            className={`${styles.navBtn} ${styles.navBtnNext}`}
            onClick={handleNext}
            disabled={!answered}
          >
            {isLast ? '결과 보기' : '다음'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // Result
  return (
    <div className={styles.testContainer}>
      <div className={styles.resultHeader}>
        <h1 className={styles.resultTitle}>검사 결과</h1>
        <p className={styles.resultSubtitle}>{title}</p>
      </div>

      <div className={styles.scoreCard}>
        {winner.emoji && (
          <p className={styles.scoreNumber} style={{ fontSize: 48 }}>
            {winner.emoji}
          </p>
        )}
        <span className={styles.scoreLevel}>{winner.title}</span>
        {winner.subtitle && <p className={styles.scoreMax}>{winner.subtitle}</p>}
        <p className={styles.scoreDesc}>{winner.desc}</p>
      </div>

      <div className={styles.interpretBox}>
        <p className={styles.interpretTitle}>다른 유형 한줄 소개</p>
        {results
          .filter((r) => r.key !== winner.key)
          .map((r) => (
            <div key={r.key} className={styles.interpretItem}>
              <span className={styles.interpretRange}>{r.title}</span>
              <span>{r.subtitle ?? ''}</span>
            </div>
          ))}
      </div>

      <p className={styles.disclaimer}>{DISCLAIMER}</p>

      <div className={styles.resultActions}>
        <button className={`${styles.resultBtn} ${styles.resultBtnPrimary}`} onClick={handleReset}>
          <RotateCcw size={16} />
          다시 하기
        </button>
        <Link href="/test" className={`${styles.resultBtn} ${styles.resultBtnSecondary}`}>
          <ArrowLeft size={16} />
          목록으로
        </Link>
      </div>
    </div>
  );
}
