import { Global, Module } from '@nestjs/common';

import { AppLogger } from '@share/module/logger/app-logger.service';

@Global()
@Module({
  imports: [],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class ShareModule {}
