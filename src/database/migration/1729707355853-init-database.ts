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
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'enum',
            enum: ['SUPER_ADMIN', 'ADMIN', 'USER'],
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
          },
          {
            name: 'updatedBy',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp(3)',
            default: 'CURRENT_TIMESTAMP(3)',
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
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'roleId',
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
          },
          {
            name: 'updatedBy',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp(3)',
            default: 'CURRENT_TIMESTAMP(3)',
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
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'activated',
            type: 'tinyint',
            default: 1,
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
          },
          {
            name: 'updatedBy',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp(3)',
            default: 'CURRENT_TIMESTAMP(3)',
            onUpdate: 'CURRENT_TIMESTAMP(3)',
            isNullable: true,
          },
        ],
        indices: [
          {
            name: 'idx_username',
            columnNames: ['username'],
            isUnique: true,
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
    await queryRunner.dropForeignKey('userRoles', 'fk_userRoles_userId');
    await queryRunner.dropForeignKey('userRoles', 'fk_userRoles_roleId');
    await queryRunner.dropTable('userRoles');
    await queryRunner.dropTable('roles');
    await queryRunner.dropTable('users');
  }
}
