import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto/product-dto';
import { generateSku } from 'src/common/utils/string';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductById(productId: string): Promise<ProductDto> {
    console.log(productId);
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        brand: true,
        variants: {
          include: {
            attributes: {
              include: {
                attribute: true,
                value: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return {
      id: product.id,
      sku: generateSku(product.name),
      title: product.name,
      category: {
        id: product.category.id,
        name: product.category.name,
      },
      brand: product.brand
        ? {
            id: product.brand.id,
            name: product.brand.name,
          }
        : null,
      variants: product.variants.map((variant) => ({
        id: variant.id,
        sku: generateSku(variant.sku || ''),
        title: variant.title,
        subtitleRaw: variant.attributes.map((attr) => attr.value.value), // 👈 Array ["512 GB", "Black", "Unlocked"]
        subtitleText: variant.attributes
          .map((attr) => attr.value.value)
          .join(' - '), // 👈 String "512 GB - Black - Unlocked"
        stock: variant.stock,
        price: +variant.price,
        attributes: variant.attributes.map((attr) => ({
          id: attr.attribute.id,
          code: attr.attribute.code,
          attributeName: attr.attribute.name,
          value: {
            id: attr.value.id,
            name: attr.value.value,
          },
        })),
      })),
    };
  }
}
