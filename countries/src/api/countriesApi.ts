import type { Country } from '../types/country';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://restcountries.com/v3.1';
const FIELDS = 'name,capital,population,flags,cca3';

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`${BASE_URL}/all?fields=${FIELDS}`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
