import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ValidatorException } from '@exception/validator.exception';

@Injectable()
export class TransactionManager {
  private readonly context: string;

  constructor(private readonly dataSource: DataSource) {
    this.context = TransactionManager.name;
  }

  async create(): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    return queryRunner;
  }

  async commit(transaction: QueryRunner): Promise<void> {
    await transaction.commitTransaction();
    await transaction.release();
  }

  async rollBack(transaction: QueryRunner, error: any): Promise<void> {
    await transaction.rollbackTransaction();
    await transaction.release();
    throw new ValidatorException(error);
  }
}
