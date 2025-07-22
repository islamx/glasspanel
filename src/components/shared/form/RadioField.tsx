import React from 'react';
import { useField } from 'formik';
import styles from './FormFields.module.scss';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioFieldProps {
  label: string;
  name: string;
  options: RadioOption[];
}

const RadioField: React.FC<RadioFieldProps> = ({ label, name, options }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <div className={styles.radioGroup}>
        {options.map((option) => (
          <label key={option.value} className={styles.radioOption}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={field.value === option.value}
              onChange={(e) => helpers.setValue(e.target.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default RadioField; 