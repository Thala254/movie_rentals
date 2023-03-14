import express from 'express';
import config from 'config';
import { env } from 'process';
import db from './startup/db';
import cors from './startup/cors';
import routes from './startup/routes';
import getAccessKey from './startup/config';
import validation from './startup/validation';
import { logger } from './startup/logging';

require('express-async-errors');

const app = express();
const port = env.PORT || config.get('port');

cors(app);
routes(app);
db();
getAccessKey();
validation();

const server = app.listen(port, () => logger.info(`Listening on port ${port}`));

export default server;
