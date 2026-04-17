'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brain, ChevronLeft, ChevronRight, RotateCcw, ArrowLeft } from 'lucide-react';
import styles from '../test.module.css';

const QUESTIONS = [
  '초조하거나 불안하거나 조마조마하게 느낀다',
  '걱정하는 것을 멈추거나 조절할 수가 없다',
  '여러 가지 것들에 대해 걱정을 너무 많이 한다',
  '편하게 있기가 어렵다',
  '너무 안절부절못해서 가만히 있기가 힘들다',
  '쉽게 짜증이 나거나 쉽게 성을 내게 된다',
  '마치 끔찍한 일이 생길 것처럼 두렵게 느껴진다',
];

const OPTIONS = [
  { value: 0, label: '전혀 없음' },
  { value: 1, label: '며칠 동안' },
  { value: 2, label: '일주일 이상' },
  { value: 3, label: '거의 매일' },
];

const INTERPRETATIONS = [
  {
    range: '0–4점',
    level: '불안 없음',
    en: 'Minimal anxiety',
    desc: '현재 불안 증상이 거의 없습니다. 건강한 마음 상태를 유지하고 계시네요.',
    min: 0,
    max: 4,
  },
  {
    range: '5–9점',
    level: '경도 불안',
    en: 'Mild anxiety',
    desc: '가벼운 불안 증상이 있습니다. 스트레스 관리와 충분한 휴식이 도움이 될 수 있어요.',
    min: 5,
    max: 9,
  },
  {
    range: '10–14점',
    level: '중등도 불안',
    en: 'Moderate anxiety',
    desc: '중간 수준의 불안 증상이 있습니다. 전문가 상담을 고려해 보시는 것이 좋겠어요.',
    min: 10,
    max: 14,
  },
  {
    range: '15–21점',
    level: '고도 불안',
    en: 'Severe anxiety',
    desc: '심한 불안 증상이 있습니다. 가능한 빨리 전문가와 상담하시길 권합니다.',
    min: 15,
    max: 21,
  },
];

const DISCLAIMER =
  '이 자가진단은 전문적인 의학 진단을 대체할 수 없으며 참고용입니다. 지속적인 어려움이 있다면 전문가와 상담하세요.';

function getInterpretation(score: number) {
  return INTERPRETATIONS.find((i) => score >= i.min && score <= i.max) ?? INTERPRETATIONS[3];
}

export default function GAD7Client() {
  const [phase, setPhase] = useState<'intro' | 'questions' | 'result'>('intro');
  const [answers, setAnswers] = useState<number[]>(Array(7).fill(-1));
  const [currentQ, setCurrentQ] = useState(0);

  const totalScore = answers.reduce((sum, v) => (v >= 0 ? sum + v : sum), 0);
  const interpretation = getInterpretation(totalScore);
  const progressPct = Math.round(((currentQ + 1) / QUESTIONS.length) * 100);

  function handleStart() {
    setPhase('questions');
    window.scrollTo(0, 0);
  }

  function handleSelect(value: number) {
    const next = [...answers];
    next[currentQ] = value;
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
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      window.scrollTo(0, 0);
    } else {
      setPhase('result');
      window.scrollTo(0, 0);
    }
  }

  function handleReset() {
    setAnswers(Array(7).fill(-1));
    setCurrentQ(0);
    setPhase('intro');
    window.scrollTo(0, 0);
  }

  // ── Intro ──
  if (phase === 'intro') {
    return (
      <div className={styles.testContainer}>
        <div className={styles.intro}>
          <div className={styles.introIcon}>
            <Brain size={28} />
          </div>
          <h1 className={styles.introTitle}>불안 자가진단 (GAD-7)</h1>
          <p className={styles.introDesc}>
            최근 2주 동안 아래의 문제들로 인해 얼마나 자주 불편을 겪었는지 응답해 주세요.
          </p>
          <p className={styles.disclaimer}>{DISCLAIMER}</p>
          <button className={styles.startBtn} onClick={handleStart}>
            시작하기
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ── Questions ──
  if (phase === 'questions') {
    const isFirst = currentQ === 0;
    const isLast = currentQ === QUESTIONS.length - 1;
    const answered = answers[currentQ] !== -1;

    return (
      <div className={styles.testContainer}>
        <div className={styles.progressWrap}>
          <div className={styles.progressInfo}>
            <span className={styles.progressLabel}>불안 자가진단 (GAD-7)</span>
            <span className={styles.progressCount}>
              {currentQ + 1} / {QUESTIONS.length}
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
          <p className={styles.questionNumber}>문항 {currentQ + 1}/{QUESTIONS.length}</p>
          <p className={styles.questionText}>{QUESTIONS[currentQ]}</p>
          <div className={styles.options}>
            {OPTIONS.map((opt) => {
              const selected = answers[currentQ] === opt.value;
              const inputId = `gad7-q${currentQ}-opt${opt.value}`;
              return (
                <label
                  key={opt.value}
                  htmlFor={inputId}
                  className={`${styles.option}${selected ? ` ${styles.optionSelected}` : ''}`}
                >
                  <input
                    type="radio"
                    id={inputId}
                    name={`gad7-q${currentQ}`}
                    value={opt.value}
                    checked={selected}
                    onChange={() => handleSelect(opt.value)}
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

  // ── Result ──
  const isSevere = totalScore >= 15;

  return (
    <div className={styles.testContainer}>
      <div className={styles.resultHeader}>
        <h1 className={styles.resultTitle}>검사 결과</h1>
        <p className={styles.resultSubtitle}>불안 자가진단 (GAD-7)</p>
      </div>

      <div className={styles.scoreCard}>
        <p className={styles.scoreNumber}>{totalScore}</p>
        <p className={styles.scoreMax}>/ 21점</p>
        <span className={`${styles.scoreLevel}${isSevere ? ` ${styles.scoreLevelWarning}` : ''}`}>
          {interpretation.level}
        </span>
        <p className={styles.scoreDesc}>{interpretation.desc}</p>
      </div>

      <div className={styles.interpretBox}>
        <p className={styles.interpretTitle}>점수 해석</p>
        {INTERPRETATIONS.map((item) => {
          const isCurrent = totalScore >= item.min && totalScore <= item.max;
          return (
            <div
              key={item.range}
              className={`${styles.interpretItem}${isCurrent ? ` ${styles.interpretCurrent}` : ''}`}
            >
              <span className={styles.interpretRange}>{item.range}</span>
              <span>
                {item.level} ({item.en})
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.contactBox}>
        <p className={styles.contactTitle}>도움이 필요하신가요?</p>
        <div className={styles.contactList}>
          <div className={styles.contactItem}>
            <span className={styles.contactName}>자살예방상담전화</span>
            <span className={styles.contactNumber}>1393</span>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactName}>정신건강위기상담전화</span>
            <span className={styles.contactNumber}>1577-0199</span>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactName}>건강보험공단</span>
            <span className={styles.contactNumber}>129</span>
          </div>
        </div>
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
