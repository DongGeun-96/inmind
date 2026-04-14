import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  onIconRightClick?: () => void;
  error?: string;
}

export function Input({
  label,
  icon,
  iconRight,
  onIconRightClick,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.wrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          className={`${styles.input} ${icon ? styles.hasIcon : ''} ${className}`}
          {...props}
        />
        {iconRight && (
          <button type="button" className={styles.iconRight} onClick={onIconRightClick}>
            {iconRight}
          </button>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <textarea className={`${styles.textarea} ${className}`} {...props} />
    </div>
  );
}
