'use client';

import React from 'react';
import CookieBanner from './CookieBanner';

interface CookieBannerWrapperProps {
  locale: string;
}

const CookieBannerWrapper: React.FC<CookieBannerWrapperProps> = ({ locale }) => {
  return <CookieBanner locale={locale} />;
};

export default CookieBannerWrapper; 