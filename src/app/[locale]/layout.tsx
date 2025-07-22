
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
import { Toaster } from 'react-hot-toast';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '700'],
  variable: '--font-cairo',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'GlassPanel | الرئيسية',
    en: 'GlassPanel | Home',
    ar: 'GlassPanel | الرئيسية',
  },
  description: {
    default: 'تطبيق زجاجي حديث يدعم العربية والإنجليزية.',
    en: 'Modern glass application supporting Arabic and English.',
    ar: 'تطبيق زجاجي حديث يدعم العربية والإنجليزية.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'GlassPanel',
    description: 'Modern glass application supporting Arabic and English.',
    images: ['/vercel.svg'],
    locale: 'ar',
    type: 'website',
  },
  themeColor: '#a259e6',
  author: 'Islam Abdelzaher Frontend developer, Founder @ Islamz.me',
  creator: 'Islam Abdelzaher',
  contact: {
    email: 'Islam.abdelzaher@gmail.com',
    phone: '01062560203',
    website: 'https://islamz.me',
    linkedin: 'https://www.linkedin.com/in/islamabdelzaher/',
    github: 'https://github.com/islamx',
  },
};

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
              <Toaster 
                position={locale === 'ar' ? "top-left" : "top-right"}
                reverseOrder={locale === 'ar'}
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                    direction: locale === 'ar' ? 'rtl' : 'ltr',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 4000,
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </AuthGate>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
