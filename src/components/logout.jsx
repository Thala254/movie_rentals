import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../services/authService';

const Logout = () => {
  useEffect(() => {
    auth.logout();
    window.location = '/movies';
  },[]);
  
  return;
};

export default Logout;
