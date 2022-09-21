import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { SES } from '@aws-sdk/client-ses';
import { ApplicationConfig } from '@config/application.config';

import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          SES: new SES({
            apiVersion: '2010-12-01',
            region: ApplicationConfig.aws.region,
          }),
        },
        template: {
          dir: join(__dirname, 'template'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
