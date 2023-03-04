import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import watchedListService from '../api/watchedListService';
import { Movie } from '../types/Movie';

type watchedListState = {
  movies: Movie[];
  loading: boolean;
  loadingId: string;
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
    setUpLocalStorage: (state) => {
      localStorage.setItem('watchedList', JSON.stringify(state.movies));
    },
    getFromLocalStorage: (state) => {
      state.movies = JSON.parse(localStorage.getItem("watchedList") as string) || [];
    },
    addToLocalStorage: (state, action) => {
      if (state.movies.some(({ imdbId }) => imdbId === action.payload.imdbId)) {
        state.error = 'The movie is already on the list';

        return;
      }

      state.movies = [action.payload, ...state.movies];
    },
    deleteFromLocalStorage: (state, action) => {
      state.movies = state.movies.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Init
    builder.addCase(init.pending, (state) => {
      state.loading = true;
     });

    builder.addCase(init.fulfilled, (state, action) => {
      state.movies = action.payload as Movie[];
      state.loading = false;
    });

     builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
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

     builder.addCase(addToWatchedList.rejected, (state, action) => {
      state.loadingId = '';
      state.error = action.payload as string;
     });
    
    // Delete From Watch List
     builder.addCase(deleteFromWatchedList.rejected, (state, action) => {
      state.error = action.payload as string;
    });
   },
});

export const init = createAsyncThunk(
  'watchedList/fetch',
  async (_foo, { rejectWithValue }) => {
    const { data, error } = await watchedListService.fetchMovieList();

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
  });

export const addToWatchedList = createAsyncThunk(
  'watchedList/addToList',
  async (newMovie: Movie, { rejectWithValue }) => {
    const { data: movieList, error: movieListError } = await watchedListService.fetchMovieList();
    
    if (movieListError) {
      return rejectWithValue(movieListError.message);
    }

    const movieExists = movieList.some(({ imdbId }) => imdbId === newMovie.imdbId);
    
    if (movieExists) {
      return rejectWithValue('The movie already exists in the watched list');
    }
    
    const { data, error } = await watchedListService.addToMoviesList(newMovie);

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
  }
);

export const deleteFromWatchedList = createAsyncThunk(
  'watchedList/delete',
  async (id: string, { rejectWithValue }) => {
    const { data, error } = await watchedListService.deleteMovie(id);
    
    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
});

export default watchedListSlice.reducer;
export const { setUpLocalStorage, getFromLocalStorage, addToLocalStorage, deleteFromLocalStorage, clearError } = watchedListSlice.actions;
