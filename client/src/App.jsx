import React, { useState, useEffect, Fragment } from "react";
import {Routes, Route, useNavigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import './App.css';

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavBar user={user} />,
      children: [
        {
          index: true,
          path: 'movies',
          element: <Movies user={user} />,
        },
        {
          path: 'movies/:id',
          element: <MovieForm />, 
        },
        {
          path: 'register',
          element: <Register />, 
        },

        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'logout',
          element: <Logout />
        },
        {
          path: 'customers',
          element: <Customers user={user} />,
        },
        {
          path: 'customers/:id',
          element: <CustomerForm />,
        },
        {
          path: 'rentals',
          element: <Rentals />,
        },
        {
          path: 'profile',
          element: <User />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
    /*
    <Routes>
        <Route path='/' element={<NavBar user={user} />} />
        <Route path='movies' element={<Movies user={user} />}/>
        <Route path=':id' element={<MovieForm />} />
        <Route path='login' element={<Login />} />
        <Route path='logout' element={<Logout />} />
    </Routes>
    */
  );
};

export default App;
