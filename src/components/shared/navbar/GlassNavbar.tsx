'use client';

import React from 'react';
import NavLink from './NavLink';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './GlassNavbar.module.scss';
import { useTranslations } from 'next-intl';

interface GlassNavbarProps {
  locale: string;
}

const GlassNavbar: React.FC<GlassNavbarProps> = ({ locale }) => {
  const t = useTranslations();
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftLinks}>
        <span className={styles.brand}>GlassPanel</span>
        <NavLink href={`/${locale}/dashboard`}>{t('nav.dashboard')}</NavLink>
        <NavLink href={`/${locale}/products`}>{t('nav.products')}</NavLink>
      </div>
      <div className={styles.rightLinks}>
        <NavLink href={`/${locale}/login`}>{t('nav.login')}</NavLink>
        <NavLink href={`/${locale}/signup`}>{t('nav.signup')}</NavLink>
        <LanguageSwitcher locale={locale} />
      </div>
    </nav>
  );
};

export default GlassNavbar; 