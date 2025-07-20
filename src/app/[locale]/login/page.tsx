'use client'

import { useTranslations } from 'next-intl'

export default function LoginPage() {
  const t = useTranslations()

  return (
    <div className="container mt-5">
      <h1>{t('login')}</h1>
    </div>
  )
}
