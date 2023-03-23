import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndPoint = apiUrl + '/movies';

const movieUrl = (id) => `${apiEndPoint}/${id}`;

export const getMovies = () => http.get(apiEndPoint);

export const getMovie = (id) => http.get(movieUrl(id));

export const saveMovie = (movie) => {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndPoint, movie);
};

export const deleteMovie = (id) => http.delete(movieUrl(id));
