import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import watchedListService from '../api/watchedListService';
import { Movie } from '../types/Movie';

type watchedListState = {
  movies: Movie[],
  loading: boolean;
  loadingId: string,
  error: string;
};

const initialState: watchedListState = {
  movies: [],
  loading: false,
  loadingId: '',
  error: '',  
};

const watchedListSlice = createSlice({
  name: 'watchedList',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
    clear: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    // Init
    builder.addCase(init.pending, (state) => {
      state.loading = true;
     });

    builder.addCase(init.fulfilled, (state, action) => {
      state.movies = (action.payload as Movie[]);
      state.loading = false;
    });

     builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Can NOT load Watched list';
    });

    // Add To Watch List
    builder.addCase(addToWatchedList.pending, (state, action) => {
      state.loadingId = action.meta.arg.imdbId;

      if (state.movies.some(({ imdbId }) => imdbId === action.meta.arg.imdbId)) {
        state.error = 'The movie is already on the list';
      }
    });

    builder.addCase(addToWatchedList.fulfilled, (state) => {
      state.loadingId = '';
    });

     builder.addCase(addToWatchedList.rejected, (state) => {
      state.loadingId = '';
      state.error = 'Can NOT add the movie to Watched list';
     });
    
        // Delete From Watch List
     builder.addCase(deleteFromWatchedList.rejected, (state) => {
      state.error = 'Can NOT delete the movie from Watched list';
    });
   },
});

export const init = createAsyncThunk('watchedList/fetch', () => (
  watchedListService.fetchMovieList()
));

export const addToWatchedList = createAsyncThunk('watchedList/addToList', (newMovie: Movie) => {
  return watchedListService.addToMoviesList(newMovie)
});

export const deleteFromWatchedList = createAsyncThunk('watchedList/delete', (id: string) => (
  watchedListService.deleteMovie(id)
));

export default watchedListSlice.reducer;
export const { clearError } = watchedListSlice.actions;
