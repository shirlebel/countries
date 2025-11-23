import React from 'react';
import { useCountries } from './hooks/useCountries';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { Layout, Grid } from './components/Layout/Layout';
import { Controls } from './components/Controls/Controls';
import { CountryCard } from './components/CountryCard/CountryCard';
import { Loader } from './components/UI/Loader';
import { ErrorMessage } from './components/UI/ErrorMessage';
import './styles/global.scss';

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

  return (
    <Layout>
      <Controls 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {loading && <Loader />}
      
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <Grid>
            {countries.map((country, index) => (
              <CountryCard key={country.cca3} country={country} index={index} />
            ))}
          </Grid>
          
          {countries.length < totalCount && (
            <div ref={observerTarget} style={{ height: '20px', margin: '20px 0' }} />
          )}
        </>
      )}

      {!loading && !error && countries.length === 0 && (
        <ErrorMessage message="No countries found matching your criteria." />
      )}
    </Layout>
  );
};

export default App;
