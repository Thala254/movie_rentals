// import config from 'config';
import config from 'config';
import { env } from 'process';
import { transports, format, createLogger } from 'winston';
import morgan from 'morgan';
import 'winston-mongodb';

const {
  json,
  colorize,
  combine,
  simple,
  timestamp,
  prettyPrint,
  printf,
} = format;

export const logger = createLogger({
  transports: [
    new transports.File({
      level: config.get('LOG_LEVEL') || 'error',
      filename: 'combined.log',
      format: combine(timestamp({ format: 'YYYY-MM-DD hh:mm:ss SSS A' }), json(), prettyPrint()),
    }),
    /*
    new transports.MongoDB({
      level: config.get('LOG_LEVEL') || 'error',
      db: config.get('db'),
    }),
    */
  ],
  exceptionHandlers: [
    new transports.File({
      level: config.get('LOG_LEVEL') || 'error',
      filename: 'uncaughtExceptions.log',
    }),
  ],
});

if (env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    level: config.get('LOG_LEVEL') || 'http',
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss SSS A',
      }),
      colorize(),
      simple(),
      printf((info) => `${info.level}: [${info.timestamp}] ${info.message}`),
    ),
  }));
  logger.exceptions.handle(new transports.Console({
    level: config.get('LOG_LEVEL') || 'error',
  }));
}

export const morganMiddleware = morgan(
  // ':method :url :status :res[content-length] - :response-time ms',
  (tokens, req, res) => {
    const { method, url, status } = tokens;
    return JSON.stringify({
      method: method(req, res),
      url: url(req, res),
      status: parseFloat(status(req, res)),
      content_length: tokens.res(req, res, 'content-length'),
      response_time: parseFloat(tokens['response-time'](req, res)),
    });
  },
  {
    stream: {
      write: (message) => logger.http(`incoming-request ${message}`),
    },
  },
);
