import { Module } from '@nestjs/common';

import { AppLoggerModule } from '@config/logger/app-logger.module';
import { AxiosService } from '@share/module/axios/axios.service';

@Module({
  imports: [AppLoggerModule],
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule {}
