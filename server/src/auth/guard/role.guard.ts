import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<string>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) return true;

    const request: Express.Request = context.switchToHttp().getRequest();
    const user = request.user as { role: string };

    if (!user || !user.role) return false;

    return user.role.toLowerCase() === requiredRole.toLowerCase();
  }
}