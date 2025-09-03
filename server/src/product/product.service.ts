import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductListDto } from './dto/product-dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieve a list of products filtered by category (required)
   * and optionally by brand.
   *
   * - The `categoryId` is parsed from string to number before querying.
   * - If `brandId` is provided, the result will be additionally filtered by brand.
   *
   * @param categoryId - The category ID as a string (will be converted to number).
   * @param brandId - (Optional) The brand ID as a UUID string.
   * @param isExcludedBrand - Whether to exclude the brand instead of include it.
   * @returns Promise<ProductListDto> - A list of matching products.
   */
  async getProductList(
    categoryId: string,
    brandId?: string,
    isExcludedBrand = false,
  ): Promise<ProductListDto> {
    const categoryIdNum = parseInt(categoryId, 10);

    // Single optimized query with aggregations and filtering at DB level
    const products = await this.prisma.product.findMany({
      where: {
        categoryId: categoryIdNum,
        ...(brandId && !isExcludedBrand && { brandId }),
        ...(brandId && isExcludedBrand && { brandId: { not: brandId } }),
        // Only get products that have variants with stock > 0
        variants: {
          some: {
            stock: {
              gt: 0,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        // Only get the cheapest variant with necessary data
        variants: {
          where: {
            stock: {
              gt: 0,
            },
          },
          select: {
            id: true,
            stock: true,
            price: true,
            attributes: {
              where: {
                attribute: {
                  OR: [
                    { name: { contains: 'color', mode: 'insensitive' } },
                    { code: { contains: 'color', mode: 'insensitive' } },
                  ],
                },
              },
              select: {
                attribute: {
                  select: {
                    name: true,
                    code: true,
                  },
                },
                value: {
                  select: {
                    value: true,
                  },
                },
              },
            },
          },
          orderBy: { price: 'asc' },
        },
        // Get review stats in a single aggregation
        _count: {
          select: {
            reviews: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Process results efficiently
    return {
      products: products.map((product) => {
        const cheapestVariant = product.variants[0];

        // Extract unique colors efficiently
        const colorValues = new Set<string>();
        product.variants.forEach((variant) => {
          variant.attributes.forEach((attr) => {
            colorValues.add(attr.value.value);
          });
        });

        const colorVariants = Array.from(colorValues).map((value) => ({
          name: value,
        }));

        // Get current color from cheapest variant
        const currentColor =
          cheapestVariant.attributes[0]?.value.value || 'Default';

        // Calculate average rating efficiently
        const totalRating = product.reviews.reduce(
          (sum, review) => sum + review.rating,
          0,
        );
        const averageRating =
          product.reviews.length > 0
            ? Number((totalRating / product.reviews.length).toFixed(2))
            : 0;

        // Handle brand safely
        const brandInfo = product.brand
          ? { id: product.brand.id, name: product.brand.name }
          : { id: '', name: 'Unknown Brand' };

        return {
          id: product.id,
          title: product.name,
          brand: brandInfo,
          category: {
            id: product.category.id.toString(),
            name: product.category.name,
          },
          image: null,
          color: currentColor,
          price: Number(cheapestVariant.price),
          priceWithCurrency: `$${Number(cheapestVariant.price)}`,
          stock: cheapestVariant.stock,
          variants: {
            colors: colorVariants,
          },
          reviewRating: {
            count: product._count.reviews,
            average: averageRating,
          },
        };
      }),
    };
  }
}
