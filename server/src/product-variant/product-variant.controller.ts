import { Controller, Get, Param } from '@nestjs/common';
import { ProductVariantService } from './product-variant.service';

@Controller('variants')
export class ProductVariantController {
  constructor(private productVariantService: ProductVariantService) {}

  @Get(':id')
  async getProductVariantById(@Param('id') variantId: string) {
    return this.productVariantService.getProductVariantById(variantId);
  }
}
