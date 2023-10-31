import { createSlice } from '@reduxjs/toolkit';
import { Country } from '../model/country';
import { loadAllCountriesThunk } from './country.thunks';

export type CountriesState = {
  countries: Country[];
  countriesState: 'idle' | 'loaded' | 'error';
};

const initialState: CountriesState = {
  countries: [],
  countriesState: 'idle',
};
const countriesSlice = createSlice({
  initialState: initialState,
  name: 'countries',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAllCountriesThunk.pending, (state) => {
      state.countriesState = 'idle';
    });
    builder.addCase(
      loadAllCountriesThunk.fulfilled,
      (state, { payload }: { payload: Country[] }) => {
        state.countriesState = 'loaded';
        state.countries = payload;
      }
    );
    builder.addCase(loadAllCountriesThunk.rejected, (state) => {
      state.countriesState = 'error';
    });
  },
});

export const countriesActions = countriesSlice.actions;
export default countriesSlice.reducer;
