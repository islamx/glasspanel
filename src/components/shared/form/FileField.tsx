import React from 'react';
import { useField } from 'formik';
import styles from './FormFields.module.scss';

interface FileFieldProps {
  label: string;
  name: string;
  accept?: string;
  placeholder?: string;
}

const FileField: React.FC<FileFieldProps> = ({ label, accept = 'image/*', ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;
    helpers.setValue(file);
  };

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className={styles.input}
        id={props.name}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
      {field.value && (
        <div className="mt-2">
          <small className="text-muted">
            Selected: {field.value.name}
          </small>
        </div>
      )}
    </div>
  );
};

export default FileField; 