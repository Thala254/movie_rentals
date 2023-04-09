import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../services/authService';

const Logout = () => {
  const logoutRedirectUrl = process.env.NODE_ENV === 'production' ? 'https://comfy-profiterole-fbaf69.netlify.app/movies' : '/movies';
  useEffect(() => {
    auth.logout();
    window.location = logoutRedirectUrl;
  },[]);
  
  return;
};

export default Logout;
