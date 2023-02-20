import { Movie } from '../types/Movie';
import { supabase } from './superbaseClient';

export const fetchMovieList = async () => {
  const { data } = await supabase
    .from('watch_list')
    .select();
  
  return data;
};

export const addToMoviesList = async (newMovie: Movie) => {
  const responce = await supabase
    .from('watch_list')
    .insert(newMovie);
  
  return responce;
}; 

export const deleteMovie = async (id: string) => {
  const responce = await supabase
    .from('watch_list')
    .delete()
    .eq('imdbId', id);
  
  return responce;
};