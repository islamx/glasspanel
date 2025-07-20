
import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { Cairo } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import '@/styles/globals.scss'
import '@/styles/rtl.scss'
import '@/styles/ltr.scss'
import GlassNavbar from '@/components/shared/navbar/GlassNavbar';
import { AuthProvider, useAuth } from '@/components/shared/AuthContext';
import Loader from '@/components/shared/Loader/Loader';
import AuthGate from '@/components/shared/AuthGate';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '700'],
  variable: '--font-cairo',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  if (!locale || !locales.includes(locale)) {
    console.warn('❗️ Invalid or missing locale:', locale)
    notFound()
  }

  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  // Import all messages for the current locale from the new index.ts
  const messages = (await import(`@/locales/${locale}/index.ts`)).default;

  return (
    <html lang={locale} dir={dir} className={cairo.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <AuthGate>
              <GlassNavbar locale={locale} />
              {children}
            </AuthGate>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
