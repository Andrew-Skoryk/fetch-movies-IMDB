import classNames from "classnames";
import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Movie } from "../../../types/Movie";
import { actions } from "../../../store/watchedList";
import "./ButtonMoveToWatchList.scss";

type Props = {
  loading: Boolean;
  movie: Movie;
};

export const ButtonMoveToWatchList: FC<Props> = ({ loading, movie }) => {
  const dispatch = useDispatch();

    const handleAddToWatched = useCallback(
      (movie: Movie) => {
        dispatch(actions.add(movie));
      },
      [dispatch]
    );
  return (
    <button
      className={classNames("button is-info button-move-to-watch-list", {
        "is-loading": loading,
      })}
      onClick={() => handleAddToWatched(movie)}
    >
      Move to 'Watched list'
    </button>
  );
};