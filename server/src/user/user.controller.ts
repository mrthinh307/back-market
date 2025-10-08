import { Controller, Get, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { User } from 'src/auth/auth.types';
import { UserService } from './user.service';
import { UserAddressDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Get('me/address')
  async getMyAddress(@GetUser() user: User) {
    const res = await this.userService.getUserAddress(user.id);
    return res || null;
  }

  @Post('me/address')
  async saveMyAddress(@GetUser() user: User, @Body() addressDto: UserAddressDto) {
    return await this.userService.createOrUpdateUserAddress(user.id, addressDto);
  }

  @Delete('me/address')
  async deleteMyAddress(@GetUser() user: User) {
    return await this.userService.deleteUserAddress(user.id);
  }
}
