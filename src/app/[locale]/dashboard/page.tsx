"use client";
import styles from "./Dashboard.module.scss";
import { useTranslations } from "next-intl";
import { useProtectedRoute } from "@/lib/useProtectedRoute";

export default function DashboardPage() {
  const { user } = useProtectedRoute();
  const t = useTranslations("dashboard");

  if (!user) return <div className={styles.loading}>Loading...</div>;

  const displayName = user.name || user.username || user.email;

  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>{t("welcome", { name: displayName })}</h1>
    </div>
  );
} 