import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { generateSlug, getSubtitle } from '../common/utils/string';
import { calculateAverageRating } from '../common/utils/calculate';
import { PrismaService } from '../prisma/prisma.service';
import { AppCacheService } from '../cache/cache.service';
import { CACHE_TTL } from '../cache/constants/cache-key.constants';
import {
  AttributeDto,
  ProductVariantDetailDto,
  ProductDto,
  VariantItemDto,
  ImageDto,
} from './dto/product-variant.dto';
import { CacheKeyFactory } from '../cache/cache-key.factory';

// Type for Prisma raw query result (before transformation to DTO)
type PrismaProductVariant = {
  id: string;
  sku: string;
  title: string;
  stock: number;
  price: Prisma.Decimal; // Prisma Decimal
  attributes: {
    attributeId: number;
    valueId: number;
    attribute: {
      id: number;
      code: string;
      name: string;
    };
    value: {
      id: number;
      value: string;
      displayOrder: number;
    };
  }[];
  ProductVariantImage?: {
    image: {
      id: number;
      imageUrl: string;
      altText: string | null;
      displayOrder: number;
    };
  }[];
};

@Injectable()
export class ProductVariantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: AppCacheService,
    private readonly cacheKeyFactory: CacheKeyFactory,
  ) {}

  /**
   * Get individual product variant by ID
   * Returns complete details of a specific variant including product info, attributes, etc.
   * Used for: cart items, order details, checkout, variant-specific operations
   */
  async getProductVariantById(
    variantId: string,
  ): Promise<ProductVariantDetailDto> {
    // Generate cache key with version for cache invalidation
    const baseKey = this.cacheKeyFactory.getVariantDetailCacheKey(variantId); // e.g. "dev:product-variant:detail:123"
    const version = await this.cacheService.getVersion(
      this.cacheKeyFactory.getVariantDetailVersionKey(),
    ); // e.g. "1"
    const cacheKey = `${baseKey}:v${version}`; // e.g. "dev:product-variant:detail:123:v1"

    return this.cacheService.wrap(
      cacheKey,
      CACHE_TTL.VARIANT_DETAIL,
      async () => {
        console.log(
          `🔍 Cache miss for variant ${variantId} - fetching from database`,
        );
        return this.fetchVariantFromDatabase(variantId);
      },
    );
  }

  /**
   * Private method to fetch variant data from database
   * Separated for better testability and cleaner cache logic
   */
  private async fetchVariantFromDatabase(
    variantId: string,
  ): Promise<ProductVariantDetailDto> {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      select: {
        id: true,
        sku: true,
        title: true,
        stock: true,
        price: true,
        product: {
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
          },
        },
        attributes: {
          select: {
            attributeId: true,
            valueId: true,
            attribute: {
              select: {
                id: true,
                code: true,
                name: true,
              },
            },
            value: {
              select: {
                id: true,
                value: true,
                displayOrder: true,
              },
            },
          },
          orderBy: {
            attributeId: 'asc',
          },
        },
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
        },
      },
    });

    if (!variant) {
      throw new NotFoundException('Product variant not found');
    }

    const attributes: AttributeDto[] = variant.attributes.map((attr) => ({
      id: attr.attribute.id,
      code: attr.attribute.code,
      name: attr.attribute.name,
      grade: {
        id: attr.value.id,
        name: attr.value.value,
        displayOrder: attr.value.displayOrder,
      },
    }));

    const ratings = variant.reviews.map((r) => r.rating) || [];
    const ratingCount = variant._count.reviews || 0;

    // Map images from junction table
    const images: ImageDto[] = variant.ProductVariantImage.map((pvi) => ({
      id: pvi.image.id,
      imageUrl: pvi.image.imageUrl,
      altText: pvi.image.altText,
      displayOrder: pvi.image.displayOrder,
    }));

    return {
      id: variant.id,
      slug: generateSlug(variant.sku!),
      title: variant.title,
      subtitle: {
        raw: getSubtitle(attributes).raw,
        text: getSubtitle(attributes).text,
      },
      available: variant.stock > 0,
      priceValue: variant.price.toNumber(),
      priceWithCurrency: `$ ${variant.price.toNumber().toFixed(2)}`,
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
      reviewRating: {
        count: ratingCount,
        average: calculateAverageRating(ratings),
      },
      images,
    };
  }

  /**
   * Delete a product variant by ID
   * Used for admin operations to remove variants
   */
  async deleteProductVariant(variantId: string): Promise<void> {
    // First check if the variant exists
    const existingVariant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
    });

    if (!existingVariant) {
      throw new NotFoundException(
        `Product variant with ID ${variantId} not found`,
      );
    }

    // If variant exists, proceed with deletion
    await this.prisma.productVariant.delete({
      where: { id: variantId },
    });

    // Invalidate cache after successful deletion
    await this.invalidateVariantCache(variantId);
    //TODO: Revalidate Next.js (tag-based) if needed
  }

  /**
   * Invalidate cache for a specific variant and related caches
   * Called after variant updates/deletes
   */
  private async invalidateVariantCache(variantId: string): Promise<void> {
    // Optionally, explicitly delete the specific variant cache
    const baseKey = this.cacheKeyFactory.getVariantDetailCacheKey(variantId);
    const version = await this.cacheService.getVersion(
      this.cacheKeyFactory.getVariantDetailVersionKey(),
    );
    const cacheKey = `${baseKey}:v${version}`;
    await this.cacheService.del(cacheKey);

    // Bump global variants version to invalidate all variant caches
    await this.cacheService.bumpVersion(
      this.cacheKeyFactory.getVariantDetailVersionKey(),
    );

    //TODO: Need to BUMP VERSION relevant namespaces: relevant variants, product listing, etc.
  }

  /**
   * Get relevant variants for product detail page
   * Returns variants filtered by Back Market's selection logic:
   * - Only returns variants that differ by exactly one attribute from default combination
   * - Used for product detail page where users select options (condition, storage, color, etc.)
   */
  async getRelevantVariants(
    productId: string,
    defaultVariantId: string,
  ): Promise<ProductDto> {
    // Generate cache key with version for cache invalidation
    const baseKey = this.cacheKeyFactory.getRelevantVariantsCacheKey(
      productId,
      defaultVariantId,
    ); // e.g. "dev:product-variant:relevant:123"
    const version = await this.cacheService.getVersion(
      this.cacheKeyFactory.getRelevantVariantsVersionKey(),
    ); // e.g. "1"
    const cacheKey = `${baseKey}:v${version}`; // e.g. "dev:product-variant:relevant:123:v1"

    return this.cacheService.wrap(
      cacheKey,
      CACHE_TTL.RELEVANT_VARIANTS,
      async () => {
        console.log(
          `🔍 Cache miss for relevant variants of product ${productId} - fetching from database`,
        );
        return this.fetchRelevantVariantsFromDatabase(
          productId,
          defaultVariantId,
        );
      },
    );
  }

  async fetchRelevantVariantsFromDatabase(
    productId: string,
    defaultVariantId: string,
  ): Promise<ProductDto> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        variants: {
          include: {
            attributes: {
              include: {
                attribute: true,
                value: true,
              },
            },
            ProductVariantImage: {
              include: {
                image: true,
              },
              orderBy: {
                image: {
                  displayOrder: 'asc',
                },
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Get default variant or first variant if not specified
    let defaultVariant = product.variants[0] as PrismaProductVariant;
    const foundVariant = product.variants.find(
      (v) => v.id === defaultVariantId,
    ) as PrismaProductVariant;
    
    if (foundVariant) {
      defaultVariant = foundVariant;
    }

    if (!defaultVariant) {
      throw new NotFoundException(`No variants found for product ${productId}`);
    }

    // Get default variant's attribute combination
    const defaultCombination = defaultVariant.attributes.reduce(
      (acc, attr) => {
        acc[attr.attributeId] = attr.valueId;
        return acc;
      },
      {} as Record<number, number>,
    );

    // Get all possible variants based on default combination
    const relevantVariants = this.filterRelevantVariants(
      product.variants as PrismaProductVariant[],
      defaultCombination,
    );

    // Make sure default variant is included
    if (!relevantVariants.includes(defaultVariant)) {
      relevantVariants.unshift(defaultVariant);
    }

    // Group variants by attributes to create relevantVariants structure
    const relevantVariantsGrouped = this.groupVariantsByAttribute(
      relevantVariants,
      defaultCombination,
    );

    return {
      relevantVariants: relevantVariantsGrouped,
    };
  }

  /**
   * Filter relevant variants based on default combination
   * Returns variants that differ by only one attribute from the default combination
   * OPTIMIZED: Single pass through variants with pre-built index
   */
  private filterRelevantVariants(
    allVariants: PrismaProductVariant[],
    defaultCombination: Record<number, number>,
  ): PrismaProductVariant[] {
    const relevantVariants = new Set<PrismaProductVariant>();
    const attributeIds = Object.keys(defaultCombination).map((id) =>
      parseInt(id),
    );

    // Single pass through all variants - much more efficient
    allVariants.forEach((variant) => {
      const variantCombination = variant.attributes.reduce(
        (acc: Record<number, number>, attr) => {
          acc[attr.attributeId] = attr.valueId;
          return acc;
        },
        {},
      );

      // Check if this variant differs by exactly one attribute
      let differenceCount = 0;

      for (const attributeId of attributeIds) {
        if (
          variantCombination[attributeId] !== defaultCombination[attributeId]
        ) {
          differenceCount++;

          // Early exit if more than one difference
          if (differenceCount > 1) break;
        }
      }

      // Include variant if it differs by exactly one attribute
      if (differenceCount === 1) {
        relevantVariants.add(variant);
      }
    });

    return Array.from(relevantVariants);
  }

  /**
   * Group variants by attribute to create the relevantVariants structure
   * OPTIMIZED: Pre-build attribute-value maps to avoid duplicate processing
   */
  private groupVariantsByAttribute(
    variants: PrismaProductVariant[],
    defaultCombination: Record<number, number>,
  ) {
    // Pre-build attribute index and value maps in single pass
    const attributeIndex = new Map<
      number,
      {
        attribute: AttributeDto;
        valueToVariant: Map<number, PrismaProductVariant>;
      }
    >();

    // Single pass to build complete index
    variants.forEach((variant) => {
      variant.attributes.forEach((attr) => {
        const attributeId = attr.attributeId;

        if (!attributeIndex.has(attributeId)) {
          attributeIndex.set(attributeId, {
            attribute: {
              id: attr.attribute.id,
              code: attr.attribute.code,
              name: attr.attribute.name,
            },
            valueToVariant: new Map(),
          });
        }

        const group = attributeIndex.get(attributeId)!;
        const valueId = attr.valueId;

        // Only store first variant for each value (automatic deduplication)
        if (!group.valueToVariant.has(valueId)) {
          group.valueToVariant.set(valueId, variant);
        }
      });
    });

    // Build final result from index and sort by attribute ID and value display order
    const result = Array.from(attributeIndex.entries())
      .sort(([attributeIdA], [attributeIdB]) => attributeIdA - attributeIdB) // Sort by attribute ID
      .map(([attributeId, group]) => {
        const items: VariantItemDto[] = Array.from(
          group.valueToVariant.entries(),
        )
          .map(([, variant]) => {
            const variantAttr = variant.attributes.find(
              (attr) => attr.attributeId === attributeId,
            );

            return {
              variantId: variant.id,
              slug: generateSlug(variant.sku),
              available: variant.stock > 0,
              selected:
                defaultCombination[attributeId] === variantAttr!.valueId,
              priceValue: variant.price.toNumber(),
              priceWithCurrency: `$ ${variant.price.toNumber().toFixed(2)}`,
              grade: {
                id: variantAttr!.value.id,
                name: variantAttr!.value.value,
                displayOrder: variantAttr!.value.displayOrder,
              },
            };
          })
          .sort((a, b) => a.grade.displayOrder - b.grade.displayOrder); // Sort items by displayOrder

        return {
          attribute: group.attribute,
          items,
        };
      })
      .filter((group) => group.items.length > 0);

    return result;
  }
}
