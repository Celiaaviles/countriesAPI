import { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countriesActions } from '../redux/country.slice.ts';
import { loadAllCountriesThunk } from '../redux/country.thunks.ts';
import { ApiCountriesRepository } from '../service/api.repository.ts';
import { AppDispatch, RootState } from '../store/store';

export let urlBase = 'https://restcountries.com/v3.1/all';

export function useCountry() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const repo = useMemo(() => new ApiCountriesRepository(urlBase), [urlBase]);

  const { countriesState, countries } = useSelector(
    (state: RootState) => state.countries
  );

  const countriesDispatch = useDispatch<AppDispatch>();

  const getCountries = useCallback(async () => {
    await countriesDispatch(loadAllCountriesThunk(repo));
  }, [repo, countriesDispatch]);

  const continents = async (continents: string) => {
    await countriesDispatch(loadAllCountriesThunk(repo));
    countriesDispatch(countriesActions.continents(continents));
  };

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 9;
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

  const handleContinents = (ev: SyntheticEvent) => {
    const selectedContinents = (ev.target as HTMLSelectElement).value;
    continents(selectedContinents);
    if (selectedContinents === 'all') {
      urlBase = 'https://restcountries.com/v3.1/all';
    } else {
      urlBase = `https://restcountries.com/v3.1/region/${selectedContinents}`;
    }
  };

  return {
    getCountries,
    countriesState,
    countries,
    continents,
    handleContinents,
    currentPage,
    setCurrentPage,
    handleNextPage,
    handlePreviousPage,
    paginatedData,
    pageCount,
  };
}
