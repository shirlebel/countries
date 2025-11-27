import type { Country } from '../types/country';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://restcountries.com/v3.1';

const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch countries',
  INVALID_RESPONSE: 'API response is not an array',
  API_ERROR: 'Error fetching countries:',
};

const PROP_NAMES = {
  CCA3: 'cca3',
  POPULATION: 'population',
  NAME: 'name',
  COMMON: 'common',
  FLAGS: 'flags',
  PNG: 'png',
  CAPITAL: 'capital'
};

const TYPES = {
  STRING: 'string',
  NUMBER: 'number',
  OBJECT: 'object'
};

const FIELDS = [
  PROP_NAMES.NAME,
  PROP_NAMES.CAPITAL,
  PROP_NAMES.POPULATION,
  PROP_NAMES.FLAGS,
  PROP_NAMES.CCA3
].join(',');

const isValidCountry = (data: any): data is Country => {
  return (
    typeof data === TYPES.OBJECT &&
    data !== null &&
    typeof data[PROP_NAMES.CCA3] === TYPES.STRING &&
    typeof data[PROP_NAMES.POPULATION] === TYPES.NUMBER &&
    typeof data[PROP_NAMES.NAME] === TYPES.OBJECT &&
    typeof data[PROP_NAMES.NAME][PROP_NAMES.COMMON] === TYPES.STRING &&
    typeof data[PROP_NAMES.FLAGS] === TYPES.OBJECT &&
    typeof data[PROP_NAMES.FLAGS][PROP_NAMES.PNG] === TYPES.STRING
  );
};

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`${BASE_URL}/all?fields=${FIELDS}`);
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FETCH_FAILED);
    }
    
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
    }

    const validCountries = data.filter(isValidCountry);

    if (validCountries.length !== data.length) {
      console.warn(`Filtered out ${data.length - validCountries.length} invalid country records`);
    }

    return validCountries;
  } catch (error) {
    console.error(ERROR_MESSAGES.API_ERROR, error);
    throw error;
  }
};
