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
    // Only clean user-related data, keep product data intact
    return this.$transaction([
      // 1. Delete cart and order items first (child tables with FK constraints)
      this.cartItem.deleteMany(),      // FK: cartId (ShoppingCart), productVariantId (ProductVariant)
      this.orderItem.deleteMany(),     // FK: orderId (Order), productVariantId (ProductVariant)
      
      // 2. Delete reviews (user-generated content, FK to Product/ProductVariant/UserAuth)
      this.review.deleteMany(),        // FK: productId, variantId (nullable), userId (nullable)

      // 3. Delete user's carts and orders (parent tables of items)
      this.shoppingCart.deleteMany(),  // FK: userId (UserAuth)
      this.order.deleteMany(),         // FK: userId (UserAuth, nullable)
      
      // 4. Delete user addresses and profiles (FK to UserAuth)
      this.userAddress.deleteMany(),   // FK: userId (UserAuth)
      this.userProfile.deleteMany(),   // FK: authId (UserAuth)

      // 5. Delete user auth table last (referenced by most user tables)
      this.userAuth.deleteMany(),      // Root user table
    ]);
    // * Product catalog tables are NOT cleaned:
    // * - Product, ProductVariant, ProductVariantImage
    // * - Brand, Category, Attribute, AttributeValue, AttributeGroup
    // * - ProductVariantAttribute, GroupAttribute, CategoryAttribute
    // * - VariantAttributeImage
    // * This preserves product catalog data across test runs
  }
}
