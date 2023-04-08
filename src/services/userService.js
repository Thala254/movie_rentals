import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/users';

const register = (user) => http.post(apiEndpoint, {
  email: user.username,
  password: user.password,
  name: user.name,
});

export default register;
