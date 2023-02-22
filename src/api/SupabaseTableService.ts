import { supabase } from './superbaseClient';
import { Movie } from '../types/Movie';

export class SupabaseTableService {
  name: string;

  constructor(name: string) {
    this.name = name;
  }


  fetchMovieList = async () => {
    const { data, error } = await supabase
      .from(this.name)
      .select()
      .order('created_at', { ascending: false });
    
    if (error) {
      return [];
    }
    
    return data;
  };

  addToMoviesList = async (newMovie: Movie) => {
    const responce = await supabase
      .from(this.name)
      .insert(newMovie);
    
    return responce;
  }; 

  deleteMovie = async (id: string) => {
    const responce = await supabase
      .from(this.name)
      .delete()
      .eq('imdbId', id);
    
    return responce;
  };

  updateMovieRating = async (id: string, rating: number) => {
    const responce = await supabase
      .from(this.name)
      .update({ rating })
      .eq('imdbId', id);
    
  return responce;
  };
}
