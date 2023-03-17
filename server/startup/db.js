import config from 'config';
import { connect } from 'mongoose';
import { logger } from './logging';

export default function () {
  const db = config.get('db');
  connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => logger.info(`Connected to ${db}...`))
    .catch((err) => logger.error(`Database is unreachable: ${err}`));
}
