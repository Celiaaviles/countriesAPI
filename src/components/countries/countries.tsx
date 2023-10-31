import { useEffect, useState } from 'react';
import { useCountry } from '../../hook/use.country';
import { Country } from '../../model/country';
import { CountryCard } from '../country/country';
import styles from './countries.module.scss';

export default function Countries() {
  const { getCountries, countries } = useCountry();

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const pageCount = Math.ceil(countries.length / pageSize);
  let paginatedData = countries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
      paginatedData = [];
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginatedData = [];
    }
  };

  return (
    <div className={styles.countriesMainList}>
      <h2 className={styles.title}>Countries</h2>
      <span className={styles.subtitle}>
        Check out our countries gallery and enjoy!
      </span>
      <nav className={styles.selectcontinent}>
        <select
          /*onChange={handleUbication}*/
          className={styles.selectregion}
          defaultValue="See All"
          name="region"
          id="region-select"
        >
          <option value="" disabled>
            Select Region
          </option>
          <option value="See All">See All</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
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
