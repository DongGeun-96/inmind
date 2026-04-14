'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import PostItem from '@/components/PostItem';
import type { Post } from '@/types/database';
import styles from './search.module.css';

interface Props {
  query: string;
  posts: Post[];
}

export default function SearchClient({ query, posts }: Props) {
  const router = useRouter();
  const [input, setInput] = useState(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search?q=${encodeURIComponent(input.trim())}`);
  };

  return (
    <div className={styles.page}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="검색어를 입력하세요"
          className={styles.searchInput}
          autoFocus
        />
      </form>

      {query && (
        <p className={styles.resultInfo}>
          <strong>&apos;{query}&apos;</strong> 검색 결과 <strong>{posts.length}</strong>건
        </p>
      )}

      {query && posts.length === 0 && (
        <div className={styles.empty}>
          <p>검색 결과가 없어요</p>
          <p className={styles.emptyHint}>다른 검색어로 시도해보세요</p>
        </div>
      )}

      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className={styles.listItem}>
              <PostItem post={post} showBoard />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
