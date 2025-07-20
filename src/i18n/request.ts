import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  const fallbackLocale = 'ar'
  const activeLocale = locale || fallbackLocale

  return {
    locale: activeLocale,
    timeZone: 'Africa/Cairo',
    messages: (await import(`../locales/${activeLocale}/common.json`)).default
  }
})
