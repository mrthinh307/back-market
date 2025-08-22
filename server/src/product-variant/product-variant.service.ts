import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AttributeDto,
  ProductVariantDetailDto,
} from './dto/product-variant-detail.dto';
import { generateSku } from 'src/common/utils/string';

@Injectable()
export class ProductVariantService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductVariantById(
    variantId: string,
  ): Promise<ProductVariantDetailDto> {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      include: {
        product: {
          include: {
            brand: true,
            category: true,
          },
        },
        attributes: {
          include: {
            attribute: true,
            value: true,
          },
          orderBy: {
            attributeId: 'asc',
          },
        },
      },
    });

    if (!variant) {
      throw new NotFoundException('Product variant not found');
    }

    const attributes: AttributeDto[] = variant.attributes.map((attr) => ({
      id: attr.attribute.id,
      code: attr.attribute.code,
      attributeName: attr.attribute.name,
      value: {
        id: attr.value.id,
        name: attr.value.value,
      },
    }));

    const subtitleRaw = attributes.map((a) => a.value.name);
    const subtitleText = subtitleRaw.join(' - ');

    return {
      id: variant.id,
      sku: generateSku(variant.sku || ''),
      title: variant.title,
      subtitleRaw, // 👈 Array ["512 GB", "Black", "Unlocked"]
      subtitleText, // 👈 String "512 GB - Black - Unlocked"
      stock: variant.stock,
      price: +variant.price,
      product: {
        id: variant.product.id,
        name: variant.product.name,
        brand: variant.product.brand
          ? {
              id: variant.product.brand.id,
              name: variant.product.brand.name,
            }
          : null,
        category: {
          id: variant.product.category.id,
          name: variant.product.category.name,
        },
      },
      attributes,
      // images: [],
      // reviews: [],
    };
  }
}
