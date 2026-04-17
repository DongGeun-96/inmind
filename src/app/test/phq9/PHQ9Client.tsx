'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  RotateCcw,
  Phone,
  ArrowLeft,
} from 'lucide-react';
import styles from '../test.module.css';

const QUESTIONS = [
  '일 또는 여가 활동을 하는 데 흥미나 즐거움을 느끼지 못함',
  '기분이 가라앉거나, 우울하거나, 희망이 없음',
  '잠들기가 어렵거나 자주 깸, 혹은 너무 많이 잠',
  '피곤하다고 느끼거나 기운이 거의 없음',
  '입맛이 없거나 과식함',
  '자신을 부정적으로 봄 — 자신이 실패자이거나 가족을 실망시켰다고 느낌',
  '신문을 읽거나 TV 보는 것과 같은 일상적인 일에 집중하기 어려움',
  '다른 사람들이 눈치챌 정도로 평소보다 말과 행동이 느림 — 또는 반대로 너무 안절부절못하거나 들떠 있음',
  '차라리 죽는 것이 낫겠다고 생각하거나 어떤 식으로든 자신을 해치는 것에 대한 생각',
];

const OPTIONS = [
  { label: '전혀 없음', value: 0 },
  { label: '며칠 동안', value: 1 },
  { label: '일주일 이상', value: 2 },
  { label: '거의 매일', value: 3 },
];

interface ScoreLevel {
  label: string;
  desc: string;
  warning: boolean;
}

function getScoreLevel(score: number): ScoreLevel {
  if (score <= 4) {
    return {
      label: '최소 우울',
      desc: '현재 우울 증상이 거의 없습니다. 건강한 마음 상태를 유지하고 계시네요.',
      warning: false,
    };
  }
  if (score <= 9) {
    return {
      label: '경도 우울',
      desc: '가벼운 우울 증상이 있습니다. 충분한 휴식과 자기 돌봄을 통해 회복할 수 있어요.',
      warning: false,
    };
  }
  if (score <= 14) {
    return {
      label: '중등도 우울',
      desc: '중간 수준의 우울 증상이 있습니다. 전문가 상담을 고려해 보시는 것이 좋겠어요.',
      warning: true,
    };
  }
  if (score <= 19) {
    return {
      label: '중등고도 우울',
      desc: '상당한 수준의 우울 증상이 있습니다. 전문가의 도움을 받으시길 권합니다.',
      warning: true,
    };
  }
  return {
    label: '고도 우울',
    desc: '심한 우울 증상이 있습니다. 가능한 빨리 전문가와 상담하시길 강력히 권합니다.',
    warning: true,
  };
}

const DISCLAIMER =
  '이 자가진단은 전문적인 의학 진단을 대체할 수 없으며 참고용입니다. 지속적인 어려움이 있다면 전문가와 상담하세요.';

