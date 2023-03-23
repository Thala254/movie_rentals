import React, { useState, useEffect, Fragment } from "react";
import {Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import Rentals from './components/rentals';
import Customers from './components/customers';
import CustomerForm from './components/customerForm';
import User from './components/user';
import Login from './components/login';
import Register from './components/register';
import Logout from './components/logout';
import ErrorPage from './components/notFound'
import auth from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';
import './App.css';

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <Fragment>
      <NavBar user={user} /> 
      <Routes>
        <Route index element={<Movies user={user} />} />
        <Route path='movies' element={<Movies user={user} />}/>
        <Route path='movies/:id' element={<MovieForm />} />
        <Route element={<ProtectedRoute isAllowed={!!user && user.isAdmin} redirectPath='/' />}>
          <Route path='customers' element={<Customers user={user} />} />
          <Route path='customers/:id' element={<CustomerForm />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path='rentals' element={<Rentals />} />
          <Route path='profile' element={<User />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='logout' element={<Logout />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Fragment>
  );
};

export default App;
