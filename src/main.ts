import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';

import { AppModule } from '@module/app.module';
import { ApplicationConfig } from '@config/application.config';
import { swaggerConfig } from '@config/swagger.config';
import { ExceptionsFilter } from '@middleware/exceptions.filter';
import { AppLogger } from '@config/logger/app-logger.config';
import { ValidationConfig } from '@config/validation.config';
import { initializeTransactionalContext, StorageDriver } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  const app = await NestFactory.create(AppModule);
  const serverPort = ApplicationConfig.serverPort;
  const baseUrl = ApplicationConfig.baseUrl;

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  app.setGlobalPrefix(baseUrl);
  app.useGlobalFilters(new ExceptionsFilter(new AppLogger()));
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));

  swaggerConfig(app);

  await app.listen(serverPort);

  Logger.log(`Server is ready at http://localhost:${serverPort}`);
  Logger.log(`Swagger is ready at http://localhost:${serverPort}${baseUrl}/api-docs`);
}
void bootstrap();
