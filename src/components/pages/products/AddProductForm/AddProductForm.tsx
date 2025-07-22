import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useTranslations } from 'next-intl';
import { Row, Col } from 'react-bootstrap';
import TextField from '@/components/shared/form/TextField';
import FileField from '@/components/shared/form/FileField';
import SelectField from '@/components/shared/form/SelectField';
import Button from '@/components/shared/form/Button';
import { productValidationSchema, ProductFormData, Category } from './validation';
import pb from '@/lib/pb';
import styles from './AddProductForm.module.scss';

interface AddProductFormProps {
  onSubmit: (values: ProductFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  locale: string;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ 
  onSubmit, 
  onCancel, 
  loading = false,
  locale
}) => {
  const t = useTranslations('products');
  const [sections, setSections] = useState<Category[]>([]);
  const [sectionsLoading, setSectionsLoading] = useState(true);

  const initialValues: ProductFormData = {
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
    price: 0,
    category_en: '',
    category_ar: '',
    image: null
  };

  // Fetch categories from products collection
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setSectionsLoading(true);
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
      } catch (error) {
        setSections([]);
      } finally {
        setSectionsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values: ProductFormData) => {
    try {
      await onSubmit(values);
    } catch (error) {
      // Handle error silently
    }
  };

  const getSectionName = (section: Category, isEnglish: boolean) => {
    if (isEnglish) {
      return section.name_en || section.nameEn || section.title_en || section.titleEn || 'Unknown';
    } else {
      return section.name_ar || section.nameAr || section.title_ar || section.titleAr || 'غير معروف';
    }
  };

  const sectionEnOptions = sections.map(section => ({
    value: section.name_en, // Use the English name as value
    label: getSectionName(section, true)
  }));

  const sectionArOptions = sections.map(section => ({
    value: section.name_ar, // Use the Arabic name as value
    label: getSectionName(section, false)
  }));







  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <Form className={styles.form}>
          <Row>
            <Col md={6}>
              <TextField
                label={t('nameEn')}
                name="name_en"
                placeholder={t('nameEnPlaceholder')}
              />
            </Col>
            <Col md={6}>
              <TextField
                label={t('nameAr')}
                name="name_ar"
                placeholder={t('nameArPlaceholder')}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <SelectField
                label={t('categoryEn')}
                name="category_en"
                options={sectionEnOptions}
                placeholder={sectionsLoading ? t('loadingCategories') : t('selectCategoryEn')}
              />
            </Col>
            <Col md={6}>
              <SelectField
                label={t('categoryAr')}
                name="category_ar"
                options={sectionArOptions}
                placeholder={sectionsLoading ? t('loadingCategories') : t('selectCategoryAr')}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <TextField
                label={t('descriptionEn')}
                name="description_en"
                placeholder={t('descriptionEnPlaceholder')}
                as="textarea"
                rows={3}
              />
            </Col>
            <Col md={6}>
              <TextField
                label={t('descriptionAr')}
                name="description_ar"
                placeholder={t('descriptionArPlaceholder')}
                as="textarea"
                rows={3}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <TextField
                label={t('price')}
                name="price"
                type="number"
                placeholder={t('pricePlaceholder')}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <FileField
                label={t('image')}
                name="image"
                accept="image/*"
              />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductForm; 