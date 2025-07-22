import * as Yup from 'yup';

export const productValidationSchema = Yup.object({
  name_en: Yup.string()
    .required('English name is required')
    .min(2, 'English name must be at least 2 characters')
    .max(100, 'English name must be less than 100 characters'),
  
  name_ar: Yup.string()
    .required('Arabic name is required')
    .min(2, 'Arabic name must be at least 2 characters')
    .max(100, 'Arabic name must be less than 100 characters'),
  
  description_en: Yup.string()
    .required('English description is required')
    .min(10, 'English description must be at least 10 characters')
    .max(500, 'English description must be less than 500 characters'),
  
  description_ar: Yup.string()
    .required('Arabic description is required')
    .min(10, 'Arabic description must be at least 10 characters')
    .max(500, 'Arabic description must be less than 500 characters'),
  
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .max(999999, 'Price must be less than 999,999'),
  
  category_en: Yup.string()
    .required('English category is required'),
  
  category_ar: Yup.string()
    .required('Arabic category is required'),
  
  image: Yup.mixed()
    .nullable()
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return true; // Allow null/empty
      const file = value as File;
      return file.size <= 5 * 1024 * 1024; // 5MB
    })
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) return true; // Allow null/empty
      const file = value as File;
      return ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
    })
});

export interface ProductFormData {
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: number;
  category_en: string;
  category_ar: string;
  image: File | null;
}

export interface Category {
  id: string;
  name_en: string;
  name_ar: string;
  created: string;
  // Add alternative field names that might exist in PocketBase
  nameEn?: string;
  nameAr?: string;
  title_en?: string;
  title_ar?: string;
  titleEn?: string;
  titleAr?: string;
} 