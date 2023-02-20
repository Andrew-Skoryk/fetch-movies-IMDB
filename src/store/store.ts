import { configureStore } from '@reduxjs/toolkit';
import * as watchedListReducer from './watchedList';
import * as moviesListReducer from './moviesList';

export const store = configureStore({
  reducer: {
    moviesList: moviesListReducer.default,
    watchedList: watchedListReducer.default,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
