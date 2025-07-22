"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { FiHeart } from 'react-icons/fi';
import styles from './Footer.module.scss';

interface FooterProps {
  locale: string;
}

const Footer: React.FC<FooterProps> = () => {
  const t = useTranslations('common');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>{t('footer.whatWeDo')}</h3>
            <p className={styles.description}>{t('footer.description')}</p>
          </div>
          
          <div className={styles.section}>
            <h3 className={styles.title}>{t('footer.features')}</h3>
            <ul className={styles.featuresList}>
              <li>{t('footer.feature1')}</li>
              <li>{t('footer.feature2')}</li>
              <li>{t('footer.feature3')}</li>
              <li>{t('footer.feature4')}</li>
              <li>{t('footer.feature5')}</li>
              <li>{t('footer.feature6')}</li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h3 className={styles.title}>{t('footer.technologies')}</h3>
            <ul className={styles.techList}>
              <li>{t('footer.tech1')}</li>
              <li>{t('footer.tech2')}</li>
              <li>{t('footer.tech3')}</li>
              <li>{t('footer.tech4')}</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.credits}>
          <p className={styles.creditText}>
            {t('footer.designedBy')}{' '}
            <FiHeart className={styles.loveIcon} />{' '}
            {t('footer.by')}{' '}
            <a 
              href="https://islamz.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.portfolioLink}
            >
              {t('footer.developerName')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 