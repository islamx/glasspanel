'use client';

import { Formik, Form } from 'formik';
import GlassCard from '@/components/shared/GlassCard/GlassCard';
import TextField from '@/components/shared/form/TextField';
import PasswordField from '@/components/shared/form/PasswordField';
import CheckboxField from '@/components/shared/form/CheckboxField';
import Button from '@/components/shared/form/Button';
import { useTranslations } from 'next-intl';
import styles from './LoginForm.module.scss';
import { getLoginValidationSchema } from './loginValidation';
import { useAuth } from '@/components/shared/AuthContext';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const t = useTranslations('login');
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale as string;
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // Fallback: Get locale from current URL if params.locale is not available
  const getCurrentLocale = () => {
    if (locale && ['ar', 'en'].includes(locale)) {
      return locale;
    }
    // Fallback to checking the current pathname
    const pathname = window.location.pathname;
    if (pathname.startsWith('/ar/')) return 'ar';
    if (pathname.startsWith('/en/')) return 'en';
    return 'ar'; // default fallback
  };

  // Check for signup success message
  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'signup_success') {
      setInfoMessage(t('messages.signup_success'));
    }
  }, [searchParams, t]);

  return (
    <div className={styles.container}>
      <GlassCard>
        <h1 className={styles.title}>{t('login')}</h1>
        
        {infoMessage && (
          <div className={styles.infoMessage}>
            {infoMessage}
          </div>
        )}
        
        <Formik
          initialValues={{ email: '', password: '', remember: false }}
          validationSchema={getLoginValidationSchema(t)}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);
            setSubmitting(true);
            
            // Show loading toast
            const loadingToast = toast.loading(t('toast.loading'));
            
            try {
              await login(values.email, values.password);
              
              // Dismiss loading toast and show success
              toast.dismiss(loadingToast);
              toast.success(t('toast.success'));
              
              // Use router.push for smooth navigation without page refresh
              const currentLocale = getCurrentLocale();
              router.push(`/${currentLocale}`);
            } catch {
              // Dismiss loading toast
              toast.dismiss(loadingToast);
              
              const errorMessage = t('toast.error');
              toast.error(errorMessage);
              setError(errorMessage);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <TextField label={t('email')} name="email" type="email" autoComplete="off" placeholder="you@email.com" />
              <PasswordField label={t('password')} name="password" autoComplete="off" placeholder={t('password')} />
              <CheckboxField label={t('remember')} name="remember" />
              <Button loading={isSubmitting} className={styles.button} type="submit">
                {t('submit')}
              </Button>
              {error && <div className={styles.error} style={{ textAlign: 'center', marginTop: 12 }}>{error}</div>}
            </Form>
          )}
        </Formik>
      </GlassCard>
    </div>
  );
};

export default LoginForm; 