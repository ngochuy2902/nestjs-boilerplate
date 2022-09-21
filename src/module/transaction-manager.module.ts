import { Module } from '@nestjs/common';
import { TransactionManager } from '../database/transaction-manager';

@Module({
  imports: [],
  providers: [TransactionManager],
  exports: [TransactionManager],
})
export class TransactionManagerModule {}
