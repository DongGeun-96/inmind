import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'empathy';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  active?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  active = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const variantClass = variant === 'empathy' && active ? styles.empathyActive : styles[variant];

  return (
    <button
      className={`${styles.button} ${styles[size]} ${variantClass} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
