import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchAllCountries } from '../api/countriesApi';
import type { Country, SortOption } from '../types/country';
import { useDebounce } from './useDebounce';

const ITEMS_PER_PAGE = 20;

type SortStrategy = (a: Country, b: Country) => number;

const sortStrategies: Record<SortOption, SortStrategy> = {
  'name-asc': (a, b) => a.name.common.localeCompare(b.name.common),
  'name-desc': (a, b) => b.name.common.localeCompare(a.name.common),
  'pop-asc': (a, b) => a.population - b.population,
  'pop-desc': (a, b) => b.population - a.population,
};

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [page, setPage] = useState(1);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch Data
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
      } catch (err) {
        setError('Could not load countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  // Reset Page on filter Change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery, sortOption]);

  // Filter & Sort logic
  const filteredCountries = useMemo(() => {
    let result = [...countries];

    if (debouncedSearchQuery) {
      const lowerQuery = debouncedSearchQuery.toLowerCase().trim();
      result = result.filter((country) => 
        country.name.common.toLowerCase().includes(lowerQuery)
      );
    }

    result.sort(sortStrategies[sortOption]);

    return result;
  }, [countries, debouncedSearchQuery, sortOption]);

  // Pagination logic
  const visibleCountries = useMemo(() => {
    return filteredCountries.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredCountries, page]);

  const loadMore = useCallback(() => {
    if (visibleCountries.length < filteredCountries.length) {
      setPage(prev => prev + 1);
    }
  }, [visibleCountries.length, filteredCountries.length]);

  return {
    countries: visibleCountries,
    totalCount: filteredCountries.length,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    loadMore
  };
};
