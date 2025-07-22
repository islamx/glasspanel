import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useTranslations } from 'next-intl';
import { Row, Col } from 'react-bootstrap';
import TextField from '@/components/shared/form/TextField';
import FileField from '@/components/shared/form/FileField';
import SelectField from '@/components/shared/form/SelectField';
import Button from '@/components/shared/form/Button';
import { productValidationSchema, ProductFormData, Category } from '../AddProductForm/validation';
import styles from './ProductForm.module.scss';

interface ProductFormProps {
  onSubmit: (values: ProductFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  locale: string;
  mode: 'create' | 'edit';
  initialData?: ProductFormData;
  productId?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  onSubmit, 
  onCancel, 
  loading = false,
  mode,
  initialData
}) => {
  const t = useTranslations('products');
  const [sections, setSections] = useState<Category[]>([]);

  const defaultValues: ProductFormData = {
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
    price: 0,
    category_en: '',
    category_ar: '',
    image: null
  };

  const initialValues: ProductFormData = initialData || defaultValues;

  // Fetch categories from products collection
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Define the categories that exist in PocketBase
        const predefinedCategories = [
          {
            id: 'Electronics',
            name_en: 'Electronics',
            name_ar: 'إلكترونيات',
            created: new Date().toISOString()
          },
          {
            id: 'Fashion',
            name_en: 'Fashion',
            name_ar: 'أزياء',
            created: new Date().toISOString()
          },
          {
            id: 'Sports',
            name_en: 'Sports',
            name_ar: 'رياضة',
            created: new Date().toISOString()
          },
          {
            id: 'Food',
            name_en: 'Food',
            name_ar: 'طعام',
            created: new Date().toISOString()
          },
          {
            id: 'Automotive',
            name_en: 'Automotive',
            name_ar: 'سيارات',
            created: new Date().toISOString()
          }
        ];
        
        const categories = predefinedCategories;
        
        if (categories.length > 0) {
          setSections(categories as unknown as Category[]);
        } else {
          setSections([]);
        }
      } catch {
        setSections([]);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values: ProductFormData) => {
    try {
      await onSubmit(values);
    } catch {
      console.error('Form submission error');
    }
  };

  const getSectionName = (section: Category, isEnglish: boolean) => {
    if (isEnglish) {
      return section.name_en || section.nameEn || section.title_en || section.titleEn || section.id;
    } else {
      return section.name_ar || section.nameAr || section.title_ar || section.titleAr || section.id;
    }
  };

  const getSectionOptions = (isEnglish: boolean) => {
    return sections.map(section => ({
      value: getSectionName(section, isEnglish),
      label: getSectionName(section, isEnglish)
    }));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={mode === 'edit'}
    >
      {() => (
        <Form className={styles.form}>
          <Row>
            <Col md={6}>
              <TextField
                label={t('nameEn')}
                name="name_en"
                type="text"
                placeholder={t('nameEnPlaceholder')}
              />
            </Col>
            <Col md={6}>
              <TextField
                label={t('nameAr')}
                name="name_ar"
                type="text"
                placeholder={t('nameArPlaceholder')}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <SelectField
                label={t('categoryEn')}
                name="category_en"
                options={getSectionOptions(true)}
                placeholder={t('categoryEnPlaceholder')}
              />
            </Col>
            <Col md={6}>
              <SelectField
                label={t('categoryAr')}
                name="category_ar"
                options={getSectionOptions(false)}
                placeholder={t('categoryArPlaceholder')}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <TextField
                label={t('price')}
                name="price"
                type="number"
                placeholder={t('pricePlaceholder')}
              />
            </Col>
            <Col md={6}>
              <FileField
                label={t('image')}
                name="image"
                accept="image/*"
                placeholder={t('imagePlaceholder')}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <TextField
                label={t('descriptionEn')}
                name="description_en"
                type="textarea"
                placeholder={t('descriptionEnPlaceholder')}
                rows={4}
              />
            </Col>
            <Col md={6}>
              <TextField
                label={t('descriptionAr')}
                name="description_ar"
                type="textarea"
                placeholder={t('descriptionArPlaceholder')}
                rows={4}
              />
            </Col>
          </Row>

          <div className={styles.formActions}>
            <Button
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              loading={loading}
              className={styles.submitButton}
            >
              {mode === 'create' ? t('addProduct') : t('updateProduct')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm; 