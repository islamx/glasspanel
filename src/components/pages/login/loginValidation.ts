import * as Yup from 'yup';

export function getLoginValidationSchema(t: (key: string) => string) {
  return Yup.object({
    email: Yup.string()
      .email(t('errors.email_invalid'))
      .required(t('errors.email_required')),
    password: Yup.string()
      .min(6, t('errors.password_short'))
      .required(t('errors.password_required')),
  });
} 