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
    if (user) {
      dispatch(moviesListActions.init());
      dispatch(watchedListActions.init());

    } else {
      dispatch(moviesListActions.getFromLocalStorage());
    }
  }, []);

  if (!user) {
    useEffect(() => {
      dispatch(moviesListActions.setUpLocalStorage());
    }, [movies, user]);
  }

  const handleAddMovie = useCallback(
    async (newMovie: Movie) => {
      const newMovieUser = user
        ? { ...newMovie, user_id: user.id }
        : newMovie;
      
      if (!user) {
        dispatch(moviesListActions.addToLocalStorage(newMovie));
        return;
      }

      await dispatch(moviesListActions.addToMoviesList(newMovieUser));
      dispatch(moviesListActions.init());
    },
    [moviesListActions, dispatch, user]
  );

  const handleDeleteMovie = useCallback(
    async (id: string) => {

      if (!user) {
        dispatch(moviesListActions.deleteFromLocalStorage(id));
        return;
      }

      await dispatch(moviesListActions.deleteFromMoviesList(id));
      dispatch(moviesListActions.init());
    },
    [moviesListActions, dispatch, user]
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
