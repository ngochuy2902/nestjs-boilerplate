import { Module } from '@nestjs/common';

import { AppLoggerModule } from '@config/logger/app-logger.module';
import { S3Service } from '@share/module/aws/s3/s3.service';

@Module({
  imports: [AppLoggerModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
