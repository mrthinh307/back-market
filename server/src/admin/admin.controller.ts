import { Controller, Get, UseGuards } from '@nestjs/common';

import { Roles } from '../auth/decorator';
import { JwtGuard, RoleGuard } from '../auth/guard';

@UseGuards(JwtGuard, RoleGuard)
@Roles(['admin'])
@Controller('admin')
export class AdminController {
  @Get('admin-stuff')
  getAdminStuff() {
    return { secure: true };
  }
}
