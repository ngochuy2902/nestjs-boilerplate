import { SetMetadata } from '@nestjs/common';

import { RoleEnum } from '@share/enum/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]): any => SetMetadata(ROLES_KEY, roles);
