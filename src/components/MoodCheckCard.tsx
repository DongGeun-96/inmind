'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { MOOD_CONFIG, type MoodType, type MoodEntry } from '@/types/database';
import styles from './MoodCheckCard.module.css';

const MOODS = Object.entries(MOOD_CONFIG) as [MoodType, { emoji: string; label: string }][];

interface Props {
  todayMood: MoodEntry | null;
}

export default function MoodCheckCard({ todayMood: initialMood }: Props) {
  const [todayMood, setTodayMood] = useState(initialMood);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleSubmit = async (mood: MoodType) => {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });

    if (todayMood) {
      const { data } = await supabase
        .from('mood_entries')
        .update({ mood, note: note || null })
        .eq('id', todayMood.id)
        .select()
        .single();
      if (data) setTodayMood(data as MoodEntry);
    } else {
      const { data } = await supabase
        .from('mood_entries')
        .insert({ user_id: user.id, mood, note: note || null, entry_date: today })
        .select()
        .single();
      if (data) setTodayMood(data as MoodEntry);
    }
    setSelectedMood(null);
    setNote('');
    setEditing(false);
    setSaving(false);
  };

  // Already recorded
  if (todayMood && !editing) {
    const config = MOOD_CONFIG[todayMood.mood];
    return (
      <div className={styles.card}>
        <div className={styles.recorded}>
          <span className={styles.recordedEmoji}>{config.emoji}</span>
          <span className={styles.recordedText}>
            오늘의 기분: {config.label}
            {todayMood.note && <span className={styles.recordedNote}> — {todayMood.note}</span>}
          </span>
          <button className={styles.changeBtn} onClick={() => setEditing(true)}>변경</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <p className={styles.question}>오늘 기분은 어떠세요?</p>
      <div className={styles.moods}>
        {MOODS.map(([key, { emoji, label }]) => (
          <button
            key={key}
            className={`${styles.moodBtn} ${selectedMood === key ? styles.moodBtnActive : ''}`}
            onClick={() => setSelectedMood(key)}
            aria-label={label}
          >
            <span className={styles.moodEmoji}>{emoji}</span>
            <span className={styles.moodLabel}>{label}</span>
          </button>
        ))}
      </div>
      {selectedMood && (
        <div className={styles.noteRow}>
          <input
            type="text"
            className={styles.noteInput}
            placeholder="한 줄 메모 (선택)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={200}
          />
          <button
            className={styles.submitBtn}
            onClick={() => handleSubmit(selectedMood)}
            disabled={saving}
          >
            {saving ? '저장 중...' : '기록하기'}
          </button>
        </div>
      )}
    </div>
  );
}
