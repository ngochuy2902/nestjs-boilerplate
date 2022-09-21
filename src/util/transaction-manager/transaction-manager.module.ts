import { Module } from '@nestjs/common';

import { TransactionManager } from './transaction-manager';

@Module({
  imports: [],
  providers: [TransactionManager],
  exports: [TransactionManager],
})
export class TransactionManagerModule {}
