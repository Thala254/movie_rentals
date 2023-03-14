import { Router } from 'express';
import { Rental, validateRental } from '../models/rental';
import { Movie } from '../models/movie';
import auth from '../middleware/auth';
// import validateObjectId from '../middleware/validateObjectId';

const router = Router();

const postHandler = async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const { customerId, movieId } = req.body;
  const rental = await Rental.lookup(customerId, movieId);

  if (!rental) return res.status(404).send('Not found.');

  if (rental.dateReturned && rental.movie.quantity === 0) return res.status(400).send('Return already processed');

  rental.return();
  await rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id },
    { $inc: { inStock: 1 } },
  );
  return res.send(rental);
};

router.post('/', [auth, postHandler]);

export default router;
