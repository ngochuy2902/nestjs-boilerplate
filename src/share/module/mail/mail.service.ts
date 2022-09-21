import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { ApplicationConfig } from '@config/application.config';
import { AppLogger } from '@config/logger/app-logger.config';
import { SendEmailOption } from '@share/module/mail/dto/send-email-option';

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
    await this.sendEmail({
      to: email,
      subject: 'Create account successfully',
      template: './send-account-info',
      context: { password, email },
    });
  }

  private async sendEmail(options: SendEmailOption): Promise<void> {
    if (!this.activation) {
      this.log.info(`Email won't be sent because MAIL_ACTIVATION isn't set TRUE`);
      return;
    }
    const { to, subject, template, context } = options;
    try {
      await this.mailerService.sendMail({
        to,
        from: ApplicationConfig.mail.from,
        subject,
        template,
        context,
      });
      this.log.info(`Email has been sent to ${to} successfully`);
    } catch (error) {
      this.log.error(`Email has not been sent to ${to} failed with error #`, error);
    }
  }
}
