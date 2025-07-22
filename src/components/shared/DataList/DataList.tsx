"use client";
import React, { useState, useEffect } from 'react';
import { FiPackage, FiSearch } from 'react-icons/fi';
import SearchInput from '../form/SearchInput';
import DataTable from '../DataTable/DataTable';
import Pagination from '../Pagination/Pagination';
import ResultsInfo from '../ResultsInfo/ResultsInfo';
import Loader from '../Loader/Loader';
import EmptyState from '../EmptyState/EmptyState';
import styles from './DataList.module.scss';

export interface Column<T = unknown> {
  key: string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface DataListProps<T = unknown> {
  data: T[];
  columns: Column<T>[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  loading?: boolean;
  loadingText?: string;
  previousText?: string;
  nextText?: string;
  showingText?: string;
  ofText?: string;
  itemName?: string;
  noDataTitle?: string;
  noDataDescription?: string;
  noSearchResultsTitle?: string;
  noSearchResultsDescription?: string;
  className?: string;
}

const DataList = <T extends Record<string, unknown>>({
  data,
  columns,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  itemsPerPage = 5,
  loading = false,
  previousText = "Previous",
  nextText = "Next",
  showingText = "Showing",
  ofText = "of",
  itemName = "items",
  noDataTitle = "No Data Found",
  noDataDescription = "There are no items available at the moment.",
  noSearchResultsTitle = "No Search Results",
  noSearchResultsDescription = "No items match your search criteria.",
  className = ""
}: DataListProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    // Filter data based on search term
    if (searchTerm.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => {
        // Search in all string fields
        const searchLower = searchTerm.toLowerCase();
        return Object.values(item).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(searchLower)
        );
      });
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  }, [data, searchTerm]);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle loading state
  if (loading) {
    return <Loader />;
  }

  // Case 1: No products available at all
  if (data.length === 0) {
    return (
      <div className={`${styles.container} ${className}`}>
        <EmptyState
          icon={FiPackage}
          title={noDataTitle}
          description={noDataDescription}
        />
      </div>
    );
  }

  // Case 2: Products exist but search has no results
  if (data.length > 0 && filteredData.length === 0 && searchTerm.trim() !== '') {
    return (
      <div className={`${styles.container} ${className}`}>
        <SearchInput 
          value={searchTerm}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          className={styles.searchInput}
        />
        <EmptyState
          icon={FiSearch}
          title={noSearchResultsTitle}
          description={noSearchResultsDescription}
        />
      </div>
    );
  }

  // Case 3: Products exist and either no search or search has results
  return (
    <div className={`${styles.container} ${className}`}>
      <SearchInput 
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        className={styles.searchInput}
      />
      
      <DataTable 
        data={getCurrentPageData()}
        columns={columns}
      />
      
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          previousText={previousText}
          nextText={nextText}
        />
      )}
      
      <ResultsInfo 
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        itemName={itemName}
        showingText={showingText}
        ofText={ofText}
      />
    </div>
  );
};

export default DataList; 