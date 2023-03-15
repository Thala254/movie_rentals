import { Router } from 'express';
import moment from 'moment';
import { Movie, validateMovie } from '../models/movie';
import { Genre } from '../models/genre';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import validateObjectId from '../middleware/validateObjectId';

const router = Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().select('-__v').sort('name');
  res.send(movies);
});

router.post('/', [auth, admin], async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(`Invalid genre: ${error.details[0].message}`);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const {
    title,
    inStock,
    dailyRentalRate,
    like,
  } = req.body;

  const movie = new Movie({
    title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    inStock,
    dailyRentalRate,
    publishDate: moment().toJSON(),
    like,
  });
  await movie.save();
  return res.send(movie);
});

router.get('/:id', [auth, validateObjectId], async (req, res) => {
  const movie = await Movie.findById(req.params.id).select('-__v');
  if (!movie) return res.status(404).send('Not found');
  return res.send(movie);
});

router.put('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const {
    title,
    inStock,
    dailyRentalRate,
    like,
  } = req.body;

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      inStock,
      dailyRentalRate,
      like,
    },
    { new: true },
  ).select('-__v');

  if (!movie) return res.status(404).send('Not found');

  return res.send(movie);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id).select('-__v');
  if (!movie) return res.status(404).send('Not found');
  return res.send(movie);
});

export default router;
