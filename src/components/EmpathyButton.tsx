'use client';

import { Heart } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './EmpathyButton.module.css';

interface EmpathyButtonProps {
  count: number;
  active: boolean;
  loading: boolean;
  onClick: () => void;
}

export default function EmpathyButton({ count, active, loading, onClick }: EmpathyButtonProps) {
  return (
    <div className={styles.wrapper}>
      <Button variant="empathy" active={active} disabled={loading} onClick={onClick}>
        <Heart size={18} fill={active ? 'currentColor' : 'none'} />
        공감 {count}
      </Button>
    </div>
  );
}
