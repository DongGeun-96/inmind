'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bell, Heart, MessageCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { timeAgo } from '@/lib/format';
import styles from './notifications.module.css';

interface Notification {
  id: string;
  type: 'comment' | 'empathy';
  message: string;
  post_id: string;
  is_read: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (data) {
        setNotifications(data);

        // Mark all unread as read
        const unreadIds = data.filter((n) => !n.is_read).map((n) => n.id);
        if (unreadIds.length > 0) {
          await supabase
            .from('notifications')
            .update({ is_read: true })
            .in('id', unreadIds);
        }
      }

      setLoading(false);
    };

    load();
  }, []);

  const getIcon = (type: string) => {
    if (type === 'comment') return <MessageCircle size={16} />;
    return <Heart size={16} />;
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <p className={styles.loading}>불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button onClick={() => router.back()} className={styles.backBtn}>
        <ArrowLeft size={16} /> 뒤로가기
      </button>

      <h1 className={styles.title}>
        <Bell size={20} /> 알림
      </h1>

      {notifications.length === 0 ? (
        <div className={styles.empty}>
          <Bell size={32} />
          <p>아직 알림이 없어요</p>
        </div>
      ) : (
        <div className={styles.list}>
          {notifications.map((noti) => (
            <Link
              key={noti.id}
              href={`/post/${noti.post_id}`}
              className={`${styles.item} ${!noti.is_read ? styles.itemUnread : ''}`}
            >
              <span className={`${styles.iconWrap} ${noti.type === 'empathy' ? styles.iconEmpathy : styles.iconComment}`}>
                {getIcon(noti.type)}
              </span>
              <div className={styles.itemBody}>
                <p className={styles.itemMessage}>{noti.message}</p>
                <span className={styles.itemTime}>{timeAgo(noti.created_at)}</span>
              </div>
              {!noti.is_read && <span className={styles.unreadDot} />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
