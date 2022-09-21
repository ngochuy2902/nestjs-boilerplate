import { INestApplication } from '@nestjs/common';
import { ApplicationConfig } from './application.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication) => {
  const swaggerEndpoint = ApplicationConfig.baseUrl + '/api-docs';
  const authHeader = ApplicationConfig.auth.authHeader;

  const options = new DocumentBuilder()
    .setTitle('API Document')
    .setVersion('0.0.1')
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: authHeader,
        description: 'Please enter your Bearer token here',
      },
      ApiKeyName,
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerEndpoint, app, document);
};

export const ApiKeyName = 'JWT';
