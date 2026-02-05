import { LabelHTMLAttributes, ReactNode } from 'react';
import styles from './Label.module.css';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export const Label = ({
  children,
  required = false,
  disabled = false,
  className = '',
  ...props
}: LabelProps) => {
  const labelClasses = [
    styles.label,
    required && styles.required,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={labelClasses} {...props}>
      {children}
    </label>
  );
};
