import React from 'react';
import { useField } from 'formik';
import styles from './FormFields.module.scss';

interface TextFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

const TextField: React.FC<TextFieldProps> = ({ 
  label, 
  autoComplete = 'off', 
  as = 'input',
  rows = 3,
  ...props 
}) => {
  const [field, meta] = useField(props);
  
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      {as === 'textarea' ? (
        <textarea
          {...field}
          {...props}
          rows={rows}
          className={styles.input}
          readOnly
          onFocus={e => e.target.removeAttribute('readOnly')}
        />
      ) : (
        <input
          {...field}
          {...props}
          autoComplete={autoComplete}
          className={styles.input}
          readOnly
          onFocus={e => e.target.removeAttribute('readOnly')}
        />
      )}
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextField; 