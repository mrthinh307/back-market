import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  async getProductById(@Param('id') productId: string) {
    return this.productService.getProductById(productId);
  }
}
