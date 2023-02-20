import { useCallback, useEffect } from "react";
import { Loader } from "../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as watchListActions from "../../store/watchedList";
import { MoviesList } from "../../components/MoviesList";
import './WatchedPage.scss';

export const WatchedPage = () => {
  const dispatch = useAppDispatch();
  const { movies, loading } = useAppSelector((state) => state.watchedList);

  const handleDeleteMovie = useCallback(
    async (id: string) => {
      await dispatch(watchListActions.deleteFromWatchedList(id));
      dispatch(watchListActions.init());
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(watchListActions.init());
  }, []);

  return (
    <div className="page-watched">
      <div className="page-content">
        {loading ? (
          <Loader />
        ) : (
          <MoviesList movies={movies} deleteMovie={handleDeleteMovie} />
        )}
      </div>
    </div>
  );
};
