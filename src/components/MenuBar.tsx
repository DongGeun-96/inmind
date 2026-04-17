'use client';

import Link from 'next/link';
import type { BoardType } from '@/types/database';
import styles from './MenuBar.module.css';

interface Props {
  categories: { name: string; boards: BoardType[] }[];
}

export default function MenuBar({ categories }: Props) {
  return (
    <div className={styles.menuBar}>
      <div className={styles.inner}>
        <Link href="/test" className={styles.menuLink}>
          자가진단
        </Link>
        {categories.map((cat) => (
          <Link key={cat.name} href={cat.boards.length > 1 ? `/board/${cat.boards[0]}?view=all` : `/board/${cat.boards[0]}`} className={styles.menuLink}>
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
