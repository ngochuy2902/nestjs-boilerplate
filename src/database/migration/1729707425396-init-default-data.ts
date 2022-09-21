import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '@entity/user.entity';
import { EncryptionUtil } from '@util/encryption.util';
import { Role } from '@entity/role.entity';
import { RoleEnum } from '@share/enum/role.enum';
import { UserRole } from '@entity/user-role.entity';

export class InitDefaultData1729707425396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const superAdmin: Partial<User> = {
      username: 'superadmin',
      password: await EncryptionUtil.generateHash('admin@123'),
      name: 'Super Admin',
    };
    const admin: Partial<User> = {
      username: 'admin',
      password: await EncryptionUtil.generateHash('admin@123'),
      name: 'Admin',
    };
    const user: Partial<User> = {
      username: 'user',
      password: await EncryptionUtil.generateHash('user@123'),
      name: 'User',
    };
    await queryRunner.query(`
        INSERT INTO users (id, username, password, name, createdBy, updatedBy)
        VALUES
            (1, '${superAdmin.username}', '${superAdmin.password}', '${superAdmin.name}', 1, 1),
            (2, '${admin.username}', '${admin.password}', '${admin.name}', 1, 1),
            (3, '${user.username}', '${user.password}', '${user.name}', 1, 1);
    `);

    const superAdminRole: Partial<Role> = {
      id: 1,
      name: RoleEnum.SUPER_ADMIN,
      createdBy: 1,
      updatedBy: 1,
    };
    const adminRole: Partial<Role> = {
      id: 2,
      name: RoleEnum.ADMIN,
      createdBy: 1,
      updatedBy: 1,
    };
    const userRole: Partial<Role> = {
      id: 3,
      name: RoleEnum.USER,
      createdBy: 1,
      updatedBy: 1,
    };
    await Role.getRepository().save([superAdminRole, adminRole, userRole]);

    const superAdminUserRole: Partial<UserRole> = {
      id: 1,
      userId: 1,
      roleId: 1,
      createdBy: 1,
      updatedBy: 1,
    };
    const adminUserRole: Partial<UserRole> = {
      id: 2,
      userId: 2,
      roleId: 2,
      createdBy: 1,
      updatedBy: 1,
    };
    const userUserRole: Partial<UserRole> = {
      id: 3,
      userId: 3,
      roleId: 3,
      createdBy: 1,
      updatedBy: 1,
    };
    await UserRole.getRepository().save([superAdminUserRole, adminUserRole, userUserRole]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
