import 'reflect-metadata';
import app from './app';
import { PORT } from './common/config';
import logger from './common/logger';

process.on('uncaughtException', (error: Error): void => {
  logger.error('Uncaught Exception:', { error, stack: error.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>): void => {
  logger.error('Unhandled Rejection:', { reason, promise });
  process.exit(1);
});

app.listen(PORT, (): void => {
  logger.info(`App is running on http://localhost:${PORT}`);
});
