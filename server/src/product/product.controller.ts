import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  GetProductListQueryDto,
} from './dto/product-dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProductList(@Query() query: GetProductListQueryDto) {
    return this.productService.getProductList(
      query.categoryId,
      query?.brandId,
      query?.isExcludedBrand,
    );
  }

  // Product-related endpoints will be added here
  // Variant selection logic has been moved to ProductVariantController
}
