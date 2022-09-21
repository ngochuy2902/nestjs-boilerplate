import { MigrationInterface, QueryRunner } from 'typeorm';

import { Role, User, UserRole } from '@entity';
import { SYSTEM_DEFAULT } from '@share/constant/common.constant';
import { RoleEnum } from '@share/enum/role.enum';
import { EncryptionUtil } from '@util/encryption.util';

export class InitDefaultData1729707425396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const superAdmin: Partial<User> = {
      email: 'superadmin@mail.com',
      password: await EncryptionUtil.generateHash('admin@123'),
      name: 'Super Admin',
    };
    const admin: Partial<User> = {
      email: 'admin@mail.com',
      password: await EncryptionUtil.generateHash('admin@123'),
      name: 'Admin',
    };
    const user: Partial<User> = {
      email: 'user@mail.com',
      password: await EncryptionUtil.generateHash('user@123'),
      name: 'User',
    };
    await queryRunner.query(`
        INSERT INTO users (id, email, password, name, createdBy, updatedBy)
        VALUES
            (1, '${superAdmin.email}', '${superAdmin.password}', '${superAdmin.name}', ${SYSTEM_DEFAULT}, ${SYSTEM_DEFAULT}),
            (2, '${admin.email}', '${admin.password}', '${admin.name}', ${SYSTEM_DEFAULT}, ${SYSTEM_DEFAULT}),
            (3, '${user.email}', '${user.password}', '${user.name}', ${SYSTEM_DEFAULT}, ${SYSTEM_DEFAULT});
    `);

    const superAdminRole: Partial<Role> = {
      id: 1,
      name: RoleEnum.SUPER_ADMIN,
      createdBy: SYSTEM_DEFAULT,
      updatedBy: SYSTEM_DEFAULT,
    };
    const adminRole: Partial<Role> = {
      id: 2,
      name: RoleEnum.ADMIN,
      createdBy: SYSTEM_DEFAULT,
      updatedBy: SYSTEM_DEFAULT,
    };
    const userRole: Partial<Role> = {
      id: 3,
      name: RoleEnum.USER,
      createdBy: SYSTEM_DEFAULT,
      updatedBy: SYSTEM_DEFAULT,
    };
    await Role.getRepository().save([superAdminRole, adminRole, userRole]);

    const superAdminUserRole: Partial<UserRole> = {
      id: 1,
      userId: 1,
      roleId: 1,
      createdBy: SYSTEM_DEFAULT,
      updatedBy: SYSTEM_DEFAULT,
    };
    const adminUserRole: Partial<UserRole> = {
      id: 2,
      userId: 2,
      roleId: 2,
      createdBy: SYSTEM_DEFAULT,
      updatedBy: SYSTEM_DEFAULT,
    };
    const userUserRole: Partial<UserRole> = {
      id: 3,
      userId: 3,
      roleId: 3,
      createdBy: SYSTEM_DEFAULT,
      updatedBy: SYSTEM_DEFAULT,
    };
    await UserRole.getRepository().save([superAdminUserRole, adminUserRole, userUserRole]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
