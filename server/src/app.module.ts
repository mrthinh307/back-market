import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { ProductVariantModule } from './product-variant/product-variant.module';
import { ProductModule } from './product/product.module';
import { RedisCacheModule } from './cache/redis-cache.module';
import { CartModule } from './cart/cart.module';
import { HealthController } from './common/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisCacheModule,
    AuthModule,
    AdminModule,
    UserModule,
    PrismaModule,
    ProductModule,
    ProductVariantModule,
    CartModule
  ],
  controllers: [HealthController],
})
export class AppModule {}
