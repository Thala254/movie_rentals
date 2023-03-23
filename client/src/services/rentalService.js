import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/rentals';

export async function getRentals () {
  return await http.get(apiEndpoint); 
}

export async function getRental (id) {
  return await http.get(`${apiEndpoint}/${id}`);
}

export async function saveRental (rental) {
  if (rental._id) {
    const body = { ...rental };
    return await http.put(`${apiEndpoint}/${rental._id}`, body);
  }
  return await http.post(apiEndpoint, rental);
}

export async function deleteRental (id) {
  return await http.delete(`${apiEndpoint}/${id}`);
}
