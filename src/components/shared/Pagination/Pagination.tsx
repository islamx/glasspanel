import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousText?: string;
  nextText?: string;
  className?: string;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  previousText = "Previous",
  nextText = "Next",
  className = "",
  maxVisiblePages = 5
}) => {
  if (totalPages <= 1) return null;



  // Generate page items for React Bootstrap Pagination
  const getPageItems = () => {
    const items = [];
    
    // Previous button
    items.push(
      <BootstrapPagination.Prev
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        {previousText}
      </BootstrapPagination.Prev>
    );

    // Calculate range of pages to show
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page and ellipsis
    if (startPage > 1) {
      items.push(
        <BootstrapPagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => onPageChange(1)}
          aria-label="Go to page 1"
        >
          1
        </BootstrapPagination.Item>
      );
      
      if (startPage > 2) {
        items.push(
          <BootstrapPagination.Ellipsis key="ellipsis1" />
        );
      }
    }

    // Page numbers
    for (let page = startPage; page <= endPage; page++) {
      const isActive = page === currentPage;
      items.push(
        <BootstrapPagination.Item
          key={page}
          active={isActive}
          onClick={() => onPageChange(page)}
          aria-label={`Go to page ${page}`}
          aria-current={isActive ? 'page' : undefined}
        >
          {page}
        </BootstrapPagination.Item>
      );
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <BootstrapPagination.Ellipsis key="ellipsis2" />
        );
      }
      
      items.push(
        <BootstrapPagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => onPageChange(totalPages)}
          aria-label={`Go to page ${totalPages}`}
        >
          {totalPages}
        </BootstrapPagination.Item>
      );
    }

    // Next button
    items.push(
      <BootstrapPagination.Next
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        {nextText}
      </BootstrapPagination.Next>
    );

    return items;
  };

  return (
    <div className={`${styles.paginationContainer} ${className}`}>
      <BootstrapPagination className="justify-content-center mb-0">
        {getPageItems()}
      </BootstrapPagination>
      
      {/* Page info for mobile */}
      <div className="d-md-none text-center">
        <small className="text-muted">
          Page {currentPage} of {totalPages}
        </small>
      </div>
    </div>
  );
};

export default Pagination; 