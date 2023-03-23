import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndPoint = apiUrl + '/genres';

const genreUrl = (id) => `${apiEndPoint}/${id}`;

export const getGenres = () => http.get(apiEndPoint);

export const getGenre = (id) => http.get(genreUrl(id));

export const saveGenre = (genre) => {
  if (genre._id) {
    const body = { ...genre };
    delete body._id;
    return http.put(genreUrl(genre._id), body);
  }

  return http.post(apiEndpont, genre);
};

export const deleteGenre = (id) => http.delete(genreUrl(id));
