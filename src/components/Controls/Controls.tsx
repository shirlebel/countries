import React from 'react';
import type { SortOption } from '../../types/country';
import styles from './Controls.module.scss';

interface ControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

const PLACEHOLDERS = {
  SEARCH: "Search for a country...",
  SORT_LABEL: "Sort countries",
  SEARCH_LABEL: "Search countries",
  CLEAR_SEARCH: "Clear search"
};

const SORT_OPTIONS = {
  NAME_ASC: "Name (A-Z)",
  NAME_DESC: "Name (Z-A)",
  POP_DESC: "Population (High to Low)",
  POP_ASC: "Population (Low to High)"
};

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
          placeholder={PLACEHOLDERS.SEARCH}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label={PLACEHOLDERS.SEARCH_LABEL}
        />
        {searchQuery && (
          <button 
            className={styles['controls-clear-button']} 
            onClick={() => setSearchQuery('')}
            aria-label={PLACEHOLDERS.CLEAR_SEARCH}
          >
            ✕
          </button>
        )}
      </div>
      <div className={styles['controls-sort-wrapper']}>
        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          aria-label={PLACEHOLDERS.SORT_LABEL}
        >
          <option value="name-asc">{SORT_OPTIONS.NAME_ASC}</option>
          <option value="name-desc">{SORT_OPTIONS.NAME_DESC}</option>
          <option value="pop-desc">{SORT_OPTIONS.POP_DESC}</option>
          <option value="pop-asc">{SORT_OPTIONS.POP_ASC}</option>
        </select>
      </div>
    </div>
  );
};
