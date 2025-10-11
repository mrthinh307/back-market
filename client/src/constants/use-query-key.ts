export const USE_QUERY_KEY = {
  // Product variant related queries
  PRODUCT_VARIANT: (id: string) => ['product-variant', id],
  PRODUCT_VARIANT_RELEVANTS: (productId: string, defaultVariantId: string) => [
    'relevant-variants',
    productId,
    defaultVariantId,
  ],

  // Product related queries
  PRODUCTS: (categoryId: string, brandId?: string, isExcludedBrand?: boolean) => [
    'products',
    categoryId,
    ...(brandId ? [brandId] : []),
    ...(isExcludedBrand !== undefined ? [isExcludedBrand] : []),
  ],

  // User related queries
  USER_PROFILE: (userId: string) => ['user-profile', userId],

  // Auth related queries
  AUTH_USER: () => ['auth-user'],

  // Cart related queries
  CART_ITEMS: () => ['cart-items'],
  CART_COUNT: () => ['cart-count'],
} as const;