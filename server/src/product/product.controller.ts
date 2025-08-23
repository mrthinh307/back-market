import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  // Product-related endpoints will be added here
  // Variant selection logic has been moved to ProductVariantController
}
