import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class initDatabase1663856943254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar(255)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'activated',
            type: 'bit',
            isNullable: false,
            default: 0,
          },
          {
            name: 'createdBy',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp(3)',
            default: 'CURRENT_TIMESTAMP(3)',
            isNullable: false,
          },
          {
            name: 'updatedBy',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp(3)',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(10)',
            isNullable: false,
          },
          {
            name: 'createdBy',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp(3)',
            default: 'CURRENT_TIMESTAMP(3)',
            isNullable: false,
          },
          {
            name: 'updatedBy',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp(3)',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'user_roles',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'role_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'createdBy',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp(3)',
            default: 'CURRENT_TIMESTAMP(3)',
            isNullable: false,
          },
          {
            name: 'updatedBy',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp(3)',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `users`');
    await queryRunner.query('DROP TABLE `roles`');
    await queryRunner.query('DROP TABLE `user_roles`');
  }
}
