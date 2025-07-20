'use client';

import React from 'react';
import NavLink from './NavLink';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './GlassNavbar.module.scss';
import { useTranslations } from 'next-intl';
import { CiLogout } from 'react-icons/ci';
import { useAuth } from '../AuthContext';
import { useRouter } from 'next/navigation';

interface GlassNavbarProps {
  locale: string;
}

const GlassNavbar: React.FC<GlassNavbarProps> = ({ locale }) => {
  const t = useTranslations('common');
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/login`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftLinks}>
        <NavLink href={`/${locale}/`} className={styles.brand}>GlassPanel</NavLink>
        <NavLink href={`/${locale}/dashboard`}>{t('nav.dashboard')}</NavLink>
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
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span className={styles.logoutBtn__content}>
              <CiLogout size={20} style={{ marginInlineEnd: 6 }} />
              {t('nav.logout')}
            </span>
          </button>
        )}
        <LanguageSwitcher locale={locale} />
      </div>
    </nav>
  );
};

export default GlassNavbar; 