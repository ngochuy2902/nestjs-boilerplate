import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../entity/user.entity';
import { RoleType } from '../../module/user/dto/enum/role-type';
import { Role } from '../../entity/role.entity';
import { UserRole } from '../../entity/user-role.entity';
import { EncryptionUtil } from '@util/encryption.util';

export class initDefaultData1663858175107 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordHash = await EncryptionUtil.generateHash('password');

    const admin: Partial<User> = {
      id: 1,
      email: 'admin@localhost.com',
      password: passwordHash,
      name: 'Admin',
      createdBy: 1,
      updatedBy: 1,
    };
    const user: Partial<User> = {
      id: 2,
      email: 'user@localhost.com',
      password: passwordHash,
      name: 'User',
      createdBy: 1,
      updatedBy: 1,
    };
    await User.getRepository().save([admin, user]);

    const adminRole: Partial<Role> = {
      id: 1,
      name: RoleType.ADMIN,
      createdBy: 1,
      updatedBy: 1,
    };
    const userRole: Partial<Role> = {
      id: 2,
      name: RoleType.USER,
      createdBy: 1,
      updatedBy: 1,
    };
    await Role.getRepository().save([adminRole, userRole]);

    const adminUserRole: Partial<UserRole> = {
      id: 1,
      userId: 1,
      roleId: 1,
      createdBy: 1,
      updatedBy: 1,
    };
    const userUserRole: Partial<UserRole> = {
      id: 2,
      userId: 2,
      roleId: 2,
      createdBy: 1,
      updatedBy: 1,
    };
    await UserRole.getRepository().save([adminUserRole, userUserRole]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
