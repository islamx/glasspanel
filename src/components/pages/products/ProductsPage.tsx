"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import pb from '@/lib/pb';
import DataList from '@/components/shared/DataList/DataList';
import ProductImage from './ProductImage/ProductImage';
import Modal from '@/components/shared/Modal';
import ProductForm from './ProductForm';
import Button from '@/components/shared/form/Button';
import { ProductFormData } from './AddProductForm/validation';
import { FiEdit3 } from 'react-icons/fi';
import { Overlay, Tooltip } from 'react-bootstrap';
import styles from '@/styles/common.module.scss';

interface Product {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: number;
  category: string;
  category_en: string;
  category_ar: string;
  image?: string;
  created: string;
}

interface ProductsPageProps {
  locale: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ locale }) => {
  const t = useTranslations('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const records = await pb.collection('products').getList(1, 50, {
          sort: '-created'
        });
        
        if (isMounted) {
          setProducts(records.items as unknown as Product[]);
        }
      } catch (error: any) {
        if (isMounted && error.name !== 'AbortError') {
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    // Format date in both Arabic and English with Gregorian calendar
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      calendar: 'gregory' // This ensures Gregorian calendar
    };
    
    if (locale === 'ar') {
      // Arabic format
      return date.toLocaleDateString('ar-SA', options);
    } else {
      // English format
      return date.toLocaleDateString('en-US', options);
    }
  };

  const getLocalizedCategory = (product: Product) => {
    if (locale === 'ar') {
      return product.category_ar || product.category || '';
    }
    return product.category_en || product.category || '';
  };

  const getLocalizedValue = (product: Product, field: 'name' | 'description') => {
    const fieldName = `${field}_${locale}`;
    return product[fieldName as keyof Product] as string || '';
  };

  const renderImage = (product: Product) => {
    return (
      <ProductImage
        imageUrl={product.image}
        productName={getLocalizedValue(product, 'name')}
        productId={product.id}
        baseUrl={pb.baseUrl}
      />
    );
  };

  const handleSubmitProduct = async (values: ProductFormData) => {
    try {
      setSubmitting(true);
      
      const formData = new FormData();
      formData.append('name_en', values.name_en);
      formData.append('name_ar', values.name_ar);
      formData.append('description_en', values.description_en);
      formData.append('description_ar', values.description_ar);
      formData.append('price', values.price.toString());
      formData.append('category_en', values.category_en);
      formData.append('category_ar', values.category_ar);
      
      if (values.image && values.image instanceof File) {
        formData.append('image', values.image);
      }
      
      if (modalMode === 'create') {
        await pb.collection('products').create(formData);
      } else {
        // Update existing product
        if (editingProduct) {
          await pb.collection('products').update(editingProduct.id, formData);
        }
      }
      
      // Refresh the products list
      const records = await pb.collection('products').getList(1, 50, {
        sort: '-created'
      });
      setProducts(records.items as unknown as Product[]);
      
      setShowModal(false);
      setEditingProduct(null);
    } catch (error: any) {
      console.error('Error saving product:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setModalMode('edit');
    setShowModal(true);
  };

  const EditButtonWithTooltip = ({ product }: { product: Product }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <div style={{ position: 'relative' }}>
        <button
          ref={buttonRef}
          onClick={() => handleEditProduct(product)}
          className={styles.editButton}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <FiEdit3 size={16} />
        </button>
        <Overlay
          target={buttonRef.current}
          show={showTooltip}
          placement="top"
        >
          <Tooltip id={`edit-tooltip-${product.id}`}>
            {t('editProduct')}
          </Tooltip>
        </Overlay>
      </div>
    );
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setModalMode('create');
    setShowModal(true);
  };

  const columns = [
    { 
      key: 'image', 
      label: t('image'),
      render: (value: any, product: Product) => renderImage(product)
    },
    { 
      key: 'name', 
      label: t('name'),
      render: (value: any, product: Product) => getLocalizedValue(product, 'name')
    },
    { 
      key: 'category', 
      label: t('category'),
      render: (value: any, product: Product) => getLocalizedCategory(product)
    },
    { 
      key: 'price', 
      label: t('price'),
      render: (value: number) => `$${(value || 0).toFixed(2)}`
    },
    { 
      key: 'description', 
      label: t('description'),
      render: (value: any, product: Product) => getLocalizedValue(product, 'description')
    },
    { 
      key: 'created', 
      label: t('created'),
      render: (value: string) => value ? formatDate(value) : ''
    },
    {
      key: 'actions',
      label: t('actions'),
      render: (value: any, product: Product) => (
        <EditButtonWithTooltip product={product} />
      )
    }
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className={styles.title}>{t('title')}</h1>
        <Button
          onClick={handleAddProduct}
          className={`btn-primary px-4 py-2 ${styles.glassmorphismBtn}`}
        >
          <i className="bi bi-plus-circle me-2"></i>
          {t('addProduct')}
        </Button>
      </div>

      <DataList
        data={products} // Pass all products
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder={t('searchPlaceholder')}
        itemsPerPage={5}
        loading={loading}
        previousText={t('previous')}
        nextText={t('next')}
        showingText={t('showing')}
        ofText={t('of')}
        itemName={t('products')}
        noDataTitle={t('noData.title')}
        noDataDescription={t('noData.description')}
        noSearchResultsTitle={t('noSearchResults.title')}
        noSearchResultsDescription={t('noSearchResults.description')}
      />

      <Modal
        show={showModal}
        onHide={handleCancel}
        title={modalMode === 'create' ? t('addProduct') : t('editProduct')}
        size="lg"
      >
        <ProductForm
          mode={modalMode}
          onSubmit={handleSubmitProduct}
          onCancel={handleCancel}
          loading={submitting}
          locale={locale}
          initialData={editingProduct ? {
            name_en: editingProduct.name_en,
            name_ar: editingProduct.name_ar,
            description_en: editingProduct.description_en,
            description_ar: editingProduct.description_ar,
            price: editingProduct.price,
            category_en: editingProduct.category_en,
            category_ar: editingProduct.category_ar,
            image: null
          } : undefined}
          productId={editingProduct?.id}
        />
      </Modal>
    </>
  );
};

export default ProductsPage; 