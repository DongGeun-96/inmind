'use client';

import { useState } from 'react';
import { Share2, Link2, MessageCircle, Check } from 'lucide-react';
import styles from './test.module.css';

interface ShareButtonsProps {
  title: string;
  result: string;
  tagline?: string;
}

/**
 * Discord-safe, client-only share buttons.
 * - 네이티브 공유(navigator.share) 우선
 * - Twitter/X, 카카오톡(URL-scheme 없이 클립보드 복사 안내)
 * - URL 복사
 */
export default function ShareButtons({ title, result, tagline }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareText = `[${title}] 내 결과는 "${result}"${tagline ? ` — ${tagline}` : ''}`;

  function currentUrl() {
    if (typeof window === 'undefined') return 'https://in-mind.dev/test';
    // 결과 페이지 URL이 같은 경로이므로 현재 URL 사용
    return window.location.origin + window.location.pathname;
  }

  async function handleNative() {
    const url = currentUrl();
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title, text: shareText, url });
        return;
      } catch {
        // 사용자 취소 등은 무시
      }
    }
    handleCopy();
  }

  async function handleCopy() {
    const url = currentUrl();
    const payload = `${shareText}\n${url}`;
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = payload;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  function handleTwitter() {
    const url = currentUrl();
    const u = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    window.open(u, '_blank', 'noopener,noreferrer');
  }

  function handleFacebook() {
    const url = currentUrl();
    const u = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(u, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className={styles.shareBox}>
      <p className={styles.shareTitle}>🎁 친구한테 공유하기</p>
      <div className={styles.shareButtons}>
        <button type="button" className={styles.shareBtn} onClick={handleNative}>
          <Share2 size={16} />
          공유
        </button>
        <button type="button" className={styles.shareBtn} onClick={handleTwitter}>
          <MessageCircle size={16} />
          X (Twitter)
        </button>
        <button type="button" className={styles.shareBtn} onClick={handleFacebook}>
          <MessageCircle size={16} />
          페이스북
        </button>
        <button type="button" className={styles.shareBtn} onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Link2 size={16} />}
          {copied ? '복사됨!' : '링크 복사'}
        </button>
      </div>
    </div>
  );
}
