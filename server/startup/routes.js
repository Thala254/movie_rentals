import express from 'express';
import router from '../routes';

const {
  users,
  auth,
  movies,
  genres,
  customers,
} = router;

export default function (app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/movies', movies);
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
}
