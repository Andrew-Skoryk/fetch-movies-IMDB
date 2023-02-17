import axios from 'axios';
import { MovieData } from '../types/MovieData';
import { ResponseError } from '../types/ReponseError';

export async function getMovie(query: string): Promise<MovieData | ResponseError> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}&t=${query}`);

      return response.data;
  } catch (error) {
      return {
        Response: 'False',
        Error: 'unexpected error',
      };
  }
}
