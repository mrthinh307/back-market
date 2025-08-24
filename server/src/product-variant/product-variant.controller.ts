import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';

import { Roles } from 'src/auth/decorator';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { ProductVariantService } from './product-variant.service';
import { GetRelevantVariantsQueryDto } from './dto/get-relevant-variants.dto';

@Controller('variants')
export class ProductVariantController {
  constructor(private productVariantService: ProductVariantService) {}

  // Get relevant variants for product detail page
  @Get('relevant')
  getRelevantVariants(@Query() query: GetRelevantVariantsQueryDto) {
    return this.productVariantService.getRelevantVariants(query.productId, query.defaultVariantId);
  }

  // Get individual variant details (for cart, checkout, etc.)
  @Get(':id')
  async getProductVariantById(@Param('id', ParseUUIDPipe) variantId: string) {
    return this.productVariantService.getProductVariantById(variantId);
  }

  // Delete a product variant - requires authentication and admin/catalog manager role
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(['admin'])
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteProductVariant(@Param('id', ParseUUIDPipe) variantId: string): Promise<void> {
    await this.productVariantService.deleteProductVariant(variantId);
  }
}
