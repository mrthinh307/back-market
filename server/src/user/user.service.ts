import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserAddressDto } from './dto/index';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserProfile(userId: string) {
    return await this.prisma.userAuth.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  }

  async getUserAddress(userId: string) {
    // Get the user's single address
    return await this.prisma.userAddress.findFirst({
      where: {
        userId: userId,
      },
    });
  }

  async createOrUpdateUserAddress(userId: string, data: UserAddressDto) {
    // Check if user already has an address
    const existingAddress = await this.prisma.userAddress.findFirst({
      where: {
        userId: userId,
      },
    });

    if (existingAddress) {
      // Update existing address
      return this.prisma.userAddress.update({
        where: {
          id: existingAddress.id,
        },
        data,
      });
    } else {
      // Create new address
      return await this.prisma.userAddress.create({
        data: {
          userId,
          ...data,
          isDefault: true, // Always default since it's the only one
        },
      });
    }
  }

  async deleteUserAddress(userId: string) {
    // Delete the user's address (if any)
    const existingAddress = await this.prisma.userAddress.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!existingAddress) {
      throw new Error('No address found for this user');
    }

    return await this.prisma.userAddress.delete({
      where: {
        id: existingAddress.id,
      },
    });
  }
}