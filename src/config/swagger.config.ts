import { applyDecorators, INestApplication, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  DocumentBuilder,
  getSchemaPath,
  SwaggerModule,
} from '@nestjs/swagger';

import { ApiKeyName, AuthHeader } from '@share/constant/common.constant';
import { DataListRes } from '@share/data-list/res/data-list.res';
import { PaginationRes } from '@share/page/response/pagination.res';

import { ApplicationConfig } from './application.config';

export const swaggerConfig = (app: INestApplication) => {
  const swaggerEndpoint = ApplicationConfig.baseUrl + '/api-docs';

  const options = new DocumentBuilder()
    .setTitle('API Document')
    .setVersion('0.0.1')
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: AuthHeader,
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
