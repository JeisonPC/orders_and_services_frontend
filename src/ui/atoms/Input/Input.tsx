import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = ({
  error = false,
  className = '',
  ...props
}: InputProps) => {
  const inputClasses = [
    styles.input,
    error && styles.error,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <input className={inputClasses} {...props} />;
};
