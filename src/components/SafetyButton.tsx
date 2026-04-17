'use client';

import { Phone, X } from 'lucide-react';
import { useState } from 'react';
import styles from './SafetyButton.module.css';

const HELPLINES = [
  { name: '자살예방상담전화', number: '1393', desc: '24시간', tel: 'tel:1393' },
  { name: '정신건강위기상담전화', number: '1577-0199', desc: '', tel: 'tel:1577-0199' },
  { name: '보건복지상담센터', number: '129', desc: '', tel: 'tel:129' },
  { name: '생명의전화', number: '1588-9191', desc: '', tel: 'tel:1588-9191' },
];

export default function SafetyButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <p className={styles.panelTitle}>지금 힘드신가요?</p>
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="닫기"
            >
              <X size={18} />
            </button>
          </div>
          <p className={styles.panelDesc}>혼자 견디지 마세요. 전문 상담을 받으실 수 있어요.</p>
          <ul className={styles.phoneList}>
            {HELPLINES.map((h) => (
              <li key={h.number}>
                <a href={h.tel} className={styles.phoneLink}>
                  <Phone size={14} />
                  <span className={styles.phoneName}>{h.name}</span>
                  <span className={styles.phoneNumber}>{h.number}</span>
                  {h.desc && <span className={styles.phoneDesc}>({h.desc})</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        className={styles.fab}
        onClick={() => setOpen(!open)}
        aria-label="위기 상담 전화 목록 열기"
      >
        {open ? <X size={24} color="#fff" /> : <Phone size={24} color="#fff" />}
      </button>
    </div>
  );
}
