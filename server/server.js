import { env } from 'process';
import config from 'config';
import app from './app.js';
import { logger } from './startup/logging.js';

const port = config.get('port') || 3600;
app.listen(port, () => logger.info(`Listening on port ${port}`));
