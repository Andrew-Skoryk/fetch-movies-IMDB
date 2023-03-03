import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moviesListService from '../api/moviesListService';
import { Movie } from "../types/Movie";

type moviesListState = {
  movies: Movie[],
  loading: boolean;
  error: string;
};

const initialState: moviesListState = {
  movies: [],
  loading: false,
  error: '',  
};

const moviesListSlice = createSlice({
  name: 'moviesList',
  initialState,
  reducers: {
     clearError: (state) => {
      state.error = '';
    },
    setUpLocalStorage: (state) => {
      console.log('I\'m trying');
      localStorage.setItem('moviesList', JSON.stringify(state.movies));
    },
    getFromLocalStorage: (state) => {
      state.movies = JSON.parse(localStorage.getItem("moviesList") as string);
    },
    addToLocalStorage: (state, action) => {
      state.movies = [...state.movies, action.payload];
    },
    deleteFromLocalStorage: ({ movies }, action) => {
      movies = movies.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // init
     builder.addCase(init.pending, (state) => {
      state.loading = true;
     });

    builder.addCase(init.fulfilled, (state, action) => {
      state.movies = (action.payload as Movie[]);
      state.loading = false;
    });

     builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
     });

    // Add To Watch List
     builder.addCase(addToMoviesList.rejected, (state, action) => {
      state.error = action.payload as string;
     });

    // Delete From Watch List
     builder.addCase(deleteFromMoviesList.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const init = createAsyncThunk(
  'moviesList/fetch',
  async ( _foo , { rejectWithValue } ) => {
    const { data, error } = await moviesListService.fetchMovieList();

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
  });

export const addToMoviesList = createAsyncThunk(
  'moviesList/addToList',
  async (newMovie: Movie, { rejectWithValue }) => {
    const { data, error } = await moviesListService.addToMoviesList(newMovie);

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
});

export const deleteFromMoviesList = createAsyncThunk(
  'moviesList/delete',
  async (id: string, { rejectWithValue }) => {
    const { data, error } = await moviesListService.deleteMovie(id);

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
});

export default moviesListSlice.reducer;
export const { setUpLocalStorage, getFromLocalStorage, addToLocalStorage, deleteFromLocalStorage, clearError } = moviesListSlice.actions;
