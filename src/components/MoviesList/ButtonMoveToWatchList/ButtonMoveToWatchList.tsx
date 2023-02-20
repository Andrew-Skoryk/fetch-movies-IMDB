import classNames from "classnames";
import { FC, useCallback } from "react";
import { Movie } from "../../../types/Movie";
import * as watchedListActions from "../../../store/watchedList";
import * as moviesListActions from "../../../store/moviesList";
import "./ButtonMoveToWatchList.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

type Props = {
  movie: Movie;
};

export const ButtonMoveToWatchList: FC<Props> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const { loadingId } = useAppSelector((state) => state.watchedList);

  const handleAddToWatched = useCallback(
    async (movie: Movie) => {
      dispatch(watchedListActions.addToWatchedList(movie));
      await dispatch(moviesListActions.deleteFromMoviesList(movie.imdbId));
      dispatch(moviesListActions.init());
    },
  [dispatch, movie]);

  return (
    <button
      className={classNames("button is-info button-move-to-watch-list", {
        "is-loading": loadingId === movie.imdbId,
      })}
      onClick={() => handleAddToWatched(movie)}
    >
      Move to 'Watched list'
    </button>
  );
};