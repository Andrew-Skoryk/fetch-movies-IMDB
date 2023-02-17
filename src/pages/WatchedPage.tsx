import { useCallback, useEffect } from "react";
import { Loader } from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import * as watchListActions from "../store/watchedList";
import { MoviesList } from "./../components/MoviesList";

export const WatchedPage = () => {
  const dispatch = useAppDispatch();
  const { movies, loading } = useAppSelector((state) => state.watchedList);

  const handleDeleteMovie = useCallback((id: string) => {
    dispatch(watchListActions.take(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(watchListActions.init());
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        {loading ? (
          <Loader />
        ) : (
          <MoviesList
            movies={movies}
            deleteMovie={handleDeleteMovie}
            withButtons={false}
          />
        )}
      </div>
    </div>
  );
};
