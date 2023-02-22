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
  reducers: {},
  extraReducers: (builder) => {
    // init
     builder.addCase(init.pending, (state) => {
      state.loading = true;
     });

  builder.addCase(init.fulfilled, (state, action) => {
    state.movies = (action.payload as Movie[]);
    state.loading = false;
  });

     builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Can NOT load Watch list';
     });
    
        // Add To Watch List
     builder.addCase(addToMoviesList.rejected, (state) => {
      state.error = 'Can NOT add the movie to Watched list';
     });
    
        // Delete From Watch List
     builder.addCase(deleteFromMoviesList.rejected, (state) => {
      state.error = 'Can NOT delete the movie from Watched list';
    });
  },
});

export const init = createAsyncThunk('moviesList/fetch', () => (
  moviesListService.fetchMovieList()
));

export const addToMoviesList = createAsyncThunk('moviesList/addToList', (newMovie: Movie) => {
  return moviesListService.addToMoviesList(newMovie)
});

export const deleteFromMoviesList = createAsyncThunk('moviesList/delete', (id: string) => (
  moviesListService.deleteMovie(id)
));

export default moviesListSlice.reducer;