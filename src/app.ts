import express, { Express, Request, Response } from 'express';
import requestLogger from './middleware/requestLogger.middleware';
import { errorHandler } from './middleware/errorHandler.middleware';
import scheduleRouter from './resources/schedule/schedule.router';
import priceRouter from './resources/price/price.router';
import tourRouter from './resources/tour/tour.router';

const app: Express = express();

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
