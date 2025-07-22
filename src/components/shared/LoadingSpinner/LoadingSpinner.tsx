import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = "Loading...",
  className = ""
}) => {
  return (
    <div className={`${styles.loadingContainer} ${className}`}>
      <div className={styles.spinnerWrapper}>
        <div className={`spinner-border ${styles.spinner}`} role="status">
          <span className="visually-hidden">{text}</span>
        </div>
        {text && <p className={styles.loadingText}>{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner; 