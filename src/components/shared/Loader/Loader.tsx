'use client';
import React from 'react';
import styles from './Loader.module.scss';
import { useTranslations } from 'next-intl';

const Loader = () => {
  const t = useTranslations('common');
  return (
    <div className={styles.fullPageLoader}>
      <span className={styles.spinner}></span>
      <span className={styles.text}>{t('loading')}</span>
    </div>
  );
};

export default Loader; 