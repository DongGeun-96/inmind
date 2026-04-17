'use client';

import Link from 'next/link';
import { PenLine } from 'lucide-react';
import styles from './FloatingWriteButton.module.css';

interface Props {
  href?: string;
  label?: string;
}

export default function FloatingWriteButton({
  href = '/board/write',
  label = '글쓰기',
}: Props) {
  return (
    <Link href={href} className={styles.fab} aria-label={label}>
      <PenLine size={20} />
      <span className={styles.fabLabel}>{label}</span>
    </Link>
  );
}
