'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, RotateCcw, ArrowLeft } from 'lucide-react';
import styles from './test.module.css';

export interface TestOption {
  label: string;
  value: number;
}

export interface TestInterpretation {
  range: string;
  level: string;
  desc: string;
  min: number;
  max: number;
  warning?: boolean;
}

export interface TestRunnerProps {
  testId: string;
  title: string;
  subtitle?: string;
  introDesc: string;
  icon: ReactNode;
  questions: string[];
  /** 역채점이 필요한 문항 인덱스 (0-base). options[value].value가 0~max일 때 (max - v) 로 뒤집음 */
  reverseIndices?: number[];
  /** max option value (역채점 계산용). 생략 시 options에서 자동 계산 */
  maxOptionValue?: number;
  options: TestOption[];
  interpretations: TestInterpretation[];
  maxScore: number;
  /** 위기 배너 표시 조건 (옵션) */
  crisisCheck?: (answers: number[]) => boolean;
  /** 결과 하단 추가 문구 */
  extraFooter?: ReactNode;
}

const DISCLAIMER =
  '이 자가진단은 전문적인 의학 진단을 대체할 수 없으며 참고용입니다. 지속적인 어려움이 있다면 전문가와 상담하세요.';

export default function TestRunner({
  testId,
  title,
  subtitle,
  introDesc,
  icon,
  questions,
  reverseIndices = [],
  maxOptionValue,
  options,
  interpretations,
  maxScore,
  crisisCheck,
  extraFooter,
}: TestRunnerProps) {
  const [phase, setPhase] = useState<'intro' | 'questions' | 'result'>('intro');
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [currentQ, setCurrentQ] = useState(0);

  const optMax =
    typeof maxOptionValue === 'number'
      ? maxOptionValue
      : Math.max(...options.map((o) => o.value));

  const totalScore = answers.reduce((sum, v, idx) => {
    if (v < 0) return sum;
    if (reverseIndices.includes(idx)) {
      return sum + (optMax - v);
    }
    return sum + v;
  }, 0);

  const interpretation =
    interpretations.find((i) => totalScore >= i.min && totalScore <= i.max) ??
    interpretations[interpretations.length - 1];

  const progressPct = Math.round(((currentQ + 1) / questions.length) * 100);
  const crisisTriggered = crisisCheck ? crisisCheck(answers) : false;

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

  // Intro
  if (phase === 'intro') {
    return (
      <div className={styles.testContainer}>
        <div className={styles.intro}>
          <div className={styles.introIcon}>{icon}</div>
          <h1 className={styles.introTitle}>{title}</h1>
          {subtitle && <p className={styles.introDesc}>{subtitle}</p>}
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
          <p className={styles.questionText}>{questions[currentQ]}</p>
          <div className={styles.options}>
            {options.map((opt) => {
              const selected = answers[currentQ] === opt.value;
              const inputId = `${testId}-q${currentQ}-opt${opt.value}`;
              return (
                <label
                  key={opt.value}
                  htmlFor={inputId}
                  className={`${styles.option}${selected ? ` ${styles.optionSelected}` : ''}`}
                >
                  <input
                    type="radio"
                    id={inputId}
                    name={`${testId}-q${currentQ}`}
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

  // Result
  const isWarning = interpretation.warning === true;

  return (
    <div className={styles.testContainer}>
      <div className={styles.resultHeader}>
        <h1 className={styles.resultTitle}>검사 결과</h1>
        <p className={styles.resultSubtitle}>{title}</p>
      </div>

      <div className={styles.scoreCard}>
        <p className={styles.scoreNumber}>{totalScore}</p>
        <p className={styles.scoreMax}>/ {maxScore}점</p>
        <span className={`${styles.scoreLevel}${isWarning ? ` ${styles.scoreLevelWarning}` : ''}`}>
          {interpretation.level}
        </span>
        <p className={styles.scoreDesc}>{interpretation.desc}</p>
      </div>

      {crisisTriggered && (
        <div className={styles.crisisWarning}>
          <div className={styles.crisisWarningTitle}>도움을 받을 수 있어요</div>
          <p className={styles.crisisWarningText}>
            지금 많이 힘드신가요? 혼자 감당하지 않아도 됩니다. 아래 번호로 연락하시면 전문 상담사가
            24시간 도움을 드립니다.
          </p>
          <div className={styles.crisisPhone}>
            <span className={styles.crisisPhoneLabel}>자살예방상담전화</span>
            <span>1393</span>
          </div>
        </div>
      )}

      <div className={styles.interpretBox}>
        <p className={styles.interpretTitle}>점수 해석</p>
        {interpretations.map((item) => {
          const isCurrent = totalScore >= item.min && totalScore <= item.max;
          return (
            <div
              key={item.range}
              className={`${styles.interpretItem}${isCurrent ? ` ${styles.interpretCurrent}` : ''}`}
            >
              <span className={styles.interpretRange}>{item.range}</span>
              <span>{item.level}</span>
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
      {extraFooter}

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
