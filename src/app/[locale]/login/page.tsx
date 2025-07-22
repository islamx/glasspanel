'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/components/shared/AuthContext';
import LoginForm from '@/components/pages/login/LoginForm';

export default function LoginPage() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (!loading && isLoggedIn) {
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
      router.push(`/${currentLocale}`);
    }
  }, [isLoggedIn, loading, router, locale]);

  // If user is logged in, don't render anything
  if (isLoggedIn) {
    return null;
  }

  return <LoginForm />;
}
