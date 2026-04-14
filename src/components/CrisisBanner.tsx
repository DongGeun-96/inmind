'use client';

import { Phone, X } from 'lucide-react';
import { useState } from 'react';
import styles from './CrisisBanner.module.css';

export default function CrisisBanner() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.wrapper}>
      {expanded && (
        <div className={styles.expandedBody}>
          <p>지금 힘드신가요? 전문 상담을 받으실 수 있어요.</p>
          <div className={styles.phoneList}>
            <a href="tel:1393" className={styles.phoneLink}>
              <Phone size={14} />
              자살예방상담전화: 1393 (24시간)
            </a>
            <a href="tel:1577-0199" className={styles.phoneLink}>
              <Phone size={14} />
              정신건강위기상담전화: 1577-0199
            </a>
          </div>
        </div>
      )}
      <button onClick={() => setExpanded(!expanded)} className={styles.toggleBtn}>
        <Phone size={16} />
        <span>위기 상담 전화: 1393 | 1577-0199</span>
        {expanded && <X size={16} />}
      </button>
    </div>
  );
}
