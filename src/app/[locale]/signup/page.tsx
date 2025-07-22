'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SignupForm from '@/components/pages/signup/SignUpForm';

export default function SignupPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (false) { // Temporarily disabled auth check
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
  }, [router, locale]);

  // If user is logged in, don't render anything
  if (false) { // Temporarily disabled auth check
    return null;
  }

  return <SignupForm />;
}
