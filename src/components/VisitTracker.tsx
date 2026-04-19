'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const DEBOUNCE_MS = 30 * 60 * 1000; // 30분

function getStorageKey(path: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `visit:${path}:${today}`;
}

function shouldTrack(path: string): boolean {
  const key = getStorageKey(path);
  try {
    const last = localStorage.getItem(key);
    if (last && Date.now() - Number(last) < DEBOUNCE_MS) {
      return false;
    }
  } catch {
    // localStorage 접근 불가시 그냥 추적
  }
  return true;
}

function markTracked(path: string): void {
  const key = getStorageKey(path);
  try {
    localStorage.setItem(key, String(Date.now()));
  } catch {
    // 무시
  }
}

export default function VisitTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string>('');

  useEffect(() => {
    if (!pathname || pathname === lastTracked.current) return;
    if (!shouldTrack(pathname)) {
      lastTracked.current = pathname;
      return;
    }

    lastTracked.current = pathname;
    markTracked(pathname);

    fetch('/api/track-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname }),
    }).catch(() => {
      // 추적 실패는 무시
    });
  }, [pathname]);

  return null;
}
