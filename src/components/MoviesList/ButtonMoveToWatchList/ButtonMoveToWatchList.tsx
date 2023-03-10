import classNames from "classnames";
import { FC, useCallback } from "react";
import { Movie } from "../../../types/Movie";
import * as watchedListActions from "../../../store/watchedList";
import * as moviesListActions from "../../../store/moviesList";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import "./ButtonMoveToWatchList.scss";

type Props = {
  movie: Movie;
};

export const ButtonMoveToWatchList: FC<Props> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const { loadingId } = useAppSelector((state) => state.watchedList);
  const { user } = useAppSelector((state) => state.user);

  const handleAddToWatched = useCallback(
    async (movie: Movie) => {
      if (!user) {
        dispatch(watchedListActions.addToLocalStorage(movie));
        dispatch(watchedListActions.setUpLocalStorage());
        dispatch(moviesListActions.deleteFromLocalStorage(movie.id));
      } else {
        await dispatch(watchedListActions.addToWatchedList(movie));
        dispatch(watchedListActions.init());
        await dispatch(moviesListActions.deleteFromMoviesList(movie.id));
        dispatch(moviesListActions.init());
      }
    },
  [dispatch, movie, user]);

  return (
    <button
      className={classNames("button is-info button-cart", {
        "is-loading": loadingId === movie.imdbId,
      })}
      onClick={() =>
        handleAddToWatched(movie)
      }
    >
      Move to "Watched list"
    </button>
  );
};
