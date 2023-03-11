import Joi from 'joi';
import moment from 'moment';
import { model, Schema } from 'mongoose';
import { userSchema } from './user';
import { movieSchema } from './movie';

export const rentalSchema = new Schema({
  customer: {
    type: userSchema,
    required: true,
  },
  movie: {
    type: movieSchema,
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

rentalSchema.statics.lookup = function (customerId, movieId) {
  return this.findOne({ 'customer._id': customerId, 'movie._id': movieId });
};

rentalSchema.methods.return = function () {
  this.dateReturned = new Date();
  const rentalDays = moment().diff(this.dateOut, 'days');
  this.rentalFee = rentalDays * this.movie.dailyRentalRate;
};

export const Rental = model('Rental', rentalSchema);

export const validateRental = (rental) => {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };
  return Joi.validate(rental, schema);
};
