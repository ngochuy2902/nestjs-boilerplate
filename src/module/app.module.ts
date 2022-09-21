import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from '../database/data-source';
import { AuthModule } from './auth.module';
import { AppLoggerModule } from './app-logger.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), AuthModule, UserModule, AppLoggerModule],
})
export class AppModule {}
