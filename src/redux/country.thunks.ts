import { createAsyncThunk } from '@reduxjs/toolkit';
import { Country } from '../model/country';
import { ApiCountriesRepository } from '../service/api.repository';

export const loadAllCountriesThunk = createAsyncThunk<
  Country[],
  ApiCountriesRepository
>('countries/', async (repo) => {
  const countries = await repo.getAll();
  return countries;
});
