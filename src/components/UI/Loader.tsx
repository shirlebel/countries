import React from 'react';
import styles from './Loader.module.scss';

const LOADING_TEXT = "Loading amazing places...";

export const Loader: React.FC = () => {
  return (
    <div className={styles['countries-loader']}>
      <div className={styles['loader-spinner']}></div>
      <span className={styles['loader-text']}>{LOADING_TEXT}</span>
    </div>
  );
};
