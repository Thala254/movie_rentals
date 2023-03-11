import Joi from 'joi';
import { model, Schema } from 'mongoose';
import { genreSchema } from './genre';

export const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLenth: 5,
    maxLength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  inStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  like: {
    type: Boolean,
    default: false,
  },
});

export const Movie = model('Movie', movieSchema);

export const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.objectId().required(),
    inStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
    like: Joi.boolean(),
  });
  return schema.validate(movie);
};
