'use client';

import { Formik, Form } from 'formik';
import GlassCard from '@/components/shared/GlassCard/GlassCard';
import TextField from '@/components/shared/form/TextField';
import PasswordField from '@/components/shared/form/PasswordField';
import CheckboxField from '@/components/shared/form/CheckboxField';
import { useTranslations } from 'next-intl';
import styles from './LoginForm.module.scss';
import { getLoginValidationSchema } from './loginValidation';
import Button from '@/components/shared/form/Button';

const LoginForm = () => {
  const t = useTranslations('login');
  return (
    <div className={styles.container}>
      <GlassCard>
        <h1 className={styles.title}>{t('login')}</h1>
        <Formik
          initialValues={{ email: '', password: '', remember: false }}
          validationSchema={getLoginValidationSchema(t)}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            // TODO: call Pocketbase API here
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <TextField label={t('email')} name="email" type="email" autoComplete="email" placeholder="you@email.com" />
              <PasswordField label={t('password')} name="password" autoComplete="current-password" placeholder={t('password')} />
              <CheckboxField label={t('remember')} name="remember" />
              <Button loading={isSubmitting} className={styles.button} type="submit">
                {t('submit')}
              </Button>
            </Form>
          )}
        </Formik>
      </GlassCard>
    </div>
  );
};

export default LoginForm; 