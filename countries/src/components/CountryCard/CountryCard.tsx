import React from 'react';
import type { Country } from '../../types/country';
import styles from './CountryCard.module.scss';

interface CountryCardProps {
  country: Country;
  index: number;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country, index }) => {
  const { name, capital, population, flags } = country;

  const animationDelay = `${Math.min(index, 15) * 0.05}s`;

  return (
    <article 
      className={styles['countries-card']} 
      style={{ animationDelay }}
    >
      <div className={styles['card-image-wrapper']}>
        <img src={flags.png} alt={flags.alt || `Flag of ${name.common}`} loading="lazy" />
      </div>
      <div className={styles['card-content']}>
        <h3>{name.common}</h3>
        <p>
          <strong>Capital:</strong> {capital?.[0] || 'N/A'}
        </p>
        <p>
          <strong>Population:</strong> {population.toLocaleString()}
        </p>
      </div>
    </article>
  );
};

