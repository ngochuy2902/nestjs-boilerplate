import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import * as dotenv from 'dotenv';

import { OrmLogger } from '../config/logger/orm-logger.config';
import { AppLogger } from '../config/logger/app-logger.config';

dotenv.config({ path: '.env' });

export const OrmConfig = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'nestjs-db',
  entities: [__dirname + '/../entity/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
  timezone: 'Z',
  dateStrings: true,
  charset: 'utf8mb4',
  synchronize: false,
  logging: ['query', 'error'],
  logger: new OrmLogger(new AppLogger()),
} as unknown as TypeOrmModuleOptions;

export default new DataSource(OrmConfig as DataSourceOptions);
