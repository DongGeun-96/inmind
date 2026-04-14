import { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children?: ReactNode;
}

export default function Checkbox({ children, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`${styles.label} ${className}`}>
      <input type="checkbox" className={styles.checkbox} {...props} />
      {children}
    </label>
  );
}
