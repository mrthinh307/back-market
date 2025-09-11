/**
 * Cache configuration constants for product variants
 */

// Cache TTL (Time To Live) in seconds
export const CACHE_TTL = {
  // Individual variant details - cache longer since they change less frequently
  VARIANT_DETAIL: 20 * 60, // 20 minutes

  // Product relevant variants - cache shorter due to stock changes
  RELEVANT_VARIANTS: 15 * 60, // 15 minutes

  // Version keys for invalidation - keep longer
  VERSION: 24 * 60 * 60, // 24 hours
} as const;

// Cache key prefixes
export const CACHE_KEYS = {
  // Individual product variant: "pv:{variantId}"
  VARIANT_DETAIL: 'pv', 

  // Relevant variants: "relevant-variants:{productId}:{defaultVariantId?}"
  RELEVANT_VARIANTS: 'relevant-variants',

  // Version keys for cache invalidation
  VERSION: {
    // Product version: "v:product:{productId}"
    PRODUCT: 'v:product',

    // Global variant version: "v:variant-detail"
    VARIANT_DETAIL: 'v:variant-detail',

    // Global relevant variants version: "v:relevant-variants"
    RELEVANT_VARIANTS: 'v:relevant-variants',
  },
} as const;

/**
 * Generate cache key for individual product variant details
 * @param variantId - The variant ID
 * @returns Cache key string
 */
export function getVariantDetailCacheKey(variantId: string): string {
  return `${CACHE_KEYS.VARIANT_DETAIL}:${variantId}`;
}

/**
 * Generate cache key for product relevant variants
 * @param productId - The product ID
 * @param defaultVariantId - Optional default variant ID
 * @returns Cache key string
 */
export function getRelevantVariantsCacheKey(
  productId: string,
  defaultVariantId?: string,
): string {
  const suffix = defaultVariantId ? `:${defaultVariantId}` : '';
  return `${CACHE_KEYS.RELEVANT_VARIANTS}:${productId}${suffix}`;
}

/**
 * Generate version key for product-level cache invalidation
 * @param productId - The product ID
 * @returns Version key string
 */
export function getProductVersionKey(productId: string): string {
  return `${CACHE_KEYS.VERSION.PRODUCT}:${productId}`;
}

/**
 * Generate version key for global variants cache invalidation
 * @returns Version key string
 */
export function getVariantDetailVersionKey(): string {
  return CACHE_KEYS.VERSION.VARIANT_DETAIL;
}

/**
 * Generate version key for global relevant variants cache invalidation
 * @returns Version key string
 */
export function getRelevantVariantsVersionKey(): string {
  return CACHE_KEYS.VERSION.RELEVANT_VARIANTS;
}
