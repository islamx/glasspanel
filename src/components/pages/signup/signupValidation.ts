import * as Yup from 'yup';

export function getSignupValidationSchema(t: (key: string) => string) {
  return Yup.object({
    name: Yup.string()
      .min(2, t('errors.name_short'))
      .max(50, t('errors.name_long'))
      .required(t('errors.name_required')),
    mobile: Yup.string()
      .matches(/^[+]?[\d\s\-\(\)]+$/, t('errors.mobile_invalid'))
      .min(10, t('errors.mobile_short'))
      .max(15, t('errors.mobile_long'))
      .required(t('errors.mobile_required')),
    gender: Yup.string()
      .oneOf(['male', 'female'], t('errors.gender_invalid'))
      .required(t('errors.gender_required')),
    email: Yup.string()
      .email(t('errors.email_invalid'))
      .required(t('errors.email_required')),
    password: Yup.string()
      .min(8, t('errors.password_short'))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, t('errors.password_weak'))
      .required(t('errors.password_required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('errors.password_mismatch'))
      .required(t('errors.confirmPassword_required')),
    acceptTerms: Yup.boolean()
      .oneOf([true], t('errors.terms_required'))
      .required(t('errors.terms_required')),
  });
} 