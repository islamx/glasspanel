import React from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './FormFields.module.scss';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search...",
  className = ""
}) => {
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      <div className="position-relative w-100">
        <input
          type="text"
          className={`${styles.input} ${styles.inputWithIcon} form-control`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className={`${styles.searchIcon} position-absolute top-50 translate-middle-y`}>
          <FiSearch />
        </div>
      </div>
    </div>
  );
};

export default SearchInput; 