import { useCallback, useState, useEffect } from "react";
import { FindMovie } from "../../components/FindMovie";
import { MoviesList } from "../../components/MoviesList";
import { Movie } from "../../types/Movie";
import './MoviesListPage.scss';

export const MoviesListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const movies: Movie[] = JSON.parse(localStorage.getItem("movies") as string);
    
    if (movies) {
      setMovies(movies);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const handleAddMovie = useCallback((newMovie: Movie) => {
    setMovies((currentMovies) => [...currentMovies, newMovie]);
  }, []);

  const handleDeleteMovie = useCallback((id: string) => {
    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.imdbId !== id)
    );
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList
          movies={movies}
          deleteMovie={handleDeleteMovie}
          withButtons={true}
        />
      </div>

      <div className="sidebar">
        <FindMovie movies={movies} addMovie={handleAddMovie} />
      </div>
    </div>
  );
};
