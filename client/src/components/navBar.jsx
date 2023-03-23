import React, { Fragment, useState, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const NavBar = ({ user }) => {
  
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(user);
  }, [currentUser]);

  return (
    <Fragment>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' to='/movies'>Movie-Rentals</Link>
        <button
         className='navbar-toggler'
         type='button'
         data-toggle='collapse'
         data-target='#navbarNavAltMarkup'
         aria-controls='navbarNavAltMarkup'
         aria-expanded='false'
         aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'/>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <NavLink className='nav-item nav-link' to='/movies'>Movies</NavLink>
            {currentUser?.isAdmin && (
              <Fragment>
                <NavLink className='nav-item nav-link' to='/customers'>Customers</NavLink>
                <NavLink className='nav-item nav-link' to='/rentals'>Rentals</NavLink>
              </Fragment>
            )}
            {!currentUser && (
              <Fragment>
                <NavLink className='nav-item nav-link' to='/login'>Login</NavLink>
                <NavLink className='nav-item nav-link' to='/register'>SignUp</NavLink>
              </Fragment>
            )}
            {currentUser && (
              <Fragment>
                <NavLink className='nav-item nav-link' to='/profile'>{currentUser.name}</NavLink>
                <NavLink className='nav-item nav-link' to='/logout'>Logout</NavLink>
              </Fragment>
            )}
          </div>
        </div>
      </nav>
      <Outlet/>
    </Fragment>
  );
};

export default NavBar;
