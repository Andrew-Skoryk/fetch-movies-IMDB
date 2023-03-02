import { v4 as uuid } from 'uuid';

export interface Movie {
  id: ReturnType<typeof uuid>;
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  rating?: number;
}
