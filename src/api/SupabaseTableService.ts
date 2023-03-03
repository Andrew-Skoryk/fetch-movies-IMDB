import { supabase } from './superbaseClient';
import { Movie } from '../types/Movie';

export class SupabaseTableService {
  name: string;

  constructor(name: string) {
    this.name = name;
  }


  fetchMovieList = async () => {
    const response = await supabase
      .from(this.name)
      .select()
      .order('created_at', { ascending: false });
   
    return response;
  };

  addToMoviesList = async (newMovie: Movie) => {
    const response = await supabase
      .from(this.name)
      .insert(newMovie);
    
    return response;
  }; 

  deleteMovie = async (id: string) => {
    return await supabase
      .from(this.name)
      .delete()
      .eq('id', id);
  };

  updateMovieRating = async (id: string, rating: number) => {
    const response = await supabase
      .from(this.name)
      .update({ rating })
      .eq('id', id);
    
    return response;
  };
}
