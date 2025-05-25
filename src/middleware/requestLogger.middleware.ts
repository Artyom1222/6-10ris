import morgan from 'morgan';
import { Request, Response } from 'express';
import logger from '../common/logger';

const stream = {
  write: (message: string): void => {
    logger.info(message.trim());
  },
};

const requestLogger = morgan(
  (tokens, req: Request<unknown, unknown, unknown>, res: Response): string => JSON.stringify({
      method: tokens['method']?.(req, res),
      url: tokens['url']?.(req, res),
      status: tokens['status']?.(req, res),
      contentLength: tokens['res']?.(req, res, 'content-length'),
      responseTime: tokens['response-time']?.(req, res),
      query: req.query,
      body: req.body,
    }),
  { stream }
);

export default requestLogger;
