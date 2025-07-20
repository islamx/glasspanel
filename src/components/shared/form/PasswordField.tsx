import React, { useState } from 'react';
import { useField } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './FormFields.module.scss';

interface PasswordFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  autoComplete?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ label, autoComplete = 'off', ...props }) => {
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          {...field}
          {...props}
          type={show ? 'text' : 'password'}
          autoComplete={autoComplete}
          className={`${styles.input} ${styles.inputWithIcon}`}
          readOnly
          onFocus={e => e.target.removeAttribute('readOnly')}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className={styles.iconButton}
          tabIndex={-1}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default PasswordField; 