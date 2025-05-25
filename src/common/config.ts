import * as dotenv from 'dotenv';

dotenv.config();

// environment
export const NODE_ENV: string = process.env.NODE_ENV || 'development';

// application
export const PORT: number = +(process.env.PORT || 4000);

// JWT
export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'secret-key';

// database
export const MONGO_CONNECTION_STRING: string =
  process.env.MONGO_CONNECTION_STRING || 'your-mongo-db-connection-string';

// PostgreSQL
export const POSTGRES_USER: string = process.env['POSTGRES_USER'] || 'postgres';
export const POSTGRES_PASSWORD: string = process.env['POSTGRES_PASSWORD'] || 'postgres';
export const POSTGRES_DB: string = process.env['POSTGRES_DB'] || 'tours_db';
export const POSTGRES_HOST: string = process.env['POSTGRES_HOST'] || 'localhost';
export const POSTGRES_PORT: number = +(process.env['POSTGRES_PORT'] || 5432);

export const config = {
  NODE_ENV,
  PORT,
  JWT_SECRET_KEY,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT
};