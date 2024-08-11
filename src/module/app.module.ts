import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { OrmConfig } from '@database/data-source';
import { AuthModule } from './auth/auth.module';
import { AppLoggerModule } from '@config/logger/app-logger.module';
import { addTransactionalDataSource, getDataSourceByName } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AppController } from '@module/app.controller';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        const testDataSourceOptionsString = process.env.TEST_DATA_SOURCE_OPTIONS;
        let testDataSourceOptions = {};
        if (testDataSourceOptionsString) {
          testDataSourceOptions = JSON.parse(testDataSourceOptionsString);
        }
        return {
          ...OrmConfig,
          ...testDataSourceOptions,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        const existingDataSource = getDataSourceByName(options.name || 'default');
        return existingDataSource || addTransactionalDataSource(new DataSource(options));
      },
    }),
    AuthModule,
    UserModule,
    PropertyModule,
    AppLoggerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
