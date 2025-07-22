import React from 'react';
import styles from './ResultsInfo.module.scss';

interface ResultsInfoProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  itemName?: string;
  showingText?: string;
  ofText?: string;
  className?: string;
}

const ResultsInfo: React.FC<ResultsInfoProps> = ({ 
  currentPage, 
  itemsPerPage, 
  totalItems,
  itemName = "items",
  showingText = "Showing",
  ofText = "of",
  className = ""
}) => {
  const startIndex = ((currentPage - 1) * itemsPerPage) + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`${styles.resultsInfo} ${className}`}>
      <small className={styles.resultsText}>
        {showingText} {startIndex} - {endIndex} {ofText} {totalItems} {itemName}
      </small>
    </div>
  );
};

export default ResultsInfo; 