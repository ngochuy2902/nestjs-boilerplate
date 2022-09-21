import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PERMIT_ALL_KEY } from '@security/decorator/permit-all.decorator';
import { RoleEnum } from '@share/enum/role.enum';

import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permitAll = this.reflector.getAllAndOverride<boolean>(PERMIT_ALL_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (permitAll) {
      return true;
    }
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles.split(',').includes(role));
  }
}
