import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource, getDataSourceByName } from 'typeorm-transactional';

import { OrmConfig } from '@database/data-source';
import { AppController } from '@module/app.controller';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

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
  ],
  controllers: [AppController],
})
export class AppModule {}
