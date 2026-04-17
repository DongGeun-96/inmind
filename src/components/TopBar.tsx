'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import type { User } from '@supabase/supabase-js';
import styles from './TopBar.module.css';

export default function TopBar() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) fetchUnreadCount(data.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchUnreadCount(session.user.id);
      else setUnreadCount(0);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchUnreadCount = async (userId: string) => {
    const { count } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    setUnreadCount(count || 0);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUnreadCount(0);
    window.location.href = '/';
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.inner}>
        <span className={styles.desc}>인마인드 - 공감, 위로, 힐링, 상담, 마음건강 종합 커뮤니티</span>
        <div className={styles.auth}>
        {!mounted ? (
          <>
            <Link href="/auth/login" className={styles.link}>로그인</Link>
            <span className={styles.divider}>|</span>
            <Link href="/auth/signup" className={styles.link}>회원가입</Link>
          </>
        ) : user ? (
          <>
            <Link href="/notifications" className={styles.bellLink}>
              <Bell size={15} />
              {unreadCount > 0 && (
                <span className={styles.bellBadge}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>
            <span className={styles.divider}>|</span>
            <Link href="/mypage" className={styles.link}>마이페이지</Link>
            <span className={styles.divider}>|</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>로그아웃</button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className={styles.link}>로그인</Link>
            <span className={styles.divider}>|</span>
            <Link href="/auth/signup" className={styles.link}>회원가입</Link>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
