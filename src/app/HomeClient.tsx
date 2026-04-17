'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ClipboardCheck, HelpCircle } from 'lucide-react';
import PostItem from '@/components/PostItem';
import Sidebar from '@/components/Sidebar';
import DailyQuoteCard from '@/components/DailyQuoteCard';
import MoodCheckCard from '@/components/MoodCheckCard';
import type { Post, DailyQuote, MoodEntry } from '@/types/database';
import styles from './home.module.css';

interface HomeClientProps {
  allPosts: Post[];
  popularPosts: Post[];
  todayQuote: DailyQuote | null;
  todayMood: MoodEntry | null;
  isLoggedIn: boolean;
}

export default function HomeClient({ allPosts, popularPosts, todayQuote, todayMood, isLoggedIn }: HomeClientProps) {
  const [tab, setTab] = useState<'all' | 'popular'>('all');
  const posts = tab === 'all' ? allPosts : popularPosts;

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        {todayQuote && <DailyQuoteCard quote={todayQuote} />}
        {isLoggedIn && <MoodCheckCard todayMood={todayMood} />}

        <div className={styles.quickLinks}>
          <Link href="/test" className={styles.quickLink}>
            <ClipboardCheck size={18} />
            <span>자가진단</span>
          </Link>
          <Link href="/help" className={styles.quickLink}>
            <HelpCircle size={18} />
            <span>도움말 모음</span>
          </Link>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'all' ? styles.tabActive : ''}`}
            onClick={() => setTab('all')}
          >
            전체글
          </button>
          <button
            className={`${styles.tab} ${tab === 'popular' ? styles.tabActive : ''}`}
            onClick={() => setTab('popular')}
          >
            인기공감
          </button>
        </div>
        {posts.length === 0 ? (
          <p className={styles.empty}>아직 게시글이 없어요</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id} className={styles.listItem}>
                <PostItem post={post} showBoard />
              </li>
            ))}
          </ul>
        )}
      </div>

      <Sidebar />
    </div>
  );
}
