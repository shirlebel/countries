import React from 'react';
import { useCountries } from './hooks/useCountries';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { Layout, Grid } from './components/Layout/Layout';
import { Controls } from './components/Controls/Controls';
import { CountryCard } from './components/CountryCard/CountryCard';
import { Loader } from './components/UI/Loader';
import { ErrorMessage } from './components/UI/ErrorMessage';
import './styles/global.scss';
import styles from './components/Layout/Layout.module.scss';

const NO_RESULTS_MESSAGE = "No countries found matching your criteria.";

const App: React.FC = () => {
  const { 
    countries,
    totalCount,
    loading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    sortOption, 
    setSortOption,
    loadMore
  } = useCountries();

  const observerTarget = useInfiniteScroll(loadMore);

  const hasData = countries.length > 0;
  const isError = !!error;
  const showLoader = loading;
  const showContent = !loading && !isError;

  return (
    <Layout>
      <Controls
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {showLoader && <Loader />}
      
      {isError && <ErrorMessage message={error} />}

      {showContent && hasData && (
        <>
          <Grid>
            {countries.map((country, index) => (
              <CountryCard key={country.cca3} country={country} index={index} />
            ))}
          </Grid>
          
          {countries.length < totalCount && (
            <div ref={observerTarget} className={styles['infinite-scroll-trigger']} />
          )}
        </>
      )}

      {showContent && !hasData && (
        <ErrorMessage message={NO_RESULTS_MESSAGE} />
      )}
    </Layout>
  );
};

export default App;
