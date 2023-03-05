import { configureStore } from '@reduxjs/toolkit';
import * as watchedListReducer from './watchedList';
import * as moviesListReducer from './moviesList';
import * as userReducer from './user';

export const store = configureStore({
  reducer: {
    moviesList: moviesListReducer.default,
    watchedList: watchedListReducer.default,
    user: userReducer.default,
  },
});

store.dispatch(userReducer.getFromLocalStorage());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
