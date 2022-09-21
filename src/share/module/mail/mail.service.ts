import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { ApplicationConfig } from '@config/application.config';
import { AppLogger } from '@config/logger/app-logger.config';

@Injectable()
export class MailService {
  private readonly context: string;
  private readonly activation: boolean;

  constructor(private readonly mailerService: MailerService, private readonly log: AppLogger) {
    this.context = MailService.name;
    this.activation = ApplicationConfig.mail.activation;
  }

  async sendUserInfo(email: string, password: string): Promise<void> {
    if (!this.activation) {
      this.log.info(this.context, `Email won't be sent because the activation is set FALSE`);
      return;
    }

    try {
      await this.mailerService.sendMail({
        to: email,
        from: ApplicationConfig.mail.from,
        subject: 'Create account successfully',
        template: './send-account-info',
        context: { password, email },
      });
      this.log.info(this.context, `Email has been sent to ${email} successfully`);
    } catch (error) {
      this.log.error(
        this.context,
        `Email has not been sent to ${email} failed with error #`,
        error,
      );
    }
  }
}
