import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { actions } from "../store/watchedList";
import { MoviesList } from "./../components/MoviesList";

export const WatchedPage = () => {
  const dispatch = useDispatch();
  const { movies } = useAppSelector((state) => state.watchedList);

  const handleDeleteMovie = useCallback((id: string) => {
    dispatch(actions.take(id));
  }, [dispatch]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList
          movies={movies}
          deleteMovie={handleDeleteMovie}
          withButtons={false}
        />
      </div>
    </div>
  );
};
