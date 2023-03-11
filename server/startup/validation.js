import Joi from 'joi';

export default function () {
  Joi.objectId = require('joi-objectid')(Joi);
}
