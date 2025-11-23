import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles['countries-loader']}>
      <div className={styles['loader-spinner']}></div>
      <span className={styles['loader-text']}>Loading amazing places...</span>
    </div>
  );
};
