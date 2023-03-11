import config from 'config';

const getAccess = () => {
  if (!config.get('jwtPrivateKey')) throw new Error('jwtPrivateKey is not dfeined');
};

export default getAccess;
