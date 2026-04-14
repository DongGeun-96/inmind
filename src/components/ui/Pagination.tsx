'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const router = useRouter();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => Math.abs(p - currentPage) <= 2);

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage <= 1}
        onClick={() => router.push(`${baseUrl}?page=${currentPage - 1}`)}
        className={styles.arrow}
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => router.push(`${baseUrl}?page=${p}`)}
          className={p === currentPage ? styles.active : styles.page}
        >
          {p}
        </button>
      ))}

      <button
        disabled={currentPage >= totalPages}
        onClick={() => router.push(`${baseUrl}?page=${currentPage + 1}`)}
        className={styles.arrow}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
