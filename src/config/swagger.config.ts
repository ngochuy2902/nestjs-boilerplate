import { INestApplication } from '@nestjs/common';
import { applicationConfig } from './application.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication) => {
  const swaggerEndpoint = applicationConfig.baseUrl + '/api-docs';

  const options = new DocumentBuilder()
    .setTitle('API Document')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerEndpoint, app, document);
};
