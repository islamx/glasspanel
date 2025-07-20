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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginForm = () => {
  const t = useTranslations('login');
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className={styles.container}>
      <GlassCard>
        <h1 className={styles.title}>{t('login')}</h1>
        <Formik
          initialValues={{ email: '', password: '', remember: false }}
          validationSchema={getLoginValidationSchema(t)}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);
            setSubmitting(true);
            try {
              await login(values.email, values.password);
              router.push('/dashboard');
            } catch (err: any) {
              setError(t('errors.login_failed') || 'Login failed. Please check your credentials.');
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