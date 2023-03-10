import { FC, FormEvent, useState, memo, ChangeEvent } from "react";
import cn from "classnames";
import { getMovie } from "../../api/imdbFetch";
import { Movie } from "../../types/Movie";
import { MovieCard } from "../MovieCard";
import { v4 as uuid } from "uuid";
import "./FindMovie.scss";

type Props = {
  movies: Movie[];
  addMovie: (newMovie: Movie) => void;
};

export const FindMovie: FC<Props> = memo(({ movies, addMovie }) => {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isIncluded, setIsIncluded] = useState(false);

  const includedInList = movies.some(({ imdbId }) => imdbId === movie?.imdbId);

  const handleFind = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMovie(null);

    try {
      const responseFromServer = await getMovie(query);

      if ("imdbID" in responseFromServer) {
        const { Poster, Title, Plot, imdbID } = responseFromServer;

        const newMovie = {
          id: uuid(),
          title: Title,
          description: Plot,
          imgUrl:
            Poster !== "N/A"
              ? Poster
              : (process.env.REACT_APP_DEAFULT_PICTURE as string),
          imdbUrl: `https://www.imdb.com/title/${imdbID}`,
          imdbId: imdbID,
        };

        setMovie(newMovie);
      } else {
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setQuery("");

    if (!includedInList && movie) {
      addMovie(movie);
    } else {
      setIsIncluded(true);
    }

    setMovie(null);
  };

  const handleInpute = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsError(false);
    setIsIncluded(false);
  };

  return (
    <>
      <form className="find-movie">
        <div className="field">
          <label className="label" htmlFor="movie-title">
            Movie title
          </label>

          <div className="control">
            <input
              type="text"
              id="movie-title"
              placeholder="Enter a title to search"
              className="input is-dander"
              value={query}
              onChange={handleInpute}
            />
          </div>
          {isError && (
            <p className="help is-danger">
              Can&apos;t find a movie with such a title
            </p>
          )}
          {isIncluded && (
            <p className="help is-danger">The movie is already on the list</p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={cn("button", "is-light", {
                "is-loading": isLoading,
              })}
              disabled={!query.length}
              onClick={handleFind}
            >
              Find a movie
            </button>
          </div>

          {movie && (
            <div className="control">
              <button
                type="button"
                className="button is-primary"
                onClick={handleAdd}
              >
                Add to the watch list
              </button>
            </div>
          )}
        </div>
      </form>

      {movie && (
        <div className="container">
          <h2 className="title">Preview</h2>

          <MovieCard movie={movie} />
        </div>
      )}
    </>
  );
});
