'use client'

import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations()

  return (
    <div className="container mt-5">
      <h1>{t('home.title')}</h1>
      <p>{t('home.welcome')}</p>
    </div>
  )
}
