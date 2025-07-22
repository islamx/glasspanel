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
      className={`${styles.cookieBanner} position-fixed`}
      style={{ 
        bottom: '20px', 
        left: '20px', 
        right: '20px',
        maxWidth: 'calc(100vw - 40px)'
      }}
    >
      <div className={styles.cookieContent}>
        <p className={styles.cookieText}>
          {t('cookie.message')}
        </p>
        <div className={styles.buttonContainer}>
          <Button
            onClick={handleDecline}
            className={`btn-secondary ${styles.glassmorphismBtn} px-3 py-2`}
          >
            {t('cookie.decline')}
          </Button>
          <Button
            onClick={handleAccept}
            className={`btn-primary ${styles.glassmorphismBtn} px-3 py-2`}
          >
            {t('cookie.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner; 