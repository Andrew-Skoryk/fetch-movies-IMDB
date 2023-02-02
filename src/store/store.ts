import { configureStore } from '@reduxjs/toolkit';
import * as moviesReducer from './movies';

export const store = configureStore({
  reducer: {
    movies: moviesReducer.default,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
