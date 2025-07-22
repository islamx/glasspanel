'use client';

import React, { useRef, useState } from 'react';
import NavLink from './NavLink';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './GlassNavbar.module.scss';
import { useTranslations } from 'next-intl';
import { CiLogout } from 'react-icons/ci';
import { useAuth } from '../AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { Overlay, Tooltip } from 'react-bootstrap';

interface GlassNavbarProps {
  locale: string;
}

const GlassNavbar: React.FC<GlassNavbarProps> = ({ locale }) => {
  const t = useTranslations('common');
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);
  const logoutBtnRef = useRef<HTMLButtonElement>(null);

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/login`);
  };

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === `/${locale}/` || href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === href;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftLinks}>
        <NavLink href={`/${locale}/`} className={styles.brand} active={isActive(`/${locale}/`)}>GlassPanel</NavLink>
        <NavLink href={`/${locale}`} active={isActive(`/${locale}`)}>{t('nav.dashboard')}</NavLink>
        <NavLink href={`/${locale}/products`} active={isActive(`/${locale}/products`)}>{t('nav.products')}</NavLink>
      </div>
      <div className={styles.rightLinks}>
        {!isLoggedIn && [
          { key: 'login', label: t('nav.login'), href: `/${locale}/login` },
          { key: 'signup', label: t('nav.signup'), href: `/${locale}/signup` }
        ].map(link => (
          <NavLink 
            key={link.key} 
            href={link.href}
            active={isActive(link.href)}
          >
            {link.label}
          </NavLink>
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