export default function PHQ9Client() {
  const [phase, setPhase] = useState<'intro' | 'questions' | 'result'>('intro');
  const [answers, setAnswers] = useState<number[]>(Array(9).fill(-1));
  const [currentQ, setCurrentQ] = useState(0);

  const totalScore = answers.reduce((sum, v) => sum + (v >= 0 ? v : 0), 0);
  const scoreLevel = getScoreLevel(totalScore);
  const crisisTriggered = answers[8] > 0;

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
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      window.scrollTo(0, 0);
    } else {
      setPhase('result');
      window.scrollTo(0, 0);
    }
  }

  function handleReset() {
    setAnswers(Array(9).fill(-1));
    setCurrentQ(0);
    setPhase('intro');
    window.scrollTo(0, 0);
  }

  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;
  const answeredAll = answers.every((a) => a >= 0);

  // ── Intro ─────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className={styles.testContainer}>
        <div className={styles.intro}>
          <div className={styles.introIcon}>
            <ClipboardCheck size={26} />
          </div>
          <h1 className={styles.introTitle}>우울증 자가진단 (PHQ-9)</h1>
          <p className={styles.introDesc}>
            최근 2주 동안 아래에 나열된 문제들로 인해 얼마나 자주 방해를 받았는지 답해 주세요.
            9개의 문항으로 구성되어 있으며 약 3분이 소요됩니다.
          </p>
          <div className={styles.disclaimer}>{DISCLAIMER}</div>
          <button className={styles.startBtn} onClick={handleStart}>
            시작하기 <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // ── Questions ──────────────────────────────────────────────────────────
  if (phase === 'questions') {
    return (
      <div className={styles.testContainer}>
        {/* Progress */}
        <div className={styles.progressWrap}>
          <div className={styles.progressInfo}>
            <span className={styles.progressLabel}>PHQ-9 우울증 자가진단</span>
            <span className={styles.progressCount}>
              {currentQ + 1} / {QUESTIONS.length}
            </span>
          </div>
          <div
            className={styles.progressBar}
            role="progressbar"
            aria-valuenow={currentQ + 1}
            aria-valuemin={1}
            aria-valuemax={QUESTIONS.length}
          >
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question card */}
        <div className={styles.questionCard}>
          <p className={styles.questionNumber}>문항 {currentQ + 1}</p>
          <p className={styles.questionText}>{QUESTIONS[currentQ]}</p>
          <div className={styles.options} role="radiogroup" aria-label={`문항 ${currentQ + 1}`}>
            {OPTIONS.map((opt) => {
              const selected = answers[currentQ] === opt.value;
              const inputId = `q${currentQ}-opt${opt.value}`;
              return (
                <label
                  key={opt.value}
                  htmlFor={inputId}
                  className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
                >
                  <input
                    type="radio"
                    id={inputId}
                    name={`question-${currentQ}`}
                    value={opt.value}
                    checked={selected}
                    onChange={() => handleSelect(opt.value)}
                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                  />
                  <span className={styles.optionRadio} aria-hidden="true" />
                  {opt.label}
                </label>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.navButtons}>
          {currentQ > 0 ? (
            <button className={`${styles.navBtn} ${styles.navBtnPrev}`} onClick={handlePrev}>
              <ChevronLeft size={16} />
              이전
            </button>
          ) : (
            <Link href="/test" className={`${styles.navBtn} ${styles.navBtnPrev}`}>
              <ArrowLeft size={16} />
              목록
            </Link>
          )}
          <button
            className={`${styles.navBtn} ${styles.navBtnNext}`}
            onClick={handleNext}
            disabled={answers[currentQ] < 0}
          >
            {currentQ < QUESTIONS.length - 1 ? (
              <>
                다음 <ChevronRight size={16} />
              </>
            ) : (
              <>
                결과 보기 <ChevronRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // ── Result ─────────────────────────────────────────────────────────────
  return (
    <div className={styles.testContainer}>
      <div className={styles.resultHeader}>
        <h1 className={styles.resultTitle}>PHQ-9 결과</h1>
        <p className={styles.resultSubtitle}>최근 2주간 당신의 마음 상태입니다</p>
      </div>

      {/* Score card */}
      <div className={styles.scoreCard}>
        <div className={styles.scoreNumber}>{totalScore}</div>
        <div className={styles.scoreMax}>/ 27점</div>
        <span
          className={`${styles.scoreLevel} ${scoreLevel.warning ? styles.scoreLevelWarning : ''}`}
        >
          {scoreLevel.label}
        </span>
        <p className={styles.scoreDesc}>{scoreLevel.desc}</p>
      </div>

      {/* Crisis warning */}
      {crisisTriggered && (
        <div className={styles.crisisWarning}>
          <div className={styles.crisisWarningTitle}>
            <AlertTriangle size={18} />
            자해·자살 생각이 감지되었습니다
          </div>
          <p className={styles.crisisWarningText}>
            지금 많이 힘드신가요? 혼자 감당하지 않아도 됩니다. 아래 번호로 연락하면 전문
            상담사가 24시간 도움을 드립니다.
          </p>
          <div className={styles.crisisPhone}>
            <Phone size={20} />
            <span>
              <span className={styles.crisisPhoneLabel}>자살예방상담전화</span>
              <br />
              1393
            </span>
          </div>
        </div>
      )}

      {/* Score interpretation */}
      <div className={styles.interpretBox}>
        <p className={styles.interpretTitle}>점수 해석</p>
        {[
          { range: '0 – 4점', label: '최소 우울', current: totalScore <= 4 },
          { range: '5 – 9점', label: '경도 우울', current: totalScore >= 5 && totalScore <= 9 },
          {
            range: '10 – 14점',
            label: '중등도 우울',
            current: totalScore >= 10 && totalScore <= 14,
          },
          {
            range: '15 – 19점',
            label: '중등고도 우울',
            current: totalScore >= 15 && totalScore <= 19,
          },
          { range: '20 – 27점', label: '고도 우울', current: totalScore >= 20 },
        ].map((item) => (
          <div
            key={item.range}
            className={`${styles.interpretItem} ${item.current ? styles.interpretCurrent : ''}`}
          >
            <span className={styles.interpretRange}>{item.range}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Contact info */}
      <div className={styles.contactBox}>
        <p className={styles.contactTitle}>도움이 필요하다면 연락하세요</p>
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

      {/* Disclaimer */}
      <div className={styles.disclaimer}>{DISCLAIMER}</div>

      {/* Actions */}
      <div className={styles.resultActions}>
        <button className={`${styles.resultBtn} ${styles.resultBtnPrimary}`} onClick={handleReset}>
          <RotateCcw size={15} />
          다시 하기
        </button>
        <Link href="/test" className={`${styles.resultBtn} ${styles.resultBtnSecondary}`}>
          <ArrowLeft size={15} />
          목록으로
        </Link>
      </div>
    </div>
  );
}
