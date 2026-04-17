'use client';

import { useState } from 'react';
import PostItem from '@/components/PostItem';
import Sidebar from '@/components/Sidebar';
import FloatingWriteButton from '@/components/FloatingWriteButton';
import HomeBanners from '@/components/HomeBanners';
import type { Post } from '@/types/database';
import styles from './home.module.css';

interface HomeClientProps {
  allPosts: Post[];
  popularPosts: Post[];
}

export default function HomeClient({ allPosts, popularPosts }: HomeClientProps) {
  const [tab, setTab] = useState<'all' | 'popular'>('all');
  const posts = tab === 'all' ? allPosts : popularPosts;

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <HomeBanners />
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
          <ul className={styles.cardList}>
            {posts.map((post) => (
              <li key={post.id} className={styles.listItem}>
                <PostItem post={post} showBoard />
              </li>
            ))}
          </ul>
        )}
      </div>

      <Sidebar />
      <FloatingWriteButton href="/board/write" />
    </div>
  );
}
