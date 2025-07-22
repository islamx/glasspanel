import { useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useAuth } from "@/components/shared/AuthContext";

export function useProtectedRoute() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    if (!isLoggedIn) {
      // Get current locale with fallback
      const getCurrentLocale = () => {
        if (locale && ['ar', 'en'].includes(locale)) {
          return locale;
        }
        const pathname = window.location.pathname;
        if (pathname.startsWith('/ar/')) return 'ar';
        if (pathname.startsWith('/en/')) return 'en';
        return 'ar';
      };
      
      const currentLocale = getCurrentLocale();
      router.replace(`/${currentLocale}/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoggedIn, router, pathname, locale]);

  return { user, isLoggedIn };
} 