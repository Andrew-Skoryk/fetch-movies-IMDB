import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../types/Movie';

type MoviesState = {
  movies: Movie[],
  loading: boolean;
  error: string;
};

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: '',  
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    take: (state, action: PayloadAction<Movie>) => {
      state.movies = state.movies.filter(movie => (
        movie !== action.payload
      ))
    },
    clear: (state) => {
      state.movies = [];
    },
  }
});

export default moviesSlice.reducer;
export const { actions } = moviesSlice;
