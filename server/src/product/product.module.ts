import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
})

export class ProductModule {}