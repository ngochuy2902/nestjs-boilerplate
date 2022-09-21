import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { MailService } from './mail.service';
import { ApplicationConfig } from '@config/application.config';
import { AppLoggerModule } from '@config/logger/app-logger.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: ApplicationConfig.mail.host,
          port: ApplicationConfig.mail.port,
          auth: {
            user: ApplicationConfig.mail.user,
            pass: ApplicationConfig.mail.pass,
          },
          secure: false,
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
    AppLoggerModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
