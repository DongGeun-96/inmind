import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
  centered?: boolean;
  children: ReactNode;
}

export default function Card({
  padded = false,
  centered = false,
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`${styles.card} ${padded ? styles.padded : ''} ${centered ? styles.centered : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
