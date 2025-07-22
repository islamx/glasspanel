import React, { useState } from 'react';
import Image from 'next/image';
import Modal from 'react-bootstrap/Modal';
import { FiImage } from 'react-icons/fi';
import styles from './ProductImage.module.scss';

interface ProductImageProps {
  imageUrl?: string;
  productName: string;
  productId: string;
  baseUrl: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ 
  imageUrl, 
  productName, 
  productId, 
  baseUrl 
}) => {
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  const getFinalImageUrl = (url: string) => {
    if (!url || url.trim() === '') return null;
    
    // If it's just a filename, make it a complete PocketBase URL
    if (!url.startsWith('http') && !url.startsWith('/')) {
      return `${baseUrl}/api/files/products/${productId}/${url}`;
    }
    
    // If it's a relative URL, make it absolute
    if (url.startsWith('/')) {
      return `${baseUrl}${url}`;
    }
    
    return url;
  };

  const handleImageClick = (finalUrl: string) => {
    setSelectedImage({ url: finalUrl, alt: productName });
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  const finalImageUrl = getFinalImageUrl(imageUrl || '');

  if (!finalImageUrl) {
    return (
      <div className={styles.imageContainer}>
        <div className={styles.placeholder}>
          <FiImage className={styles.placeholderIcon} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.imageContainer}>
        <Image 
          src={finalImageUrl} 
          alt={productName}
          width={50}
          height={50}
          className={styles.thumbnail}
          onClick={() => handleImageClick(finalImageUrl)}
          title="Click to view full image"
          loading="lazy"
          style={{ objectFit: 'cover', cursor: 'pointer' }}
        />
      </div>

      {/* React Bootstrap Modal */}
      <Modal 
        show={!!selectedImage} 
        onHide={handleModalClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage?.alt}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && (
            <Image 
              src={selectedImage.url} 
              alt={selectedImage.alt}
              width={800}
              height={600}
              className="img-fluid"
              style={{ maxHeight: '60vh', objectFit: 'contain' }}
              loading="lazy"
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductImage; 