import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductListDto } from './dto/product-dto';
import { calculateAverageRating } from 'src/common/utils/calculate';
import { AppCacheService } from '../cache/cache.service';
import { CACHE_TTL } from '../cache/constants/cache-key.constants';
import { CacheKeyFactory } from 'src/cache/cache-key.factory';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: AppCacheService,
    private readonly cacheKeyFactory: CacheKeyFactory,
  ) {}

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
    // Generate cache key with version for cache invalidation
    const baseKey = this.cacheKeyFactory.getProductListCacheKey(
      categoryId,
      brandId,
      isExcludedBrand,
    ); // e.g. "dev:product:list:cat123:brand456:include"
    const version = await this.cacheService.getVersion(
      this.cacheKeyFactory.getProductListVersionKey(),
    ); // e.g. "1"
    const cacheKey = `${baseKey}:v${version}`; // e.g. "dev:product:list:cat123:brand456:include:v1"

    return this.cacheService.wrap(
      cacheKey,
      CACHE_TTL.PRODUCT_LIST,
      async () => {
        console.log(
          `🔍 Cache miss for product list (category: ${categoryId}, brand: ${brandId || 'all'}) - fetching from database`,
        );
        return this.fetchProductListFromDatabase(
          categoryId,
          brandId,
          isExcludedBrand,
        );
      },
    );
  }

  /**
   * Private method to fetch product list data from database
   * Separated for better testability and cleaner cache logic
   */
  private async fetchProductListFromDatabase(
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
            // Include images for the variant
            ProductVariantImage: {
              select: {
                image: {
                  select: {
                    id: true,
                    imageUrl: true,
                    altText: true,
                    displayOrder: true,
                  },
                },
              },
              orderBy: {
                image: {
                  displayOrder: 'asc',
                },
              },
              take: 1, // Only get the first image
            },
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
          //TODO: Need to remove
          orderBy: [
            // Priority 1: Variants with images first
            {
              ProductVariantImage: {
                _count: 'desc',
              },
            },
            // Priority 2: Then by price ascending
            { price: 'asc' },
          ],
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
        const ratings = product.reviews.map((r) => r.rating) || [];
        const ratingCount = product._count.reviews || 0;

        // Handle brand safely
        const brandInfo = product.brand
          ? { id: product.brand.id, name: product.brand.name }
          : { id: '', name: 'Unknown Brand' };

        // Get the first image from the cheapest variant
        const firstImage = cheapestVariant.ProductVariantImage?.[0]?.image;
        const imageUrl = firstImage?.imageUrl || null;

        return {
          id: product.variants[0].id.toString(),
          title: product.name,
          brand: brandInfo,
          category: {
            id: product.category.id.toString(),
            name: product.category.name,
          },
          image: imageUrl,
          color: currentColor,
          priceValue: Number(cheapestVariant.price),
          priceWithCurrency: `$ ${Number(cheapestVariant.price).toFixed(2)}`,
          stock: cheapestVariant.stock,
          variants: {
            colors: colorVariants,
          },
          reviewRating: {
            count: ratingCount,
            average: calculateAverageRating(ratings),
          },
        };
      }),
    };
  }

  /**
   * Invalidate cache for product list
   * Called after product updates/deletes that affect the list
   */
  async invalidateProductListCache(): Promise<void> {
    // Bump global product list version to invalidate all product list caches
    await this.cacheService.bumpVersion(
      this.cacheKeyFactory.getProductListVersionKey(),
    );

    console.log('📦 Product list cache invalidated');
  }
}
