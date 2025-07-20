'use client';
import React from 'react';
import styles from './LanguageSwitcher.module.scss';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageSwitcherProps {
  locale: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ locale }) => {
  const pathname = usePathname();
  const router = useRouter();
  const otherLocale = locale === 'ar' ? 'en' : 'ar';

  // Replace the locale in the path (supports /ar/... or /en/...)
  let switchLocalePath = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${otherLocale}`);
  // If no locale in path, add it
  if (!/^\/(ar|en)(?=\/|$)/.test(pathname)) {
    switchLocalePath = `/${otherLocale}${pathname}`;
  }

  const handleSwitch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(switchLocalePath);
  };

  return (
    <a href={switchLocalePath} className={styles.switcher} onClick={handleSwitch}>
      {locale === 'ar' ? 'English' : 'العربية'}
    </a>
  );
};

export default LanguageSwitcher; 