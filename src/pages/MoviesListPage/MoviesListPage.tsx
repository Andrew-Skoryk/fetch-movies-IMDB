import { useCallback, useState, useEffect } from "react";
import { FindMovie } from "../../components/FindMovie";
import { MoviesList } from "../../components/MoviesList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as moviesListActions from "../../store/moviesList";
import { Movie } from "../../types/Movie";
import { Loader } from "../../components/Loader";
import './MoviesListPage.scss';

export const MoviesListPage = () => {
  const dispatch = useAppDispatch();

  const { movies, loading } = useAppSelector((state) => state.moviesList);

  useEffect(() => {
    dispatch(moviesListActions.init());
  }, []);

  const handleAddMovie = useCallback(
    async (newMovie: Movie) => {
      await dispatch(moviesListActions.addToMoviesList(newMovie));
      dispatch(moviesListActions.init());
    },
    [moviesListActions, dispatch]
  );

  const handleDeleteMovie = useCallback(
    async (id: string) => {
      await dispatch(moviesListActions.deleteFromMoviesList(id));
      dispatch(moviesListActions.init());
    },
    [moviesListActions, dispatch]
  );

  return (
    <div className="page">
      <div className="page-content">
        {loading ? (
          <Loader />
        ) : (
          <MoviesList
            movies={movies}
            deleteMovie={handleDeleteMovie}
            withButtons={true}
          />
        )}
      </div>

      <div className="sidebar">
        <FindMovie movies={movies} addMovie={handleAddMovie} />
      </div>
    </div>
  );
};
