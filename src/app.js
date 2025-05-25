import express from 'express';

import scheduleRouter from './resources/schedule/schedule.router.js';
import priceRouter from './resources/price/price.router.js';
import tourRouter from './resources/tour/tour.router.js';

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/tours', tourRouter);
app.use('/schedules', scheduleRouter);
app.use('/prices', priceRouter);

export default app;
