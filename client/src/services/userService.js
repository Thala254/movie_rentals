import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndPoint = apiUrl + '/users';

const register = (user) => {
  return http.post(apiEndpont, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
};

export default register;