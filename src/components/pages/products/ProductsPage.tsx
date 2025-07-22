"use client";
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import pb from '@/lib/pb';
import DataList from '@/components/shared/DataList/DataList';
import ProductImage from './ProductImage/ProductImage';

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

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Check if user is authenticated
        if (!pb.authStore.isValid) {
          console.log('User not authenticated, trying to fetch public data...');
        }
        
        console.log('Attempting to fetch products from collection...');
        const records = await pb.collection('products').getList(1, 50, {
          sort: '-created'
        });
        
        if (isMounted) {
          console.log('Products fetched successfully:', records.items.length);
          console.log('Available collections:', pb.collections);
          console.log('Products data:', records.items);
          
          // Debug first product structure
          if (records.items.length > 0) {
            const firstProduct = records.items[0];
            console.log('First product full structure:', firstProduct);
            console.log('First product image field:', firstProduct.image);
            console.log('First product image type:', typeof firstProduct.image);
            console.log('All product fields:', Object.keys(firstProduct));
          }
          
          setProducts(records.items as unknown as Product[]);
        }
      } catch (error: any) {
        if (isMounted && error.name !== 'AbortError') {
          console.error('Error fetching products:', error);
          console.error('Error details:', {
            message: error.message,
            status: error.status,
            data: error.data
          });
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
    }
  ];

  return (
    <DataList
      data={products} // Pass all products
      columns={columns}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder={t('searchPlaceholder')}
      itemsPerPage={5}
      loading={loading}
      loadingText={t('loading')}
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
  );
};

export default ProductsPage; 