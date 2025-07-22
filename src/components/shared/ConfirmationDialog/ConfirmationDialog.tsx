import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import Button from '@/components/shared/form/Button';
import styles from './ConfirmationDialog.module.scss';

interface ConfirmationDialogProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  warning?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  type?: 'danger' | 'warning' | 'info';
  icon?: React.ReactNode;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  show,
  onHide,
  onConfirm,
  title,
  message,
  warning,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
  type = 'danger',
  icon
}) => {
  if (!show) return null;

  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'danger':
        return <FiAlertTriangle size={24} />;
      case 'warning':
        return <FiAlertTriangle size={24} />;
      default:
        return <FiAlertTriangle size={24} />;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'danger':
        return styles.dangerIcon;
      case 'warning':
        return styles.warningIcon;
      default:
        return styles.infoIcon;
    }
  };

  return (
    <div className={styles.overlay} onClick={onHide}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <div className={`${styles.icon} ${getIconColor()}`}>
            {getIcon()}
          </div>
          
          <h3 className={styles.title}>{title}</h3>
          
          <p 
            className={styles.message} 
            dangerouslySetInnerHTML={{ __html: message }}
          />
          
          {warning && (
            <p className={styles.warning}>{warning}</p>
          )}
          
          <div className={styles.actions}>
            <Button
              type="button"
              onClick={onHide}
              className={styles.cancelButton}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              loading={loading}
              className={`${styles.confirmButton} ${styles[`${type}Button`]}`}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog; 