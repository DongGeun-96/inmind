'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import Button from '@/components/ui/Button';
import type { DiaryEntry } from '@/types/database';
import styles from './diary.module.css';

interface Props {
  todayEntry: DiaryEntry | null;
  entries: DiaryEntry[];
}

export default function DiaryClient({ todayEntry: initialToday, entries: initialEntries }: Props) {
  const router = useRouter();
  const [todayEntry, setTodayEntry] = useState(initialToday);
  const [entries, setEntries] = useState(initialEntries);
  const [emotion, setEmotion] = useState(initialToday?.emotion || '');
  const [reason, setReason] = useState(initialToday?.reason || '');
  const [messageToSelf, setMessageToSelf] = useState(initialToday?.message_to_self || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSave = async () => {
    if (!emotion.trim()) {
      setMessage('감정 한 단어를 입력해주세요');
      return;
    }
    setSaving(true);
    setMessage('');

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });
    const payload = {
      emotion: emotion.trim(),
      reason: reason.trim() || null,
      message_to_self: messageToSelf.trim() || null,
    };

    if (todayEntry) {
      const { data, error } = await supabase
        .from('diary_entries')
        .update(payload)
        .eq('id', todayEntry.id)
        .select()
        .single();
      if (error) {
        setMessage('저장에 실패했어요');
      } else if (data) {
        setTodayEntry(data as DiaryEntry);
        setEntries((prev) => prev.map((e) => (e.id === data.id ? (data as DiaryEntry) : e)));
        setMessage('수정되었어요');
      }
    } else {
      const { data, error } = await supabase
        .from('diary_entries')
        .insert({ user_id: user.id, entry_date: today, ...payload })
        .select()
        .single();
      if (error) {
        setMessage('저장에 실패했어요');
      } else if (data) {
        setTodayEntry(data as DiaryEntry);
        setEntries((prev) => [data as DiaryEntry, ...prev]);
        setMessage('오늘의 일기가 저장되었어요');
      }
    }
    setSaving(false);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return `${d.getMonth() + 1}월 ${d.getDate()}일`;
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
        <h1 className={styles.pageTitle}>감정 일기</h1>
      </div>

      {/* Guide */}
      <div className={styles.guide}>
        <BookOpen size={16} />
        <p>오늘 감정 한 단어 / 왜 그런 감정이 들었는지 / 나에게 해주고 싶은 말</p>
      </div>

      {/* Today form */}
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>
          {todayEntry ? '오늘의 일기 수정하기' : '오늘의 일기 쓰기'}
        </h2>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>오늘의 감정 한 단어</label>
          <input
            type="text"
            className={styles.input}
            placeholder="예: 설렘, 지침, 평온..."
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            maxLength={20}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>왜 그런 감정이 들었나요?</label>
          <textarea
            className={styles.textarea}
            placeholder="자유롭게 적어보세요"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={500}
            rows={3}
          />
          <span className={styles.charCount}>{reason.length}/500</span>
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>나에게 해주고 싶은 말</label>
          <textarea
            className={styles.textarea}
            placeholder="오늘 하루 수고한 나에게..."
            value={messageToSelf}
            onChange={(e) => setMessageToSelf(e.target.value)}
            maxLength={500}
            rows={3}
          />
          <span className={styles.charCount}>{messageToSelf.length}/500</span>
        </div>
        <Button onClick={handleSave} disabled={saving} fullWidth>
          {saving ? '저장 중...' : todayEntry ? '수정하기' : '일기 저장하기'}
        </Button>
        {message && <p className={styles.message}>{message}</p>}
      </div>

      {/* Past entries */}
      {entries.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>지난 일기</h2>
          <ul className={styles.entryList}>
            {entries.map((entry) => (
              <li key={entry.id} className={styles.entryItem}>
                <button
                  className={styles.entryHeader}
                  onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                >
                  <div className={styles.entryDate}>
                    <span className={styles.entryDateMain}>{formatDate(entry.entry_date)}</span>
                    <span className={styles.entryDay}>({getDayOfWeek(entry.entry_date)})</span>
                  </div>
                  <span className={styles.entryEmotion}>{entry.emotion}</span>
                  {expandedId === entry.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedId === entry.id && (
                  <div className={styles.entryBody}>
                    {entry.reason && (
                      <div className={styles.entryField}>
                        <span className={styles.entryFieldLabel}>이유</span>
                        <p>{entry.reason}</p>
                      </div>
                    )}
                    {entry.message_to_self && (
                      <div className={styles.entryField}>
                        <span className={styles.entryFieldLabel}>나에게 하는 말</span>
                        <p>{entry.message_to_self}</p>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
