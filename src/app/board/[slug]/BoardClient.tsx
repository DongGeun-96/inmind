'use client';

import Link from 'next/link';
import { PenLine, UserPlus } from 'lucide-react';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import PostItem from '@/components/PostItem';
import Sidebar from '@/components/Sidebar';
import { BOARD_CONFIG, CATEGORIES, type BoardType, type Post } from '@/types/database';
import styles from './board.module.css';

interface Props {
  boardType: BoardType;
  config: { label: string; category: string; description: string; adminOnly?: boolean };
  notices: Post[];
  posts: Post[];
  currentPage: number;
  totalPages: number;
  isLoggedIn: boolean;
  isAdmin?: boolean;
  isAllView?: boolean;
}

export default function BoardClient({ boardType, config, notices, posts, currentPage, totalPages, isLoggedIn, isAdmin = false, isAllView = false }: Props) {
  // 현재 게시판이 속한 카테고리의 게시판들 찾기
  const category = CATEGORIES.find((cat) => cat.boards.includes(boardType));
  const siblingBoards = category?.boards || [boardType];

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>{category?.name || config.label}</h1>
          {boardType === 'professional' && (
            <Link href="/expert-inquiry">
              <Button size="sm" variant="secondary">
                <UserPlus size={14} /> 전문가 등록 문의
              </Button>
            </Link>
          )}
        </div>

        {siblingBoards.length > 1 && (
          <div className={styles.tabs}>
            <Link
              href={`/board/${siblingBoards[0]}?view=all`}
              className={`${styles.tab} ${isAllView ? styles.tabActive : ''}`}
            >
              전체
            </Link>
            {siblingBoards.map((board) => (
              <Link
                key={board}
                href={`/board/${board}`}
                className={`${styles.tab} ${!isAllView && board === boardType ? styles.tabActive : ''}`}
              >
                {BOARD_CONFIG[board].label}
              </Link>
            ))}
          </div>
        )}

        {notices.length > 0 && (
          <ul className={styles.noticeList}>
            {notices.map((post) => (
              <li key={post.id} className={styles.noticeItem}>
                <PostItem post={post} variant="list" />
              </li>
            ))}
          </ul>
        )}

        {posts.length === 0 && notices.length === 0 ? (
          <div className={styles.empty}>
            <p>아직 게시글이 없어요</p>
          </div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id} className={styles.listItem}>
                <PostItem post={post} showBoard={isAllView} variant="list" />
              </li>
            ))}
          </ul>
        )}

        {(!config.adminOnly || isAdmin) && (
          <div className={styles.writeBtn}>
            {isLoggedIn ? (
              <Link href={`/board/write?type=${boardType}`}>
                <Button size="sm">
                  <PenLine size={14} /> 글쓰기
                </Button>
              </Link>
            ) : (
              <Link href="/auth/login">
                <Button size="sm" variant="secondary">
                  <PenLine size={14} /> 글쓰기
                </Button>
              </Link>
            )}
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/board/${boardType}`} />
      </div>

      <Sidebar />
    </div>
  );
}
