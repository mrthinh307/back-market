import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([
      this.review.deleteMany(),
      this.order.deleteMany(),
      this.productImage.deleteMany(),
      this.product.deleteMany(),
      this.category.deleteMany(),
      this.user.deleteMany(),
    ]);
    // * Based on your schema.prisma, the correct deletion order is:

    // Review (depends on User and Product)

    // Order (depends on User and Product)

    // ProductImage (depends on Product)

    // Product (depends on User and Category)

    // Category (parent of Product)

    // User (parent of Product, Order, and Review)
  }
}
