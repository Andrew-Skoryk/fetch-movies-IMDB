import { Movie } from '../types/Movie';
import { supabase } from './superbaseClient';


export const fetchWatched = async () => {
  const { data } = await supabase
    .from('watched_list')
    .select()
    .order('created_at', { ascending: false });
  
  return data;
};

export const addToWatched = async (newMovie: Movie) => {
   const responce = await supabase
    .from('watched_list')
    .insert(newMovie);
  
  console.log(responce);
  
  return responce;
}; 
 
export const updateMovie = async (id: string, rating: number) => {
  const responce = await supabase
    .from('watched_list')
    .update({ rating })
    .eq('imdbId', id);
  
  return responce;
};

export const deleteMovie = async (id: string) => {
  const responce = await supabase
    .from('watched_list')
    .delete()
    .eq('imdbId', id);
  
  return responce;
};
