import { useCallback, useEffect } from "react";
import { Loader } from "../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as watchedListActions from "../../store/watchedList";
import { MoviesList } from "../../components/MoviesList";
import './WatchedPage.scss';

export const WatchedPage = () => {
  const dispatch = useAppDispatch();
  const { movies, loading } = useAppSelector((state) => state.watchedList);
  const { user } = useAppSelector((state) => state.user);

  const handleDeleteMovie = useCallback(
    async (id: string) => {

      if (!user) {
        dispatch(watchedListActions.deleteFromLocalStorage(id));
        return;
      }

      await dispatch(watchedListActions.deleteFromWatchedList(id));
      dispatch(watchedListActions.init());
    },
    [dispatch, user]
  );

  useEffect(() => {
    if (!user) {
      dispatch(watchedListActions.getFromLocalStorage());
    } else {
      dispatch(watchedListActions.init());
    }
  }, []);

  if (!user) {
    useEffect(() => {
      dispatch(watchedListActions.setUpLocalStorage());
    }, [movies, user]);
  }

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
