import { configureStore } from '@reduxjs/toolkit';
import * as moviesReducer from './watchedList';

export const store = configureStore({
  reducer: {
    watchedList: moviesReducer.default,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
