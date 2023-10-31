import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllCountriesThunk } from '../redux/country.thunks.ts';
import { ApiCountriesRepository } from '../service/api.repository.ts';
import { AppDispatch, RootState } from '../store/store';

export const urlBase = 'https://restcountries.com/v3.1';

export function useCountry() {
  const repo = useMemo(() => new ApiCountriesRepository(urlBase), []);

  const { countriesState, countries } = useSelector(
    (state: RootState) => state.countries
  );
  const countriesDispatch = useDispatch<AppDispatch>();

  const getCountries = useCallback(async () => {
    await countriesDispatch(loadAllCountriesThunk(repo));
  }, [repo, countriesDispatch]);

  return {
    getCountries,
    countriesState,
    countries,
  };
}
