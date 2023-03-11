import Joi from 'joi';
import { model, Schema } from 'mongoose';

export const Customer = model('Customer', new Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  telephone: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
}));

export const validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    telephone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  };
  return Joi.validate(customer, schema);
};
