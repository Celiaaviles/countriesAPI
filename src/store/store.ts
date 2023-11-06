import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import countriesReducer from '../redux/country.slice';

export const appStore = configureStore({
  reducer: {
    countries: countriesReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
