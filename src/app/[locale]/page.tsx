'use client'

import { useTranslations } from 'next-intl'
import Button from 'react-bootstrap/Button';

export default function HomePage() {
  const t = useTranslations()

  return (
    <div className="container mt-5">
      <h1>{t('home.title')}</h1>
      <p>{t('home.welcome')}</p>
      <Button variant="primary">Primary</Button>
    </div>
  )
}
