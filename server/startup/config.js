import config from 'config';
import { logger } from './logging';

const getAccess = () => {
  try {
    if (!config.get('jwtPrivateKey')) throw new Error('jwtPrivateKey is not defined');
  } catch (ex) {
    logger.error(ex.message);
  }
};

export default getAccess;
