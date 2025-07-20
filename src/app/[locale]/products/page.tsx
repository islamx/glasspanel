"use client";
import { useProtectedRoute } from "@/lib/useProtectedRoute";
import { useTranslations } from "next-intl";
import styles from "./Products.module.scss";

export default function ProductsPage() {
  const { user } = useProtectedRoute();
  const t = useTranslations();

  if (!user) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1>{t('nav.products')}</h1>
      <p>{t('products.placeholder')}</p>
    </div>
  );
} 