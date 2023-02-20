import { FC } from 'react';
import './MoviesList.scss';
import { MovieCard } from '../MovieCard';
import { Movie } from '../../types/Movie';
import { ButtonMoveToWatchList } from './ButtonMoveToWatchList';

type Props = {
  movies: Movie[];
  deleteMovie: (id: string) => void;
  withButtons?: boolean;
};

export const MoviesList: FC<Props> = ({ movies, deleteMovie, withButtons }) => {

  return (
    <div className="movies">
      {movies.map((movie) => (
        <div key={movie.imdbId} className="card movie is-relative">
          <div>
            <MovieCard movie={movie} />

            <button
              className="delete is-medium movie__delete"
              onClick={() => deleteMovie(movie.imdbId)}
            ></button>
          </div>
          {withButtons && (
            <ButtonMoveToWatchList  movie={movie} />
          )}
        </div>
      ))}
    </div>
  );
};
