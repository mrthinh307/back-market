/**
 * Cache TTL (Time To Live) values in seconds.
 * These define how long different types of cache entries should be kept in Redis.
 */
export const CACHE_TTL = {
  /**
   * Individual product variant details:
   * - Cached for longer since product details change less frequently.
   */
  VARIANT_DETAIL: 20 * 60, // 20 minutes

  /**
   * Relevant product variants (siblings, related variants):
   * - Cached for shorter periods because stock and availability change more often.
   */
  RELEVANT_VARIANTS: 15 * 60, // 15 minutes

  /**
   * Version keys used for cache invalidation:
   * - Cached for a long period and only updated (bumped) when invalidation is required.
   */
  VERSION: 24 * 60 * 60, // 24 hours
} as const;

/**
 * Cache key prefixes for different cache entities.
 * The final cache key will be built using:
 * {env}:{prefix}:{id?}
 */
export const CACHE_KEYS = {
  VARIANT_DETAIL: 'product-variant:detail',
  RELEVANT_VARIANTS: 'product-variant:relevant',

  VERSION: {
    PRODUCT: 'version:product',
    VARIANT_DETAIL: 'version:product-variant:detail',
    RELEVANT_VARIANTS: 'version:product-variant:relevant',
  },
} as const;
