import { Request, Response } from 'express';
import logger from '../common/logger';

export const errorHandler = (
  err: Error, 
  req: Request<unknown, unknown, unknown>,
  res: Response,
): void => {
  logger.error(`${err.name}: ${err.message}`, { 
    error: err,
    stack: err.stack,
    url: req.originalUrl, 
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params
  });
  
  res.status(500).json({ 
    message: 'Internal Server Error' 
  });
};
