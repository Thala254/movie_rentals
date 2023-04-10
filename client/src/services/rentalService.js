import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/rentals';

export const getRentals = () => http.get(apiEndpoint);

export const getRental = (id) => http.get(`${apiEndpoint}/${id}`);

export const saveRental = (rental) => {
  if (rental._id) {
    const body = { ...rental };
    return http.put(`${apiEndpoint}/${rental._id}`, body);
  }
  return http.post(apiEndpoint, rental);
};

export const deleteRental = (id) => http.delete(`${apiEndpoint}/${id}`);
