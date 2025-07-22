'use client';

import React, { useRef, useState } from 'react';
import NavLink from './NavLink';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './GlassNavbar.module.scss';
import { useTranslations } from 'next-intl';
import { CiLogout } from 'react-icons/ci';
import { useAuth } from '../AuthContext';
import { useRouter } from 'next/navigation';
import { Overlay, Tooltip } from 'react-bootstrap';

interface GlassNavbarProps {
  locale: string;
}

const GlassNavbar: React.FC<GlassNavbarProps> = ({ locale }) => {
  const t = useTranslations('common');
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  const logoutBtnRef = useRef<HTMLButtonElement>(null);

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/login`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftLinks}>
        <NavLink href={`/${locale}/`} className={styles.brand}>GlassPanel</NavLink>
        <NavLink href={`/${locale}`}>{t('nav.dashboard')}</NavLink>
        <NavLink href={`/${locale}/products`}>{t('nav.products')}</NavLink>
      </div>
      <div className={styles.rightLinks}>
        {!isLoggedIn && [
          { key: 'login', label: t('nav.login') },
          { key: 'signup', label: t('nav.signup') }
        ].map(link => (
          <NavLink key={link.key} href={`/${locale}/${link.key}`}>{link.label}</NavLink>
        ))}
        {isLoggedIn && (
          <>
            <button 
              ref={logoutBtnRef}
              className={styles.logoutBtn} 
              onClick={handleLogout}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              aria-label={t('nav.logout')}
            >
              <CiLogout size={18} />
            </button>
            <Overlay
              target={logoutBtnRef.current}
              show={showTooltip}
              placement="bottom"
            >
              <Tooltip id="logout-tooltip">
                {t('nav.logout')}
              </Tooltip>
            </Overlay>
          </>
        )}
        <LanguageSwitcher locale={locale} />
      </div>
    </nav>
  );
};

export default GlassNavbar; 