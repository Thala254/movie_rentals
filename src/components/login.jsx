import React from 'react';
import { Navigate } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';

class Login extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const loginRedirectUrl = process.env.NODE_ENV === 'production' ? 'https://comfy-profiterole-fbaf69.netlify.app/movies' : '/movies';
      auth.login(data.username, data.password).then((res) => {
        window.location = loginRedirectUrl;
      });
      // window.location = '/movies';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Navigate to='/movies' />;
  
    return (
      <div className='container'>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default Login;
