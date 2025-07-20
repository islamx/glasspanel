'use client'

import { useTranslations } from 'next-intl'

export default function SignUpPage() {
  const t = useTranslations()

  return (
    <div className="container mt-5">
      <h1>{t('signup')}</h1>
    </div>
  )
}
