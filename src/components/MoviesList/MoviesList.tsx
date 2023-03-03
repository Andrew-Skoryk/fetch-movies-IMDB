import { FC } from 'react';
import './MoviesList.scss';
import { MovieCard } from '../MovieCard';
import { Movie } from '../../types/Movie';
import { ButtonMoveToWatchList } from './ButtonMoveToWatchList';
import { SelectRating } from '../SelectRating'

type Props = {
  movies: Movie[];
  deleteMovie: (id: string) => void;
  withButtons?: boolean;
};

export const MoviesList: FC<Props> = ({ movies, deleteMovie, withButtons }) => {

  return (
    <div className="movies">
      {movies.map((movie) => (
        <div key={movie.id} className="card movie is-relative">
          <div>
            <MovieCard movie={movie} />

            <button
              className="delete is-medium movie__delete"
              onClick={() => deleteMovie(movie.id)}
            ></button>
          </div>
          {withButtons ? (
            <ButtonMoveToWatchList movie={movie} />
          ) : (
            <SelectRating id={movie.id} movieRating={movie.rating || null} />
          )}
        </div>
      ))}
    </div>
  );
};
