import { createLogger, format, transports } from 'winston';
import * as path from 'path';
import * as fs from 'fs';

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'tours-api' },
  transports: [
    new transports.File({ 
      filename: path.join(logDir, 'combined.log') 
    }),
    new transports.File({ 
      filename: path.join(logDir, 'error.log'), 
      level: 'error' 
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

export default logger;
