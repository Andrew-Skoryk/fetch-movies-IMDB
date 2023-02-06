import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../types/Movie';

type watchedListState = {
  movies: Movie[],
  loading: boolean;
  error: string;
};

const initialState: watchedListState = {
  movies: [],
  loading: false,
  error: '',  
};

const watchedListSlice = createSlice({
  name: 'watchedList',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Movie>) => {
      state.loading = true;

      try {
        if (state.movies.some(({ imdbId }) => imdbId === action.payload.imdbId)) {
          state.error = 'The movie is already on the list';
          return;
        }

        state.movies.unshift(action.payload);
      } catch (error) {
        state.error = 'Unexpected error occurred';
      } finally {
        state.loading = false;
      }
    },
    take: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(movie => (
        movie.imdbId !== action.payload
      ));
    },
    clearError: (state) => {
      state.error = '';
    },
    clear: (state) => {
      state.movies = [];
    },
  }
});

export default watchedListSlice.reducer;
export const { actions } = watchedListSlice;
