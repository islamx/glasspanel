'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/components/shared/AuthContext';
import SignupForm from '@/components/pages/signup/SignUpForm';

export default function SignupPage() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

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

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (!loading && isLoggedIn) {
      const currentLocale = getCurrentLocale();
      router.push(`/${currentLocale}`);
    }
  }, [isLoggedIn, loading, router, locale]);

  // If user is logged in, don't render anything
  if (isLoggedIn) {
    return null;
  }

  return <SignupForm />;
}
