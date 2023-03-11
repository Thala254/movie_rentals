import { Router } from 'express';
import { Customer, validateCustomer } from '../models/customer';
import auth from '../middleware/auth';

const router = Router();

router.get('/', [auth], async (req, res) => {
  const customers = await Customer.find().select('-__v').sort('name');
  return res.send(customers);
});

export default router;
