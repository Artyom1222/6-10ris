import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from '../config';
import { Tour } from '../../resources/tour/tour.entity';
import { Schedule } from '../../resources/schedule/schedule.entity';
import { Price } from '../../resources/price/price.entity';
import { Admin } from '../../resources/admin/admin.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  synchronize: false,
  logging: config.NODE_ENV !== 'production',
  entities: [Tour, Schedule, Price, Admin],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
  entitySkipConstructor: true
});
