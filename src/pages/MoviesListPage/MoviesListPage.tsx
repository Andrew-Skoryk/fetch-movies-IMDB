import { useCallback, useState } from "react";
import { FindMovie } from "../../components/FindMovie";
import { MoviesList } from "../../components/MoviesList";
import { Movie } from "../../types/Movie";
import './MoviesListPage.scss';

export const MoviesListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleAddMovie = useCallback((newMovie: Movie) => {
    setMovies((currentMovies) => [...currentMovies, newMovie]);
  }, []);
  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>

      <div className="sidebar">
        <FindMovie movies={movies} addMovie={handleAddMovie} />
      </div>
    </div>
  );
};
