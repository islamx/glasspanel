"use client";
import commonStyles from "@/styles/common.module.scss";
import homeStyles from "./Home.module.scss";
import { useTranslations } from "next-intl";
import { useProtectedRoute } from "@/lib/useProtectedRoute";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const { user } = useProtectedRoute();
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;

  if (!user) return null;

  const displayName = user.name || user.username || user.email;

  return (
    <div className={commonStyles.container}>
      <div className={homeStyles.welcomeCard}>
        <h1 className={homeStyles.welcomeTitle}>
          {t('dashboard.welcome', { name: displayName })}
        </h1>
        <p className={homeStyles.welcomeSubtitle}>
          {t('dashboard.subtitle')}
        </p>
        <p className={homeStyles.welcomeCta}>
          {t('dashboard.cta')}
        </p>
        <Link href={`/${locale}/products`} className={homeStyles.productsButton}>
          {t('dashboard.productsButton')}
        </Link>
      </div>
    </div>
  );
}
