import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/customers';

export async function getCustomers () {
  return await http.get(apiEndpoint); 
}

export async function getCustomer (id) {
  return await http.get(`${apiEndpoint}/${id}`);
}

export async function saveCustomer (customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return await http.put(`${apiEndpoint}/${customer._id}`, body);
  }
  return await http.post(apiEndpoint, customer);
}

export async function deleteCustomer (id) {
  return await http.delete(`${apiEndpoint}/${id}`);
}
