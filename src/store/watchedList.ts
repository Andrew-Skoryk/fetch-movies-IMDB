import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as watchedListService from '../api/watchedListService';
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
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
     });

    builder.addCase(init.fulfilled, (state, action) => {
      state.movies = action.payload || [];
      state.loading = false;
    });

     builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Can NOT load Watched list';
    });
   },
});

export const init = createAsyncThunk('watchedList/fetch', () => {
    return watchedListService.fetchWatched();
  }
);

export default watchedListSlice.reducer;
export const { add, take, clearError } = watchedListSlice.actions;
