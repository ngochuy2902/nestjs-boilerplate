import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class InitDatabase1729707355853 implements MigrationInterface {
  name = 'InitDatabase1729707355853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'int unsigned',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(30)',
            isNullable: false,
          },
          {
            name: 'createdBy',
            type: 'int unsigned',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime(3)',
            default: 'CURRENT_TIMESTAMP(3)',
          },
          {
            name: 'updatedBy',
            type: 'int unsigned',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'datetime(3)',
            onUpdate: 'CURRENT_TIMESTAMP(3)',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'userRoles',
        columns: [
          {
            name: 'id',
            type: 'int unsigned',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int unsigned',
            isNullable: false,
          },
          {
            name: 'roleId',
            type: 'int unsigned',
            isNullable: false,
          },
          {
            name: 'createdBy',
            type: 'int unsigned',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime(3)',
            default: 'CURRENT_TIMESTAMP(3)',
          },
          {
            name: 'updatedBy',
            type: 'int unsigned',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'datetime(3)',
            onUpdate: 'CURRENT_TIMESTAMP(3)',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int unsigned',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'authId',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'activated',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'createdBy',
            type: 'int unsigned',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime(3)',
            default: 'CURRENT_TIMESTAMP(3)',
          },
          {
            name: 'updatedBy',
            type: 'int unsigned',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'datetime(3)',
            onUpdate: 'CURRENT_TIMESTAMP(3)',
            isNullable: true,
          },
        ],
        uniques: [
          {
            name: 'idx_users_email',
            columnNames: ['email'],
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'userRoles',
      new TableForeignKey({
        name: 'fk_userRoles_userId',
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'userRoles',
      new TableForeignKey({
        name: 'fk_userRoles_roleId',
        columnNames: ['roleId'],
        referencedTableName: 'roles',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userRoles');
    await queryRunner.dropTable('roles');
    await queryRunner.dropTable('users');
  }
}
