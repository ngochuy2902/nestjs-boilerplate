import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '@module/app.module';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { createTestDataSource } from './test-datasource';
import { StartedMySqlContainer } from '@testcontainers/mysql/build/mysql-container';
import { ExceptionsFilter } from '@middleware/exceptions.filter';
import { AppLogger } from '@config/logger/app-logger.config';
import { ApplicationConfig } from '@config/application.config';
import { ValidationConfig } from '@config/validation.config';
import { DatabaseUtil } from '@test-util/database.util';
import { User } from '@entity/user.entity';
import { UserRole } from '@entity/user-role.entity';

let appInstance: INestApplication;
let dataSource: DataSource;
let container: StartedMySqlContainer;
let moduleFixture: TestingModule;

export async function initializeTestApp() {
  const {
    testDataSource,
    testDataSourceOptions,
    container: mysqlContainer,
  } = await createTestDataSource();

  dataSource = testDataSource;
  container = mysqlContainer;

  await dataSource.runMigrations();
  await DatabaseUtil.clearData(dataSource, User);
  await DatabaseUtil.clearData(dataSource, UserRole);

  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  moduleFixture = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory() {
          return testDataSourceOptions;
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
