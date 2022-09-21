import { applyDecorators, INestApplication, Type } from '@nestjs/common';
import { ApplicationConfig } from './application.config';
import {
  SwaggerModule,
  DocumentBuilder,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginationRes } from '@share/page/response/pagination.res';
import { DataListRes } from '@share/data-list/res/data-list.res';

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
  SwaggerModule.setup(swaggerEndpoint, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      plugins: [CaseInsensitiveFilterPlugin],
    },
  });
};

const CaseInsensitiveFilterPlugin = () => ({
  fn: {
    opsFilter: (taggedOps: any, phrase: string) =>
      taggedOps.filter((tagObj: any, tag: string) =>
        tag.toLowerCase().includes(phrase.toLowerCase()),
      ),
  },
});

export const ApiKeyName = 'JWT';

export const ApiOkPaginationRes = <DataDto extends Type>(data: DataDto) => {
  return applyDecorators(
    ApiExtraModels(PaginationRes, data),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationRes) },
          {
            properties: {
              records: {
                type: 'array',
                items: { $ref: getSchemaPath(data) },
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiOkDataListRes = <DataDto extends Type>(data: DataDto) => {
  return applyDecorators(
    ApiExtraModels(DataListRes, data),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(DataListRes) },
          {
            properties: {
              records: {
                type: 'array',
                items: { $ref: getSchemaPath(data) },
              },
            },
          },
        ],
      },
    }),
  );
};
