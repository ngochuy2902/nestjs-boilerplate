import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';

import { ApplicationConfig } from '@config/application.config';
import { AppLogger } from '@config/logger/app-logger.config';
import { ValidationConfig } from '@config/validation.config';
import { User, UserRole } from '@entity';
import { ExceptionsFilter } from '@middleware/exceptions.filter';
import { AppModule } from '@module/app.module';
import { DatabaseUtil } from '@test-util/database.util';
import { StartedMySqlContainer } from '@testcontainers/mysql/build/mysql-container';

import { createTestDataSource } from './test-datasource';

let appInstance: INestApplication;
let dataSource: DataSource;
let container: StartedMySqlContainer;
let moduleFixture: TestingModule;

export async function initializeTestApp() {
  const {
    testDataSource,
    dataSourceOptions,
    container: mysqlContainer,
  } = await createTestDataSource();

  dataSource = testDataSource;
  container = mysqlContainer;

  await dataSource.runMigrations();
  await DatabaseUtil.clearData(dataSource, UserRole);
  await DatabaseUtil.clearData(dataSource, User);

  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  moduleFixture = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory() {
          return dataSourceOptions;
        },
        async dataSourceFactory(options) {
          if (!options) {
            throw new Error('Invalid options passed');
          }
          return addTransactionalDataSource(dataSource);
        },
      }),
      AppModule,
    ],
  }).compile();

  appInstance = moduleFixture.createNestApplication();
  appInstance.setGlobalPrefix(ApplicationConfig.baseUrl);
  appInstance.useGlobalFilters(new ExceptionsFilter(new AppLogger()));
  appInstance.useGlobalPipes(new ValidationPipe(ValidationConfig));
  await appInstance.init();

  return { appInstance, moduleFixture, testDataSource };
}

export async function closeTestApp() {
  await dataSource.destroy();
  await container.stop();
  await appInstance.close();
}
