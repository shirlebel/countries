import React from 'react';
import type { SortOption } from '../../types/country';
import styles from './Controls.module.scss';

interface ControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  sortOption, 
  setSortOption 
}) => {
  return (
    <div className={styles['countries-controls']}>
      <div className={styles['controls-search-wrapper']}>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search countries"
        />
        {searchQuery && (
          <button 
            className={styles['controls-clear-button']} 
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <div className={styles['controls-sort-wrapper']}>
        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          aria-label="Sort countries"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="pop-desc">Population (High to Low)</option>
          <option value="pop-asc">Population (Low to High)</option>
        </select>
      </div>
    </div>
  );
};
