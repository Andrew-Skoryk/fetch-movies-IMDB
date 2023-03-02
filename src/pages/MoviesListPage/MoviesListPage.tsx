import { useCallback, useEffect } from "react";
import { FindMovie } from "../../components/FindMovie";
import { MoviesList } from "../../components/MoviesList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as moviesListActions from "../../store/moviesList";
import * as watchedListActions from "../../store/watchedList";
import { Movie } from "../../types/Movie";
import { Loader } from "../../components/Loader";
import './MoviesListPage.scss';

export const MoviesListPage = () => {
  const dispatch = useAppDispatch();

  const { movies, loading } = useAppSelector((state) => state.moviesList);
  const { user } = useAppSelector((state) => state.user);


  useEffect(() => {
    dispatch(moviesListActions.init());
    dispatch(watchedListActions.init());
  }, []);

  const handleAddMovie = useCallback(
    async (newMovie: Movie) => {
      const newMovieUser = user
        ? { ...newMovie, user_id: user.id }
        : newMovie;

      await dispatch(moviesListActions.addToMoviesList(newMovieUser));
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
