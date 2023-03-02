import React from 'react';
import { Movie } from '../../types/Movie';
import './MovieCard.scss';

type Props = {
  movie: Movie,
};

export const MovieCard: React.FC<Props> = ({ movie }) => (
  <>
    <div className="card-image">
      <figure className="image is-4by3">
        <img src={movie.imgUrl} alt="Film logo" />
      </figure>
    </div>

    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <a href={movie.imdbUrl} target={"_blank"}>
            <figure className="image is-48x48">
              <img src="images/imdb-logo.jpeg" alt="imdb" />
            </figure>
          </a>
        </div>

          <p className="title is-8">{movie.title}</p>
      </div>

      <div className="content">{movie.description}</div>
    </div>
  </>
);
