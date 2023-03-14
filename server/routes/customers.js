import { Router } from 'express';
import _ from 'lodash';
import { Customer, validateCustomer } from '../models/customer';
import auth from '../middleware/auth';

const router = Router();

router.get('/', [auth], async (req, res) => {
  const customers = await Customer.find().select('-__v').sort('name');
  return res.send(customers);
});

router.post('/', [auth], async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const { name, telephone, isGold } = req.body;

  let customer = await Customer.findOne({ telephone });
  if (customer) return res.status(400).send('Customer already registered.');

  customer = new Customer({
    name,
    telephone,
    isGold,
  });

  await customer.save();
  return res.send(_.pick(customer, ['name', 'isGold', 'telephone', '_id']));
});

router.get('/:id', [auth], async (req, res) => {
  const customer = await Customer.findById(req.params.id).select('-__v');
  if (!customer) return res.status(404).send('Not found');
  return res.send(customer);
});

router.put('/:id', [auth], async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const { name, isGold, telephone } = req.body;
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name, isGold, telephone },
    { new: true },
  ).select('-__v');

  if (!customer) return res.status(404).send('Not found');
  return res.send(customer);
});

router.delete('/:id', [auth], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id).select('-__v');
  if (!customer) return res.status(404).send('Not found');
  return res.send(customer);
});

export default router;
