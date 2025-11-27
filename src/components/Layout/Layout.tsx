import React from 'react';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const TITLE = "Where in the world?";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className={styles['countries-layout']}>
      <header className={styles['layout-header']}>
        <h1>{TITLE}</h1>
      </header>
      {children}
    </main>
  );
};

export const Grid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles['layout-grid']}>{children}</div>;
};
