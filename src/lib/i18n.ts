export const locales = ['ar', 'en'] as const
export const defaultLocale = 'ar'

export type Locale = (typeof locales)[number]

// Utility functions for language preference management
export const setLanguagePreference = (locale: Locale) => {
  if (typeof window !== 'undefined') {
    document.cookie = `preferred-locale=${locale}; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
  }
};

export const getLanguagePreference = (): Locale | null => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const preferredLocale = cookies.find(cookie => 
      cookie.trim().startsWith('preferred-locale=')
    );
    
    if (preferredLocale) {
      const locale = preferredLocale.split('=')[1];
      return locales.includes(locale as Locale) ? locale as Locale : null;
    }
  }
  return null;
};
