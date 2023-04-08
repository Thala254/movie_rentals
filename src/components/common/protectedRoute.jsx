import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({ isAllowed, redirectPath='/login', children }) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
