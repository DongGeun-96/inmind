import { ReactNode } from 'react';
import styles from './Alert.module.css';

interface AlertProps {
  variant?: 'error' | 'info';
  children: ReactNode;
}

export default function Alert({ variant = 'error', children }: AlertProps) {
  return <div className={`${styles.alert} ${styles[variant]}`}>{children}</div>;
}
