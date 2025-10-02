import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_KEYS } from './constants/cache-key.constants';

/**
 * CacheKeyFactory
 *
 * This factory is responsible for generating consistent cache keys for Redis,
 * including an environment prefix (dev/staging/prod) provided by EnvService.
 *
 * Keys are always structured as:
 *   {env}:{domain}:{entity}:{id?}
 *
 * Example keys:
 *   prod:product-variant:detail:123e4567
 *   prod:product-variant:relevant:abc123:def456
 *   prod:version:product:abc123
 */
@Injectable()
export class CacheKeyFactory {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Resolve environment prefix based on NODE_ENV
   */
  private get envPrefix(): string {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');

    switch (nodeEnv) {
      case 'production':
        return 'prod';
      case 'staging':
        return 'staging';
      case 'test':
        return 'test';
      default:
        return 'dev';
    }
  }

  /**
   * Generate cache key for a single product variant detail.
   *
   * @param variantId - The UUID of the product variant
   * @returns Redis cache key string
   */
  getVariantDetailCacheKey(variantId: string): string {
    return `${this.envPrefix}:${CACHE_KEYS.VARIANT_DETAIL}:${variantId}`;
  }

  /**
   * Generate cache key for relevant product variants of a product.
   *
   * @param productId - The UUID of the product
   * @param defaultVariantId - (Optional) UUID of the default variant
   * @returns Redis cache key string
   *
   * Examples:
   *   prod:product-variant:relevant:abc123
   *   prod:product-variant:relevant:abc123:def456
   */
  getRelevantVariantsCacheKey(productId: string, defaultVariantId: string): string {
    return `${this.envPrefix}:${CACHE_KEYS.RELEVANT_VARIANTS}:${productId}:${defaultVariantId}`;
  }

  /**
   * Generate cache key for product list filtered by category and optionally by brand.
   *
   * @param categoryId - The category ID (string)
   * @param brandId - (Optional) The brand ID (UUID string)
   * @param isExcludedBrand - Whether brand is excluded or included
   * @returns Redis cache key string
   *
   * Examples:
   *   prod:product:list:cat123
   *   prod:product:list:cat123:brand456:include
   *   prod:product:list:cat123:brand456:exclude
   */
  getProductListCacheKey(
    categoryId: string,
    brandId?: string,
    isExcludedBrand = false,
  ): string {
    let key = `${this.envPrefix}:${CACHE_KEYS.PRODUCT_LIST}:cat${categoryId}`;
    
    if (brandId) {
      const brandFilter = isExcludedBrand ? 'exclude' : 'include';
      key += `:brand${brandId}:${brandFilter}`;
    }
    
    return key;
  }

  /**
   * Generate version key for global product list invalidation.
   *
   * @returns Redis version key string
   *
   * Example:
   *   prod:version:product:list
   */
  getProductListVersionKey(): string {
    return `${this.envPrefix}:${CACHE_KEYS.VERSION.PRODUCT_LIST}`;
  }

  /**
   * Generate version key for product-level cache invalidation.
   *
   * @param productId - The UUID of the product
   * @returns Redis version key string
   *
   * Example:
   *   prod:version:product:abc123
   */
  getProductVersionKey(productId: string): string {
    return `${this.envPrefix}:${CACHE_KEYS.VERSION.PRODUCT}:${productId}`;
  }

  /**
   * Generate version key for global product variant detail invalidation.
   *
   * @returns Redis version key string
   *
   * Example:
   *   prod:version:product-variant:detail
   */
  getVariantDetailVersionKey(): string {
    return `${this.envPrefix}:${CACHE_KEYS.VERSION.VARIANT_DETAIL}`;
  }

  /**
   * Generate version key for global relevant variants invalidation.
   *
   * @returns Redis version key string
   *
   * Example:
   *   prod:version:product-variant:relevant
   */
  getRelevantVariantsVersionKey(): string {
    return `${this.envPrefix}:${CACHE_KEYS.VERSION.RELEVANT_VARIANTS}`;
  }
}
