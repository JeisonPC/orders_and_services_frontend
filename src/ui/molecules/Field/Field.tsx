import { InputHTMLAttributes } from 'react';
import { Label } from '@/ui/atoms/Label';
import { Input } from '@/ui/atoms/Input';
import styles from './Field.module.css';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Field = ({
  label,
  error,
  helperText,
  required,
  disabled,
  id,
  ...inputProps
}: FieldProps) => {
  const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={styles.field}>
      <Label htmlFor={fieldId} required={required} disabled={disabled}>
        {label}
      </Label>
      <Input
        id={fieldId}
        error={!!error}
        disabled={disabled}
        required={required}
        {...inputProps}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
      {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
};
