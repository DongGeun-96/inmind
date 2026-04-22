'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import styles from './QuickMoodInput.module.css';

const MOODS = [
  { emoji: '😶', label: '멍해요', suffix: '오늘 조금 멍한 하루예요.' },
  { emoji: '😊', label: '좋아요', suffix: '오늘 기분 좋은 일이 있었어요.' },
  { emoji: '😔', label: '우울해요', suffix: '오늘 마음이 좀 무거워요.' },
  { emoji: '😤', label: '화나요', suffix: '오늘 진짜 열받는 일이 있었어요.' },
  { emoji: '😰', label: '불안해요', suffix: '오늘 자꾸 불안한 생각이 들어요.' },
  { emoji: '😪', label: '피곤해요', suffix: '오늘 너무 피곤해요.' },
];

export default function QuickMoodInput() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [mood, setMood] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit() {
    if (!text.trim() && mood === null) {
      setMsg('한 줄 적거나 기분을 골라주세요.');
      return;
    }
    setSubmitting(true);
    setMsg(null);

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    const moodObj = mood !== null ? MOODS[mood] : null;
    const body = text.trim()
      ? (moodObj ? `${moodObj.emoji} ${text.trim()}` : text.trim())
      : (moodObj?.suffix ?? '');
    const title = text.trim()
      ? text.trim().slice(0, 40)
      : `${moodObj?.emoji ?? ''} ${moodObj?.label ?? '오늘 한 줄'}`;

    if (!session) {
      // 로그인 안 되어 있으면 로그인 페이지로 (draft를 로컬에 저장)
      sessionStorage.setItem('draft_mood', JSON.stringify({ title, body }));
      router.push('/auth/login?redirect=/');
      return;
    }

    const res = await fetch('/api/quick-mood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content: body }),
    });

    if (res.ok) {
      const { id } = await res.json();
      setText('');
      setMood(null);
      router.push(`/post/${id}`);
    } else {
      const err = await res.json().catch(() => ({}));
      setMsg(err?.error ?? '등록 실패했어요. 다시 시도해주세요.');
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Sparkles size={16} className={styles.sparkle} />
        <span className={styles.title}>오늘 한 줄, 가볍게 남겨봐요</span>
      </div>

      <div className={styles.moodRow}>
        {MOODS.map((m, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.mood} ${mood === i ? styles.moodActive : ''}`}
            onClick={() => setMood(mood === i ? null : i)}
          >
            <span className={styles.moodEmoji}>{m.emoji}</span>
            <span className={styles.moodLabel}>{m.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          placeholder="지금 떠오르는 한 마디... (익명 등록)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={200}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className={styles.sendBtn}
          aria-label="올리기"
        >
          <Send size={16} />
        </button>
      </div>

      {msg && <p className={styles.msg}>{msg}</p>}
    </div>
  );
}
