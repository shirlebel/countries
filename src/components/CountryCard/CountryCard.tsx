import React from 'react';
import type { Country } from '../../types/country';
import styles from './CountryCard.module.scss';

interface CountryCardProps {
  country: Country;
  index: number;
}

const LABELS = {
  CAPITAL: 'Capital:',
  POPULATION: 'Population:',
  NA: 'N/A'
};

export const CountryCard: React.FC<CountryCardProps> = ({ country, index }) => {
  const { name, capital, population, flags } = country;

  const animationDelay = `${Math.min(index, 15) * 0.05}s`;

  return (
    <article 
      className={styles['countries-card']} 
      style={{ '--animation-delay': animationDelay } as React.CSSProperties}
    >
      <div className={styles['card-image-wrapper']}>
        <img src={flags.png} alt={flags.alt || `Flag of ${name.common}`} loading="lazy" />
      </div>
      <div className={styles['card-content']}>
        <h3>{name.common}</h3>
        <p>
          <strong>{LABELS.CAPITAL}</strong> {capital?.[0] || LABELS.NA}
        </p>
        <p>
          <strong>{LABELS.POPULATION}</strong> {population.toLocaleString()}
        </p>
      </div>
    </article>
  );
};
