import { useEffect } from 'react';
import { useCountry } from '../../hook/use.country';
import { Country } from '../../model/country';
import { CountryCard } from '../country/country';
import styles from './countries.module.scss';

export default function Countries() {
  const {
    getCountries,
    countries,
    handleContinents,
    currentPage,
    handleNextPage,
    handlePreviousPage,
    paginatedData,
    pageCount,
  } = useCountry();

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  return (
    <div className={styles.countriesMainList}>
      <h2 className={styles.title}>Countries</h2>
      <span className={styles.subtitle}>
        Check out our countries gallery and enjoy!
      </span>
      <nav className={styles.selectcontinent}>
        <select
          onChange={handleContinents}
          className={styles.selectregion}
          defaultValue={'Filter by region'}
          name="continents"
          id="region-select"
        >
          <option value="" disabled>
            Select Region
          </option>
          <option value="all">All</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="africa">Africa</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </nav>
      <ul className={styles.countries}>
        {paginatedData?.map((country: Country) => (
          <CountryCard
            key={country.name.common}
            country={country}
          ></CountryCard>
        ))}
      </ul>
      {countries.length > 10 && (
        <>
          <div className={styles.previousNextButtonsdiv}>
            <button
              className={styles.previousNextButtons}
              disabled={currentPage === 1 ? true : false}
              onClick={handlePreviousPage}
            >
              {'<'}
            </button>
            <button
              className={styles.previousNextButtons}
              disabled={currentPage === pageCount ? true : false}
              onClick={handleNextPage}
            >
              {'>'}
            </button>
          </div>
        </>
      )}
      ;
    </div>
  );
}
