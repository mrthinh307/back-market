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
      // 1. Delete child tables first (no dependencies)
      this.cartItem.deleteMany(),
      this.orderItem.deleteMany(),
      this.variantAttributeImage.deleteMany(),
      this.productVariantAttribute.deleteMany(),
      this.review.deleteMany(),

      // 2. Delete intermediate tables
      this.groupAttribute.deleteMany(),
      this.categoryAttribute.deleteMany(),

      // 3. Delete main entity tables with dependencies
      this.shoppingCart.deleteMany(),
      this.order.deleteMany(),
      this.productVariant.deleteMany(),
      this.product.deleteMany(),
      this.userAddress.deleteMany(),
      this.userProfile.deleteMany(),

      // 4. Delete reference tables
      this.attributeValue.deleteMany(),
      this.attribute.deleteMany(),
      this.attributeGroup.deleteMany(),
      this.category.deleteMany(),
      this.brand.deleteMany(),

      // 5. Delete user auth table last (referenced by many tables)
      this.userAuth.deleteMany(),
    ]);
    // * Based on your schema.prisma, the correct deletion order is:
    // * 1. Child tables (CartItem, OrderItem, etc.)
    // * 2. Junction/intermediate tables
    // * 3. Main entities with foreign keys
    // * 4. Reference/lookup tables
    // * 5. UserAuth (heavily referenced)
  }
}
