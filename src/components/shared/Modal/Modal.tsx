import React from 'react';
import { Modal as BootstrapModal, ModalProps } from 'react-bootstrap';
import styles from './Modal.module.scss';

interface ModalPropsExtended extends Omit<ModalProps, 'show' | 'onHide'> {
  show: boolean;
  onHide: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  actions?: React.ReactNode;
}

const Modal: React.FC<ModalPropsExtended> = ({ 
  show, 
  onHide, 
  title, 
  children, 
  size = 'lg',
  actions,
  ...props 
}) => {
  return (
    <BootstrapModal
      show={show}
      onHide={onHide}
      size={size}
      centered
      className={styles.modal}
      {...props}
    >
      <div className={styles.modalContent}>
        <BootstrapModal.Header closeButton className={styles.modalHeader}>
          <BootstrapModal.Title className={styles.modalTitle}>
            {title}
          </BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body className={styles.modalBody}>
          {children}
          {actions && (
            <div className={styles.modalActions}>
              {actions}
            </div>
          )}
        </BootstrapModal.Body>
      </div>
    </BootstrapModal>
  );
};

export default Modal; 