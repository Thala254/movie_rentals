import express from 'express';
import db from './startup/db';
import cors from './startup/cors';
import routes from './startup/routes';
import getAccessKey from './startup/config';
import validation from './startup/validation';

require('express-async-errors');

const app = express();

cors(app);
routes(app);
db();
getAccessKey();
validation();

export default app;
