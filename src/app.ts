import express, { Express, Request, Response } from 'express';
import 'reflect-metadata';
import { AppDataSource } from './common/database/data-source';
import requestLogger from './middleware/requestLogger.middleware';
import { errorHandler } from './middleware/errorHandler.middleware';
import scheduleRouter from './resources/schedule/schedule.router';
import priceRouter from './resources/price/price.router';
import tourRouter from './resources/tour/tour.router';
import logger from './common/logger';

const app: Express = express();

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    logger.info('База данных успешно инициализирована');
  })
  .catch((err) => {
    logger.error('Ошибка при инициализации базы данных', { error: err });
  });

app.use(requestLogger);
app.use(express.json());

app.use('/', (req: Request, res: Response, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/tours', tourRouter);
app.use('/schedules', scheduleRouter);
app.use('/prices', priceRouter);

app.use(errorHandler);

export default app;
