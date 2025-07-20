import React from 'react';
import { useField } from 'formik';
import styles from './FormFields.module.scss';

interface CheckboxFieldProps {
  label: string;
  name: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div className={styles.checkboxGroup}>
      <input type="checkbox" {...field} {...props} className={styles.checkbox} id={props.name} />
      <label htmlFor={props.name} className={styles.checkboxLabel}>{label}</label>
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CheckboxField; 