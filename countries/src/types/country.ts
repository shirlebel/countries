export interface Country {
  name: {
    common: string;
  };
  cca3: string;
  capital?: string[];
  population: number;
  flags: {
    png: string;
    alt?: string;
  };
}

export type SortOption = 'name-asc' | 'name-desc' | 'pop-asc' | 'pop-desc';
