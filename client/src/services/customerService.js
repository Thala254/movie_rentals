import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/customers';

export const getCustomers = () => http.get(apiEndpoint);

export const getCustomer = (id) => http.get(`${apiEndpoint}/${id}`);

export const saveCustomer = (customer) => {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(`${apiEndpoint}/${customer._id}`, body);
  }
  return http.post(apiEndpoint, customer);
};

export const deleteCustomer = (id) => http.delete(`${apiEndpoint}/${id}`);
