import React from 'react';
import { useField } from 'formik';
import styles from './FormFields.module.scss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options, placeholder, ...props }) => {
  const [field, meta] = useField(props);



  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <select
        {...field}
        {...props}
        className={styles.input}
      >
        <option value="">{placeholder || 'Select an option'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectField; 