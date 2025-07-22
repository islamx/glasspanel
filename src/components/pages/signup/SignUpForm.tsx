'use client';

import { Formik, Form } from 'formik';
import GlassCard from '@/components/shared/GlassCard/GlassCard';
import TextField from '@/components/shared/form/TextField';
import PasswordField from '@/components/shared/form/PasswordField';
import CheckboxField from '@/components/shared/form/CheckboxField';
import RadioField from '@/components/shared/form/RadioField';
import Button from '@/components/shared/form/Button';
import { useTranslations } from 'next-intl';
import styles from './SignupForm.module.scss';
import { getSignupValidationSchema } from './signupValidation';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/components/shared/AuthContext';
import toast from 'react-hot-toast';

const SignupForm = () => {
  const t = useTranslations('signup');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { signup } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  return (
    <div className={styles.container}>
      <GlassCard className={styles.signupCard}>
        <h1 className={styles.title}>{t('signup')}</h1>
        <Formik
          initialValues={{ 
            name: '', 
            mobile: '', 
            gender: '', 
            email: '', 
            password: '', 
            confirmPassword: '',
            acceptTerms: false 
          }}
          validationSchema={getSignupValidationSchema(t)}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);
            setSubmitting(true);
            
            // Show loading toast
            const loadingToast = toast.loading(t('toast.loading'));
            
            try {
              // Create user via API route
              const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: values.name,
                  mobile: values.mobile,
                  gender: values.gender,
                  email: values.email,
                  password: values.password,
                  passwordConfirm: values.confirmPassword,
                }),
              });

              const result = await response.json();

              if (!response.ok) {
                throw new Error(result.error || 'Failed to create user');
              }
              
              // Dismiss loading toast and show success
              toast.dismiss(loadingToast);
              toast.success(t('toast.success'));
              
              // Redirect to login after showing toast with same locale
              const currentLocale = getCurrentLocale();
              const loginUrl = `/${currentLocale}/login?message=signup_success`;
              setTimeout(() => {
                // Use window.location for more reliable redirect
                window.location.href = loginUrl;
              }, 1500);
            } catch (err: any) {
              // Dismiss loading toast
              toast.dismiss(loadingToast);
              
              let errorMessage = t('toast.error');
              
              // Handle different error sources
              if (err.message) {
                // Try to translate the error message
                try {
                  errorMessage = t(`toast.${err.message}`) || t('toast.error');
                } catch {
                  errorMessage = err.message;
                }
              } else if (err.data?.message) {
                // Handle PocketBase error messages
                try {
                  errorMessage = t(`toast.${err.data.message}`) || t('toast.error');
                } catch {
                  errorMessage = err.data.message;
                }
              }
              
              // Show error toast
              toast.error(errorMessage);
              setError(errorMessage);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <div className="row">
                <div className="col-md-6">
                  <TextField 
                    label={t('name')} 
                    name="name" 
                    type="text" 
                    autoComplete="off" 
                    placeholder={t('name_placeholder')} 
                  />
                </div>
                <div className="col-md-6">
                  <TextField 
                    label={t('mobile')} 
                    name="mobile" 
                    type="tel" 
                    autoComplete="off" 
                    placeholder={t('mobile_placeholder')} 
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-12">
                  <TextField 
                    label={t('email')} 
                    name="email" 
                    type="email" 
                    autoComplete="off" 
                    placeholder="you@email.com" 
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <PasswordField 
                    label={t('password')} 
                    name="password" 
                    autoComplete="off" 
                    placeholder={t('password')} 
                  />
                </div>
                <div className="col-md-6">
                  <PasswordField 
                    label={t('confirmPassword')} 
                    name="confirmPassword" 
                    autoComplete="off" 
                    placeholder={t('confirmPassword')} 
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-12">
                  <RadioField
                    label={t('gender')}
                    name="gender"
                    options={[
                      { value: 'male', label: t('male') },
                      { value: 'female', label: t('female') }
                    ]}
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-12">
                  <CheckboxField 
                    label={t('acceptTerms')} 
                    name="acceptTerms" 
                  />
                </div>
              </div>
              
              <Button loading={isSubmitting} className={styles.button} type="submit">
                {t('submit')}
              </Button>
              
              {error && <div className={styles.error}>{error}</div>}
              {success && <div className={styles.success}>{success}</div>}
            </Form>
          )}
        </Formik>
      </GlassCard>
    </div>
  );
};

export default SignupForm;
