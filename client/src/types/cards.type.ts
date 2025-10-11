export interface ColorOption {
  /** Human-readable swatch label – “Midnight Blue”, “#1A1A1A”, … */
  label: string;
  /** Raw CSS color value */
  color: string;
}

export interface ProductCardProps {
  id: string;
  title: string;
  brand?: {
    id: string;
    name: string;
  };
  category?: {
    id: string;
    name: string;
  };
  image: string | null;
  color?: string;
  priceValue?: number;
  priceWithCurrency: string;
  stock?: number;
  variants?: {
    colors: {
      name: string;
    }[];
  };
  reviewRating: {
    count: number;
    average: number;
  };
  description?: string;
  // Legacy properties for backward compatibility (optional)
  newPrice?: string | number;
}
export interface CategoryCardProps {
  image: string;
  name: string;
  api?: {
    categoryId: string;
    brandId?: string;
    isExcludedBrand?: boolean;
    pageTitle: string;
    pageSubtitle: string;
    seoTitle: string;
    seoDescription: string;
  };
}

// Cart item interface
export interface CartItem {
  id: string;
  cartId: string;
  productVariantId: string;
  quantity: number;
  isSelected: boolean;
  createdAt?: string;
  updatedAt?: string;
  productVariant: {
    id: string;
    sku: string;
    title: string;
    price: number;
    stock: number;
    is_active: boolean;
    product: {
      id: string;
      name: string;
      brand: {
        id: string;
        name: string;
      };
    };
    attributes: {
      attribute: {
        id: string;
        code: string;
        name: string;
      };
      value: {
        id: string;
        value: string;
      };
    }[];
    ProductVariantImage: [
      {
        image: {
          id: string;
          imageUrl: string;
          altText: string;
        };
      },
    ];
  };
}
