import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { OrmConfig } from '@database/data-source';
import { AuthModule } from './auth/auth.module';
import { AppLoggerModule } from '@config/logger/app-logger.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return OrmConfig;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    AuthModule,
    UserModule,
    AppLoggerModule,
  ],
})
export class AppModule {}
