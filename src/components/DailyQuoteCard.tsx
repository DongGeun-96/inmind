'use client';

import { useState } from 'react';
import { Heart, Copy, Check } from 'lucide-react';
import type { DailyQuote } from '@/types/database';
import styles from './DailyQuoteCard.module.css';

interface Props {
  quote: DailyQuote;
}

export default function DailyQuoteCard({ quote }: Props) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCopy = async () => {
    const text = quote.author
      ? `"${quote.text}" — ${quote.author}`
      : `"${quote.text}"`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.card}>
      <span className={styles.label}>오늘의 한 마디</span>
      <p className={styles.text}>&ldquo;{quote.text}&rdquo;</p>
      {quote.author && <p className={styles.author}>— {quote.author}</p>}
      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${liked ? styles.liked : ''}`}
          onClick={() => setLiked(!liked)}
          aria-label="좋아요"
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <button
          className={`${styles.actionBtn} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
          aria-label="복사"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied && <span className={styles.toast}>복사됨</span>}
        </button>
      </div>
    </div>
  );
}
