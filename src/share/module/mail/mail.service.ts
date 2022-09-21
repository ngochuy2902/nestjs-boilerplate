import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { ApplicationConfig } from '@config/application.config';
import { AppLogger } from '@config/logger/app-logger.config';

@Injectable()
export class MailService {
  private readonly activation: boolean;

  constructor(
    private readonly mailerService: MailerService,
    private readonly log: AppLogger,
  ) {
    this.log.setContext(MailService.name);
    this.activation = ApplicationConfig.mail.activation;
  }

  async sendUserInfo(email: string, password: string): Promise<void> {
    if (!this.activation) {
      this.log.info(`Email won't be sent because MAIL_ACTIVATION isn't set TRUE`);
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
      this.log.info(`Email has been sent to ${email} successfully`);
    } catch (error) {
      this.log.error(`Email has not been sent to ${email} failed with error #`, error);
    }
  }
}
