'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PenLine, UserPlus, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import PostItem from '@/components/PostItem';
import Sidebar from '@/components/Sidebar';
import { BOARD_CONFIG, CATEGORIES, type BoardType, type Post } from '@/types/database';
import type { BoardMeta } from '@/data/board-meta';
import styles from './board.module.css';

interface Props {
  boardType: BoardType;
  config: { label: string; category: string; description: string; adminOnly?: boolean };
  meta: BoardMeta | null;
  notices: Post[];
  posts: Post[];
  currentPage: number;
  totalPages: number;
  isLoggedIn: boolean;
  isAdmin?: boolean;
  isAllView?: boolean;
}

export default function BoardClient({ boardType, config, meta, notices, posts, currentPage, totalPages, isLoggedIn, isAdmin = false, isAllView = false }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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

        {!isAllView && meta && currentPage === 1 && (
          <p className={styles.intro}>{meta.intro}</p>
        )}

        {notices.length > 0 && (
          <ul className={styles.noticeList}>
            {notices.map((post) => (
              <li key={post.id} className={styles.noticeItem}>
                <PostItem post={post} />
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
                <PostItem post={post} showBoard={isAllView} showPreview />
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

        {!isAllView && meta && currentPage === 1 && (
          <>
            {meta.faqs.length > 0 && (
              <section className={styles.faqSection} aria-labelledby="board-faq-heading">
                <h2 id="board-faq-heading" className={styles.faqHeading}>
                  자주 묻는 질문
                </h2>
                <div className={styles.faqList}>
                  {meta.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className={styles.faqItem}>
                        <button
                          type="button"
                          className={styles.faqQuestion}
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                        >
                          <span>Q. {faq.q}</span>
                          <ChevronDown
                            size={16}
                            style={{ transform: isOpen ? 'rotate(180deg)' : undefined, transition: 'transform 0.15s' }}
                          />
                        </button>
                        {isOpen && <div className={styles.faqAnswer}>{faq.a}</div>}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {meta.related.length > 0 && (
              <section className={styles.relatedSection} aria-labelledby="board-related-heading">
                <h2 id="board-related-heading" className={styles.relatedHeading}>
                  함께 보면 좋은 콘텐츠
                </h2>
                <div className={styles.relatedList}>
                  {meta.related.map((link) => (
                    <Link key={link.href} href={link.href} className={styles.relatedLink}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <Sidebar />
    </div>
  );
}
