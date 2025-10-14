import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request: Express.Request = context.switchToHttp().getRequest();
    const user = request.user;

    if (
      !user ||
      typeof user !== 'object' ||
      !('role' in user) ||
      typeof user.role !== 'string'
    ) {
      return false;
    }

    return requiredRoles.includes(user.role.toLowerCase());
  }
}
