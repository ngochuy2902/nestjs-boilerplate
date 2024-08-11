import { AppLoggerModule } from '@config/logger/app-logger.module';
import { Property } from '@entity/property.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyController } from './property.controller';
import { PropertyRepository } from './property.repossitory';
import { PropertyService } from './property.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
    AppLoggerModule,
  ],
  providers: [PropertyService, PropertyRepository],
  controllers: [PropertyController],
  exports: [PropertyService],
})
export class PropertyModule {}
