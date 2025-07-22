'use client';

import { useState, useEffect } from 'react';
import { getLanguagePreference, setLanguagePreference, type Locale } from './i18n';

export const useLanguagePreference = () => {
  const [preferredLocale, setPreferredLocale] = useState<Locale | null>(null);

  useEffect(() => {
    setPreferredLocale(getLanguagePreference());
  }, []);

  const updateLanguagePreference = (locale: Locale) => {
    setLanguagePreference(locale);
    setPreferredLocale(locale);
  };

  return {
    preferredLocale,
    updateLanguagePreference,
  };
}; 