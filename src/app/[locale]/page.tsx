"use client";
import commonStyles from "@/styles/common.module.scss";
import homeStyles from "./Home.module.scss";
import { useTranslations } from "next-intl";
import { useProtectedRoute } from "@/lib/useProtectedRoute";

export default function HomePage() {
  const { user } = useProtectedRoute();
  const t = useTranslations('common');

  if (!user) return null;

  const displayName = user.name || user.username || user.email;

  return (
    <div className={commonStyles.container}>
      <h1 className={commonStyles.title}>
        {t('nav.dashboard')}
      </h1>
      <p className={`${homeStyles.welcome} text-muted`}>
        {t('dashboard.welcome', { name: displayName })}
      </p>
    </div>
  );
}
