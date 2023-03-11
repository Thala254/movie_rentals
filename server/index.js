import express from 'express';
import config from 'config';
import { env } from 'process';
import db from './startup/db';
import cors from './startup/cors';
import routes from './startup/routes';
import getAccessKey from './startup/config';
import validation from './startup/validation';

const app = express();
const port = env.PORT || config.get('port');

cors(app);
routes(app);
db();
getAccessKey();
validation();

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;
