import { SetMetadata } from '@nestjs/common';

/**
 * A decorator that sets the required roles for a route.
 * @param role - The roles that are required to access the route.
 * @returns A metadata key with the specified roles.
 */
export const Roles = (roles: string[]) => SetMetadata('roles', roles);
