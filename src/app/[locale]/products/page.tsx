"use client";
import { useProtectedRoute } from "@/lib/useProtectedRoute";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import ProductsPage from "@/components/pages/products/ProductsPage";
import styles from "@/styles/common.module.scss";

export default function ProductsPageWrapper() {
  const { user } = useProtectedRoute();
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;

  if (!user) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <ProductsPage locale={locale} />
    </div>
  );
} 