import { supabase } from './superbaseClient';


export const fetchWatched = async () => {
  const { data } = await supabase
    .from('watched_list')
    .select();
  
  return data;
};
