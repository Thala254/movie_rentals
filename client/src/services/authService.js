import jwtDecode from 'jwt-decode';
import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndPoint = apiUrl + '/auth';
const tokenKey = 'token';

export const getJwt = () => localStorage.getItem(tokenKey);
http.setJwt(getJwt());

export const login = async (email, password) => {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
};

export const loginWithJwt = (jwt) => localStorage.setItem(tokenKey, jwt);

export const logout = () => localStorage.removeItem(tokenKey);

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
