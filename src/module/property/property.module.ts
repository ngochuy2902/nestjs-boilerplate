import { AppLoggerModule } from '@config/logger/app-logger.module';
import { Property } from '@entity/property.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyController } from './property.controller';
import { PropertyRepository } from './property.repossitory';
import { PropertyService } from './property.service';
import { kafkaConfig } from '@config/kafka.config';
import { ClientsModule } from '@nestjs/microservices';


@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
    AppLoggerModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        ...kafkaConfig,
      },
    ]),
  ],
  providers: [PropertyService, PropertyRepository],
  controllers: [PropertyController],
  exports: [PropertyService],
})
export class PropertyModule {}
