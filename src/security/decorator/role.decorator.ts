import { SetMetadata } from '@nestjs/common';

import { RoleType } from '@module/user/dto/enum/role-type';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleType[]): any => SetMetadata(ROLES_KEY, roles);
