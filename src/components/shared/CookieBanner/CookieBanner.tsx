import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/shared/form/Button';
import styles from './CookieBanner.module.scss';

interface CookieBannerProps {
  locale: string;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ locale }) => {
  const t = useTranslations('common');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for existing consent
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`${styles.cookieBanner} ${locale === 'ar' ? styles.rtl : styles.ltr}`}
    >
      <div className={styles.cookieContent}>
        <p className={styles.cookieText}>
          {t('cookie.message')}
        </p>
        <div className={styles.buttonContainer}>
          <Button
            onClick={handleDecline}
            className={`${styles.glassmorphismBtn} ${styles.rejectBtn}`}
          >
            {t('cookie.decline')}
          </Button>
          <Button
            onClick={handleAccept}
            className={`${styles.glassmorphismBtn} ${styles.acceptBtn}`}
          >
          {t('cookie.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner; 